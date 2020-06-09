using System;
using System.Collections.Generic;
using CPM.Service.DTO;

namespace CPM.Service
{
	public interface ICarService
    {
        void AddOrUpdateCar(CarDTO car);
        List<CarDTO> GetCars();
        CarDTO GetCarById(int id);
        List<CarEmployeesDTO> GetCarEmployees(DateTime dateTime);
        void RemoveCar(int id);
    }
}
