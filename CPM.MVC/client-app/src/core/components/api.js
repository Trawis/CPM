import axios from 'axios'

function AxiosInstance() {
    const apiURL = "http://localhost:50280";
    const instance = axios.create({
        baseURL: `${apiURL}/api`,
        timeout: 60000
    });

    instance.defaults.headers.get['Pragma'] = 'no-cache';
    instance.defaults.headers.common['Content-Type'] = 'application/json';
    instance.interceptors.response.use(
        response => response.data,
        error => {
            if (error.response) {
                return Promise.reject(error.response.data);
            }
        }
    );

    return instance;
};

export function API() {
    const instance = AxiosInstance();
    return (
        car = {
            getAll: () => instance.get(`/car`),
            getById: id => instance.get(`/employee/${id}`),
            getCarEmployees: date => instance.get(`/car/fetchCarEmployees?dateTime=${date}`),
            add: car => instance.post(`/car`, car),
            update: car => instance.put(`/car`, car),
            delete: id => instance.delete(`/car/${id}`)
        },
        employee = {
            getAll: () => instance.get(`/employee`),
            getById: employeeId => instance.get(`/employee/${employeeId}`),
            add: employee => instance.post(`/employee`, employee),
            update: employee => instance.put(`/employee`, employee),
            delete: id => instance.delete(`/employee/${id}`)
        },
        travelPlan = {
            getAll: () => instance.get(`/travelPlan`),
            getById: id => instance.get(`/travelPlan/${id}`),
            add: travelPlan => instance.post(`/travelPlan`, travelPlan),
            update: travelPlan => instance.put(`/travelPlan`, travelPlan),
            delete: id => instance.delete(`/travelPlan/${id}`)
        }
    );
};