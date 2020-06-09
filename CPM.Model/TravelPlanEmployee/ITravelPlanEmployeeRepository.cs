using System.Collections.Generic;
using CPM.Infrastructure.Domain;

namespace CPM.Model
{
	public interface ITravelPlanEmployeeRepository : IRepository<TravelPlanEmployee>
    {
        IEnumerable<TravelPlanEmployee> FindByEmployeeId(int employeeId);
    }
}
