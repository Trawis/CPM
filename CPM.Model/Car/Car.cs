using System.Collections.Generic;
using CPM.Infrastructure.Exceptions;

namespace CPM.Model
{
	public class Car
	{
		public int CarId { get; set; }
		public string Name { get; set; }
		public string Type { get; set; }
		public string Color { get; set; }
		public string Plates { get; set; }
		public int SeatsNumber { get; set; }

		public void Validate()
		{
			var errorMessages = new List<string>();

			if (string.IsNullOrEmpty(Name))
			{
				errorMessages.Add("Car name is a required field");
			}

			if (string.IsNullOrEmpty(Type))
			{
				errorMessages.Add("Car type is a required field");
			}

			if (string.IsNullOrEmpty(Color))
			{
				errorMessages.Add("Car color is a required field");
			}

			if (string.IsNullOrEmpty(Plates))
			{
				errorMessages.Add("Car plates is a required field");
			}

			if (SeatsNumber <= 0)
			{
				errorMessages.Add("Car seats number must positive and greater than zero");
			}

			if (errorMessages.Count > 0)
			{
				throw new ValidationException(ExceptionCodes.ValidationError, errorMessages);
			}
		}
	}
}
