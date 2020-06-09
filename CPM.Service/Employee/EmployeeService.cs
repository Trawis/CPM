using System.Collections.Generic;
using AutoMapper;
using CPM.Infrastructure.Domain;
using CPM.Infrastructure.Exceptions;
using CPM.Model;
using CPM.Service.DTO;
using CPM.Service.Mapping;

namespace CPM.Service
{
	public class EmployeeService : IEmployeeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;

        public EmployeeService(
            IUnitOfWork unitOfWork,
            IEmployeeRepository employeeRepository,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _employeeRepository = employeeRepository;
            _mapper = mapper;
        }

        public void AddOrUpdateEmployee(EmployeeDTO employee)
        {
            var newEmployee = employee.MapToModel(_mapper);
			newEmployee.Validate();

            if (newEmployee.EmployeeId == 0)
            {
                _employeeRepository.Add(newEmployee);
            }
            else
            {
                _employeeRepository.Update(newEmployee);
            }

            _unitOfWork.Commit();
        }

        public EmployeeDTO GetEmployeeById(int id)
        {
            var employee = _employeeRepository.FindById(id).MapToDTO(_mapper);

            if (employee == null)
            {
                throw new EntityNotFoundException(ExceptionCodes.EntityNotFound, "Entity Not Found");
            }

            return employee;
        }

        public List<EmployeeDTO> GetEmployees()
        {
            var employees = _employeeRepository.FindAll().MapToListDTO(_mapper);
            return employees;
        }

        public void RemoveEmployee(int id)
        {
            var employee = _employeeRepository.FindById(id);

            _employeeRepository.Remove(employee);
            _unitOfWork.Commit();
        }
    }
}
