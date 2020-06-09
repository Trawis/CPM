using System.Collections.Generic;
using CPM.Service.DTO;

namespace CPM.Service
{
	public interface IEmployeeService
    {
        void AddOrUpdateEmployee(EmployeeDTO employee);
        EmployeeDTO GetEmployeeById(int id);
        List<EmployeeDTO> GetEmployees();
        void RemoveEmployee(int id);
    }
}
