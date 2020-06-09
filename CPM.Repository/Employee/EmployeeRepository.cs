using CPM.Model;

namespace CPM.Repository
{
	public class EmployeeRepository : RepositoryBase<Employee>, IEmployeeRepository
    {
        private readonly CPMContext _context;

        public EmployeeRepository(CPMContext context) : base(context)
        {
            _context = context;
        }
    }
}
