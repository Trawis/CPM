using System.Collections.Generic;
using CPM.Service;
using CPM.Service.DTO;
using Microsoft.AspNetCore.Mvc;

namespace CPM.WebApi.Controllers
{
	[Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet()]
        public ActionResult<List<EmployeeDTO>> FetchAll()
        {
            return _employeeService.GetEmployees();
        }

        [HttpGet("{id}")]
        public ActionResult<EmployeeDTO> FetchById(int id)
        {
            return _employeeService.GetEmployeeById(id);
        }


        [HttpPost()]
        public IActionResult Create([FromBody] EmployeeDTO employee)
        {
            _employeeService.AddOrUpdateEmployee(employee);

            return Ok();
        }

        [HttpPut()]
        public IActionResult Update([FromBody] EmployeeDTO employee)
        {
            _employeeService.AddOrUpdateEmployee(employee);

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _employeeService.RemoveEmployee(id);

            return Ok();
        }
    }
}