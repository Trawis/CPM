using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace CPM.Infrastructure.Exceptions
{
	public class ValidationException : Exception
    {
        public string Code { get; set; }
        public List<string> Messages { get; set; }

        public ValidationException()
        {
        }

        public ValidationException(string message) : base(message)
        {
        }

        public ValidationException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected ValidationException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        public ValidationException(string code, string message) : base(message)
        {
            Code = code;
        }

        public ValidationException(string code, List<string> messages)
        {
            Code = code;
            Messages = messages;
        }

        public ValidationException(string code, string message, Exception innerException) : base(message, innerException)
        {
            Code = code;
        }
    }
}
