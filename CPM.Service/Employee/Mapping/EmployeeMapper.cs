using System.Collections.Generic;
using AutoMapper;
using CPM.Model;
using CPM.Service.DTO;

namespace CPM.Service.Mapping
{
	public static class EmployeeMapper
    {
        #region Model => DTO

        public static EmployeeDTO MapToDTO(this Employee model, IMapper mapper)
        {
            return mapper.Map<Employee, EmployeeDTO>(model);
        }

        public static List<EmployeeDTO> MapToListDTO(this IEnumerable<Employee> model, IMapper mapper)
        {
            return mapper.Map<IEnumerable<Employee>, List<EmployeeDTO>>(model);
        }

        #endregion

        #region DTO => Model 

        public static Employee MapToModel(this EmployeeDTO dto, IMapper mapper)
        {
            return mapper.Map<EmployeeDTO, Employee>(dto);
        }

        public static IEnumerable<Employee> MapToListModel(this List<EmployeeDTO> dto, IMapper mapper)
        {
            return mapper.Map<List<EmployeeDTO>, IEnumerable<Employee>>(dto);
        }

        #endregion
    }
}
