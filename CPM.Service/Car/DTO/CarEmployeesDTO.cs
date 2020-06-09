using System.Collections.Generic;

namespace CPM.Service.DTO
{
	public class CarEmployeesDTO
    {
        public CarDTO Car { get; set; }
        public List<EmployeeDTO> Employees { get; set; }
    }
}
