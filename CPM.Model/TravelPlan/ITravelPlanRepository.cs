using System;
using CPM.Infrastructure.Domain;

namespace CPM.Model
{
	public interface ITravelPlanRepository : IRepository<TravelPlan>
    {
        bool IsCarInUsage(DateTime startDate, DateTime endDate, int carId);
    }
}
