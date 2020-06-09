using System;
using System.Collections.Generic;

namespace CPM.Service.DTO
{
	public class TravelPlanDTO
    {
        public int? TravelPlanId { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public CarDTO Car { get; set; }
        public List<EmployeeDTO> Employees { get; set; }
    }
}
