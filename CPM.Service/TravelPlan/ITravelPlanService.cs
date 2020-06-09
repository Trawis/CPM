using System.Collections.Generic;
using CPM.Service.DTO;

namespace CPM.Service
{
	public interface ITravelPlanService
    {
        List<TravelPlanDTO> GetTravelPlans();
        TravelPlanDTO GetTravelPlanById(int travelPlanId);
        void AddOrUpdateTravelPlan(TravelPlanDTO travelPlan);
        void RemoveTravelPlan(int id);
    }
}
