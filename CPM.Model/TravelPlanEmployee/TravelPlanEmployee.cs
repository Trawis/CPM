namespace CPM.Model
{
	public class TravelPlanEmployee
    {
        public int TravelPlanId { get; set; }
        public int EmployeeId { get; set; }

        public virtual TravelPlan TravelPlan { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
