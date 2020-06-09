using System;
using System.Collections.Generic;
using CPM.Infrastructure.Exceptions;

namespace CPM.Model
{
	public class TravelPlan
    {
        public int TravelPlanId { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int CarId { get; set; }

        public virtual Car Car { get; set; }
        public virtual ICollection<TravelPlanEmployee> TravelPlanEmployees { get; set; }

        public void Validate()
        {
            var errorMessages = new List<string>();

            if (string.IsNullOrEmpty(StartLocation))
            {
                errorMessages.Add("Start location is a required field");
            }

            if (string.IsNullOrEmpty(EndLocation))
            {
                errorMessages.Add("End location is a required field");
            }

            if (StartDate == default(DateTime))
            {
                errorMessages.Add("Start date is a required field");
            }

            if (EndDate == default(DateTime))
            {
                errorMessages.Add("End date is a required field");
            }

            if (StartDate != default(DateTime) && StartDate < DateTime.Now)
            {
                errorMessages.Add("Start date can't be in the past");
            }
            else if (EndDate != default(DateTime) && EndDate < DateTime.Now)
            {
                errorMessages.Add("End date can't be in the past");
            }
            else if (StartDate > EndDate)
            {
                errorMessages.Add("Start date can't be greater than end date");
            }
            else if (StartDate != default(DateTime) && EndDate != default(DateTime) && StartDate == EndDate)
            {
                errorMessages.Add("Dates can't be the same");
            }

            if (Car == null)
            {
                errorMessages.Add("Car is required field");
            }

            if (TravelPlanEmployees == null || TravelPlanEmployees.Count == 0)
            {
                errorMessages.Add("Employees are required");
            }

            if (Car != null && TravelPlanEmployees != null && Car.SeatsNumber < TravelPlanEmployees.Count)
            {
                errorMessages.Add("Employees can't be greater than car seats number");
            }

            if (errorMessages.Count > 0)
            {
                throw new ValidationException(ExceptionCodes.ValidationError, errorMessages);
            }
        }
    }
}