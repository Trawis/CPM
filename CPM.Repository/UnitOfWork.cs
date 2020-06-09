using CPM.Infrastructure.Domain;

namespace CPM.Repository
{
	public class UnitOfWork : IUnitOfWork
    {
        private readonly CPMContext _context;

        public UnitOfWork(CPMContext context)
        {
            _context = context;
        }

        public int Commit()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
