using CPM.Model;

namespace CPM.Repository
{
	public class CarRepository : RepositoryBase<Car>, ICarRepository
    {
        private readonly CPMContext _context;

        public CarRepository(CPMContext context) : base(context)
        {
            _context = context;
        }
    }
}
