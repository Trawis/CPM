using System.Collections.Generic;
using System.Linq;
using CPM.Model;
using Microsoft.EntityFrameworkCore;

namespace CPM.Repository
{
	public class TravelPlanEmployeeRepository : RepositoryBase<TravelPlanEmployee>, ITravelPlanEmployeeRepository
    {
        private readonly CPMContext _context;

        public TravelPlanEmployeeRepository(CPMContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<TravelPlanEmployee> FindByEmployeeId(int employeeId)
        {
            return _context.TravelPlanEmployee.Where(tpe => tpe.EmployeeId == employeeId).Include(i => i.TravelPlan);
        }
    }
}
