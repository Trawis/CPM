import axios from 'axios'
import { apiURL } from '../utils'

export function axiosInstance() {
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