using System.Linq;
using AutoMapper;
using CPM.Model;
using CPM.Service.DTO;

namespace CPM.Service.Mapping
{
	public class TravelPlanProfile : Profile
    {
        public TravelPlanProfile()
        {
            #region Model => DTO

            CreateMap<TravelPlan, TravelPlanDTO>()
                .ForMember(dest => dest.Employees, options => options.MapFrom(src => src.TravelPlanEmployees.Select(t => t.Employee)));

            #endregion

            #region DTO => Model

            CreateMap<TravelPlanDTO, TravelPlan>()
                .ForMember(dest => dest.CarId, opt => opt.MapFrom(src => src.Car.CarId))
                .ForMember(dest => dest.TravelPlanEmployees, options => options.MapFrom(src => src.Employees.Select(t => new TravelPlanEmployee
                {
                    EmployeeId = t.EmployeeId,
                    TravelPlanId = src.TravelPlanId.GetValueOrDefault(),
                    Employee = new Employee
                    {
                        EmployeeId = t.EmployeeId,
                        Name = t.Name,
                        IsDriver = t.IsDriver
                    }
                })));

            #endregion
        }
    }
}
