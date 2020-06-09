using System.Collections.Generic;
using AutoMapper;
using CPM.Model;
using CPM.Service.DTO;

namespace CPM.Service.Mapping
{
	public static class CarMapper
    {
        #region Model => DTO

        public static CarDTO MapToDTO(this Car model, IMapper mapper)
        {
            return mapper.Map<Car, CarDTO>(model);
        }

        public static List<CarDTO> MapToListDTO(this IEnumerable<Car> model, IMapper mapper)
        {
            return mapper.Map<IEnumerable<Car>, List<CarDTO>>(model);
        }

        #endregion

        #region DTO => Model 

        public static Car MapToModel(this CarDTO dto, IMapper mapper)
        {
            return mapper.Map<CarDTO, Car>(dto);
        }

        public static Car MapToModel(this CarDTO dto, Car model, IMapper mapper)
        {
            return mapper.Map<CarDTO, Car>(dto, model);
        }

        public static IEnumerable<Car> MapToListModel(this List<CarDTO> dto, IMapper mapper)
        {
            return mapper.Map<List<CarDTO>, IEnumerable<Car>>(dto);
        }

        #endregion
    }
}
