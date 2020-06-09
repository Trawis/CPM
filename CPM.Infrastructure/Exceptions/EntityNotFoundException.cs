using System;
using System.Runtime.Serialization;

namespace CPM.Infrastructure.Exceptions
{
	public class EntityNotFoundException : Exception
    {
        public string Code { get; set; }

        public EntityNotFoundException()
        {
        }

        public EntityNotFoundException(string message) : base(message)
        {
        }

        public EntityNotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected EntityNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        public EntityNotFoundException(string code, string message) : base(message)
        {
            Code = code;
        }

        public EntityNotFoundException(string code, string message, Exception innerException) : base(message, innerException)
        {
            Code = code;
        }
    }
}