import axios from "axios";
import { getAccessToken, removeAccessToken } from "@/composables/useAuth.js";

const securedAxios = axios.create({
    baseURL: import.meta.env.VITE_APP_API_HOST,
    headers: {}
});

securedAxios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${getAccessToken()}`
    return config;
});

securedAxios.interceptors.response.use(response => response, error => {
    console.log(error)
    if (error.response.status === 401) {
        removeAccessToken()
    } else {
        return Promise.reject(error);
    }
});

export default securedAxios