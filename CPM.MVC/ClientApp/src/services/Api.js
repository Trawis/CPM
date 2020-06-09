import { axiosInstance } from './AxiosInstance'

const instance = axiosInstance();

export default {
    car: {
        getAllCars: () => instance.get(`/car`),
        getCarById: id => instance.get(`/employee/${id}`),
        getCarEmployees: date => instance.get(`/car/fetchCarEmployees?dateTime=${date}`),
        addCar: car => instance.post(`/car`, car),
        updateCar: car => instance.put(`/car`, car),
        deleteCar: id => instance.delete(`/car/${id}`)
    },
    employee: {
        getAllEmployees: () => instance.get(`/employee`),
        getEmployeeById: employeeId => instance.get(`/employee/${employeeId}`),
        addEmployee: employee => instance.post(`/employee`, employee),
        updateEmployee: employee => instance.put(`/employee`, employee),
        deleteEmployee: id => instance.delete(`/employee/${id}`)
    },
    travelPlan: {
        getAllTravelPlans: () => instance.get(`/travelPlan`),
        getTravelPlanById: id => instance.get(`/travelPlan/${id}`),
        addTravelPlan: travelPlan => instance.post(`/travelPlan`, travelPlan),
        updateTravelPlan: travelPlan => instance.put(`/travelPlan`, travelPlan),
        deleteTravelPlan: id => instance.delete(`/travelPlan/${id}`)
    }
};