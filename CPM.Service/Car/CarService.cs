using System;
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
    public class CarService : ICarService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICarRepository _carRepository;
        private readonly ITravelPlanRepository _travelPlanRepository;
        private readonly IMapper _mapper;

        public CarService(
            IUnitOfWork unitOfWork,
            ICarRepository carRepository,
            ITravelPlanRepository travelPlanRepository,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _carRepository = carRepository;
            _travelPlanRepository = travelPlanRepository;
            _mapper = mapper;
        }

        public void AddOrUpdateCar(CarDTO car)
        {
            var isUpdate = car.CarId > 0;
            var platesExist = false;

            Car createdOrUpdatedCar = null;

            if (isUpdate)
            {
                var carDb = _carRepository.FindById(car.CarId);

                createdOrUpdatedCar = car.MapToModel(carDb, _mapper);

                if (carDb.Plates != createdOrUpdatedCar.Plates)
                {
                    platesExist = _carRepository.FindBy(c => c.Plates == createdOrUpdatedCar.Plates).Any();
                }
            }
            else
            {
                createdOrUpdatedCar = car.MapToModel(_mapper);

                platesExist = _carRepository.FindBy(carDb => carDb.Plates == createdOrUpdatedCar.Plates).Any();
            }

            createdOrUpdatedCar.Validate();

            if (platesExist)
            {
                var errorMessages = new List<string>
                {
                    "Car plates must be unique"
                };

                throw new ValidationException(ExceptionCodes.CarPlatesMustBeUnique, errorMessages);
            }

            if (createdOrUpdatedCar.CarId == 0)
            {
                _carRepository.Add(createdOrUpdatedCar);
            }
            else
            {
                _carRepository.Update(createdOrUpdatedCar);
            }

            _unitOfWork.Commit();
        }

        public List<CarDTO> GetCars()
        {
            var cars = _carRepository.FindAll().MapToListDTO(_mapper);
            return cars;
        }

        public CarDTO GetCarById(int id)
        {
            var car = _carRepository.FindById(id).MapToDTO(_mapper);

            if (car == null)
            {
                throw new EntityNotFoundException(ExceptionCodes.EntityNotFound, "Entity Not Found");
            }

            return car;
        }

        public List<CarEmployeesDTO> GetCarEmployees(DateTime dateTime)
        {
            var carEmployees = new List<CarEmployeesDTO>();
            var cars = _carRepository.FindAll().Distinct().ToList();

            foreach (var car in cars)
            {
                var employees = new List<EmployeeDTO>();
                var travelPlanEmployees = _travelPlanRepository.FindBy(tpe => tpe.CarId == car.CarId &&
                                                                              (tpe.StartDate.Month == dateTime.Month ||
                                                                              tpe.EndDate.Month == dateTime.Month))
                                                               .SelectMany(tpe => tpe.TravelPlanEmployees)
                                                               .ToList();

                if (travelPlanEmployees.Count() == 0)
                {
                    continue;
                }

                foreach (var travelPlanEmployee in travelPlanEmployees)
                {
                    employees.Add(travelPlanEmployee.Employee.MapToDTO(_mapper));
                }

                carEmployees.Add(new CarEmployeesDTO
                {
                    Car = car.MapToDTO(_mapper),
                    Employees = employees
                });
            }

            return carEmployees;
        }

        public void RemoveCar(int id)
        {
            var car = _carRepository.FindById(id);

            _carRepository.Remove(car);
            _unitOfWork.Commit();
        }
    }
}
