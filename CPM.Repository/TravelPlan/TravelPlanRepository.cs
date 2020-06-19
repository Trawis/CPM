using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using CPM.Model;
using Microsoft.EntityFrameworkCore;

namespace CPM.Repository
{
	public class TravelPlanRepository : RepositoryBase<TravelPlan>, ITravelPlanRepository
    {
        private readonly CPMContext _context;

        public TravelPlanRepository(CPMContext context) : base(context)
        {
            _context = context;
        }

        public override void Add(TravelPlan entity)
        {
            entity.Car = null;

            foreach (var travelPlanEmployee in entity.TravelPlanEmployees)
            {
                travelPlanEmployee.Employee = null;
            }

            base.Add(entity);
        }

        public override void Update(TravelPlan entity)
        {
            entity.Car = null;

            foreach (var travelPlanEmployee in entity.TravelPlanEmployees)
            {
                travelPlanEmployee.Employee = null;
            }

            var entry = _context.TravelPlan.First(e => e.TravelPlanId == entity.TravelPlanId);
            _context.Entry(entry).State = EntityState.Detached;

            base.Update(entity);
        }

        public override IEnumerable<TravelPlan> FindAll()
        {
            return _context.TravelPlan.Include(tp => tp.Car)
                                      .Include(tp => tp.TravelPlanEmployees)
                                      .ThenInclude(tpe => tpe.Employee)
                                      .OrderByDescending(tp => tp.TravelPlanId);
        }

        public override IEnumerable<TravelPlan> FindBy(Expression<Func<TravelPlan, bool>> predicate)
        {
            return _context.TravelPlan.Include(tp => tp.Car)
                                      .Include(tp => tp.TravelPlanEmployees)
                                      .ThenInclude(tpe => tpe.Employee)
                                      .Where(predicate);
        }

        public override TravelPlan FindById(int id)
        {
            return _context.TravelPlan.Where(travelPlan => travelPlan.TravelPlanId == id)
                                      .Include(tp => tp.Car)
                                      .Include(tp => tp.TravelPlanEmployees)
                                      .ThenInclude(tpe => tpe.Employee)
                                      .SingleOrDefault();
        }

        public bool IsCarInUsage(DateTime startDate, DateTime endDate, int carId)
        {
            return _context.TravelPlan.Any(tp => tp.StartDate >= startDate && tp.EndDate >= endDate && tp.CarId == carId);
        }
    }
}
