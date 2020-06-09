using System.Collections.Generic;
using CPM.Service;
using CPM.Service.DTO;
using Microsoft.AspNetCore.Mvc;

namespace CPM.WebApi.Controllers
{
	[Route("api/[controller]")]
    [ApiController]
    public class TravelPlanController : ControllerBase
    {
        private readonly ITravelPlanService _travelPlanService;

        public TravelPlanController(ITravelPlanService travelPlanService)
        {
            _travelPlanService = travelPlanService;
        }

        [HttpGet()]
        public ActionResult<List<TravelPlanDTO>> FetchAll()
        {
            return _travelPlanService.GetTravelPlans();
        }

        [HttpGet("{id}")]
        public ActionResult<TravelPlanDTO> FetchById(int id)
        {
            return _travelPlanService.GetTravelPlanById(id);
        }

        [HttpPost()]
        public IActionResult Create([FromBody] TravelPlanDTO travelPlan)
        {
            _travelPlanService.AddOrUpdateTravelPlan(travelPlan);

            return Ok();
        }

        [HttpPut()]
        public IActionResult Update([FromBody] TravelPlanDTO travelPlan)
        {
            _travelPlanService.AddOrUpdateTravelPlan(travelPlan);

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(int id)
        {
            _travelPlanService.RemoveTravelPlan(id);

            return Ok();
        }
    }
}