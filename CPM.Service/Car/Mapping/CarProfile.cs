using AutoMapper;
using CPM.Model;
using CPM.Service.DTO;

namespace CPM.Service.Mapping
{
	public class CarProfile : Profile
    {
        public CarProfile()
        {
            #region Model => DTO

            CreateMap<Car, CarDTO>();

            #endregion

            #region DTO => Model

            CreateMap<CarDTO, Car>();

            #endregion
        }
    }
}
