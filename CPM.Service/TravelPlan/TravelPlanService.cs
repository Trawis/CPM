using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using CPM.Infrastructure.Domain;
using CPM.Infrastructure.Exceptions;
using CPM.Model;
using CPM.Service.DTO;
using CPM.Service.Mapping;

namespace CPM.Service
{
	public class TravelPlanService : ITravelPlanService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly ICarRepository _carRepository;
		private readonly ITravelPlanRepository _travelPlanRepository;
		private readonly ITravelPlanEmployeeRepository _travelPlanEmployeeRepository;
		private readonly IMapper _mapper;

		public TravelPlanService(
			IUnitOfWork unitOfWork,
			ICarRepository carRepository,
			ITravelPlanRepository travelPlanRepository,
			ITravelPlanEmployeeRepository travelPlanEmployeeRepository,
			IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_carRepository = carRepository;
			_travelPlanRepository = travelPlanRepository;
			_travelPlanEmployeeRepository = travelPlanEmployeeRepository;
			_mapper = mapper;
		}

		public List<TravelPlanDTO> GetTravelPlans()
		{
			var travelPlans = _travelPlanRepository.FindAll().MapToListDTO(_mapper);
			return travelPlans;
		}

		public TravelPlanDTO GetTravelPlanById(int travelPlanId)
		{
			var travelPlan = _travelPlanRepository.FindById(travelPlanId).MapToDTO(_mapper);

			if (travelPlan == null)
			{
				throw new EntityNotFoundException(ExceptionCodes.EntityNotFound, "Entity Not Found");
			}

			return travelPlan;
		}

		public void AddOrUpdateTravelPlan(TravelPlanDTO travelPlan)
		{
			var isUpdate = travelPlan.TravelPlanId > 0;
			var isCarInUsage = false;
			var errorMessages = new List<string>();

			TravelPlan createdOrUpdatedTravelPlan = null;

			if (isUpdate)
			{
				var travelPlanDb = _travelPlanRepository.FindById(travelPlan.TravelPlanId.Value);

				createdOrUpdatedTravelPlan = travelPlan.MapToModel(travelPlanDb, _mapper);

				if (travelPlanDb.CarId != createdOrUpdatedTravelPlan.CarId ||
					travelPlanDb.StartDate != createdOrUpdatedTravelPlan.StartDate ||
					travelPlanDb.EndDate != createdOrUpdatedTravelPlan.EndDate)
				{
					isCarInUsage = _travelPlanRepository.IsCarInUsage(createdOrUpdatedTravelPlan.StartDate,
																	  createdOrUpdatedTravelPlan.EndDate,
																	  createdOrUpdatedTravelPlan.CarId);
				}
			}
			else
			{
				createdOrUpdatedTravelPlan = travelPlan.MapToModel(_mapper);

				isCarInUsage = _travelPlanRepository.IsCarInUsage(createdOrUpdatedTravelPlan.StartDate,
																  createdOrUpdatedTravelPlan.EndDate,
																  createdOrUpdatedTravelPlan.CarId);
			}

			createdOrUpdatedTravelPlan.Validate();

			if (isCarInUsage)
			{
				errorMessages.Add("Chosen car is not available in that period");
				throw new ValidationException(ExceptionCodes.CarNotAvailable, errorMessages);
			}
			else if (!createdOrUpdatedTravelPlan.TravelPlanEmployees.Any(e => e.Employee.IsDriver))
			{
				errorMessages.Add("At least one employee must be a driver");
				throw new ValidationException(ExceptionCodes.CarHasNoDriver, errorMessages);
			}

			foreach (var travelPlanEmployee in createdOrUpdatedTravelPlan.TravelPlanEmployees.ToList())
			{
				var employeeTravelPlans = _travelPlanEmployeeRepository.FindByEmployeeId(travelPlanEmployee.EmployeeId);

				foreach (var employeeTravelPlan in employeeTravelPlans)
				{
					if (employeeTravelPlan.TravelPlanId != createdOrUpdatedTravelPlan.TravelPlanId &&
						employeeTravelPlan.TravelPlan.EndDate >= createdOrUpdatedTravelPlan.StartDate &&
						employeeTravelPlan.TravelPlan.StartDate <= createdOrUpdatedTravelPlan.EndDate)
					{
						errorMessages.Add($"Employee {travelPlanEmployee.Employee.Name} already has travel plan in a chosen period");
					}
				}
			}

			if (errorMessages.Count() > 0)
			{
				throw new ValidationException(ExceptionCodes.EmployeesAlreadyHaveTrip, errorMessages);
			}

			if (isUpdate)
			{
				_travelPlanRepository.Update(createdOrUpdatedTravelPlan);
			}
			else
			{
				_travelPlanRepository.Add(createdOrUpdatedTravelPlan);
			}

			_unitOfWork.Commit();
		}

		public void RemoveTravelPlan(int id)
		{
			var travelPlan = _travelPlanRepository.FindById(id);
            travelPlan.Car = null;

			_travelPlanRepository.Remove(travelPlan);
			_unitOfWork.Commit();
		}
	}
}
