using AutoMapper;
using CPM.Model;
using CPM.Service.DTO;

namespace CPM.Service.Mapping
{
	public class EmployeeProfile : Profile
    {
        public EmployeeProfile()
        {
            #region Model => DTO

            CreateMap<Employee, EmployeeDTO>();

            #endregion

            #region DTO => Model

            CreateMap<EmployeeDTO, Employee>();

            #endregion
        }
    }
}
