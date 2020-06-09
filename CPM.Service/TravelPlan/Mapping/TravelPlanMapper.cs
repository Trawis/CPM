using System.Collections.Generic;
using AutoMapper;
using CPM.Model;
using CPM.Service.DTO;

namespace CPM.Service.Mapping
{
	public static class TravelPlanMapper
    {
        #region Model => DTO

        public static TravelPlanDTO MapToDTO(this TravelPlan model, IMapper mapper)
        {
            return mapper.Map<TravelPlan, TravelPlanDTO>(model);
        }

        public static List<TravelPlanDTO> MapToListDTO(this IEnumerable<TravelPlan> model, IMapper mapper)
        {
            return mapper.Map<List<TravelPlanDTO>>(model);
        }

        #endregion

        #region DTO => Model 

        public static TravelPlan MapToModel(this TravelPlanDTO dto, IMapper mapper)
        {
            return mapper.Map<TravelPlanDTO, TravelPlan>(dto);
        }

		public static TravelPlan MapToModel(this TravelPlanDTO dto, TravelPlan model, IMapper mapper)
		{
			return mapper.Map<TravelPlanDTO, TravelPlan>(dto, model);
		}

		public static IEnumerable<TravelPlan> MapToListModel(this List<TravelPlanDTO> dto, IMapper mapper)
        {
            return mapper.Map<List<TravelPlanDTO>, IEnumerable<TravelPlan>>(dto);
        }

		#endregion
	}
}
