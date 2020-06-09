using System.Collections.Generic;
using CPM.Infrastructure.Exceptions;

namespace CPM.Model
{
	public class Employee
	{
		public int EmployeeId { get; set; }
		public string Name { get; set; }
		public bool IsDriver { get; set; }

		public void Validate()
		{
			var errorMessages = new List<string>();

			if (string.IsNullOrEmpty(Name))
			{
				errorMessages.Add("Employee name is a required field");
			}

			if (errorMessages.Count > 0)
			{
				throw new ValidationException(ExceptionCodes.ValidationError, errorMessages);
			}
		}
	}
}