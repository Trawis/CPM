using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using CPM.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace CPM.WebApi.Configurations
{
	public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An unhandled exception has occurred while executing the request: {ex}");

                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            string result = string.Empty;

            var jsonSettings = new JsonSerializerSettings();
            jsonSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            if (exception is ValidationException validationException)
            {
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

                var errors = new List<ValidationError>();
                validationException.Messages.ForEach(message => errors.Add(new ValidationError
                {
                    Code = validationException.Code,
                    Message = message
                }));

                var errorDetails = new ValidationErrorDetails
                {
                    Title = "Request Validation Error",
                    Status = context.Response.StatusCode,
                    Detail = "See errors for details",
                    Errors = errors
                };

                result = JsonConvert.SerializeObject(errorDetails, jsonSettings);
            }
            else if (exception is EntityNotFoundException entityNotFoundException)
            {
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

                var errors = new List<ValidationError>();
                errors.Add(new ValidationError
                {
                    Code = entityNotFoundException.Code,
                    Message = entityNotFoundException.Message
                });

                var errorDetails = new ValidationErrorDetails
                {
                    Title = "Entity Not Found",
                    Status = context.Response.StatusCode,
                    Detail = "See errors for details",
                    Errors = errors
                };

                result = JsonConvert.SerializeObject(errorDetails, jsonSettings);
            }
            else
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var errorDetails = new ErrorDetails()
                {
                    Title = "An unexpected error occurred.",
                    Status = context.Response.StatusCode,
                    Detail = exception.Message,
                };

                result = JsonConvert.SerializeObject(errorDetails, jsonSettings);
            }

            context.Response.ContentType = "application/json";

            return context.Response.WriteAsync(result);
        }
    }
}
