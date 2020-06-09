using System.Collections.Generic;

namespace CPM.WebApi.Configurations
{
	public class ValidationErrorDetails : ErrorDetails
    {
        public ICollection<ValidationError> Errors { get; set; }
    }
}
