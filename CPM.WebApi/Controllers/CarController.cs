using System;
using System.Collections.Generic;
using CPM.Service;
using CPM.Service.DTO;
using Microsoft.AspNetCore.Mvc;

namespace CPM.WebApi.Controllers
{
	[Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;

        public CarController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet()]
        public ActionResult<List<CarDTO>> FetchAll()
        {
            return _carService.GetCars();
        }

        [HttpGet("[action]")]
        public ActionResult<List<CarEmployeesDTO>> FetchCarEmployees(DateTime dateTime)
        {
            return _carService.GetCarEmployees(dateTime);
        }

        [HttpGet("{id}")]
        public ActionResult<CarDTO> FetchById(int id)
        {
            return _carService.GetCarById(id);
        }

        [HttpPost()]
        public IActionResult Create([FromBody] CarDTO travelPlan)
        {
            _carService.AddOrUpdateCar(travelPlan);

            return Ok();
        }

        [HttpPut()]
        public IActionResult Update([FromBody] CarDTO travelPlan)
        {
            _carService.AddOrUpdateCar(travelPlan);

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(int id)
        {
            _carService.RemoveCar(id);

            return Ok();
        }
    }
}