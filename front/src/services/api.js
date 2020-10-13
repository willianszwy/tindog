import axios from "axios";
import { getToken, logout } from "./auth";

const api = axios.create({
    // baseURL: "http://localhost:8080"
    baseURL: process.env.REACT_APP_BACK_SERVER
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(response => {
    return response;
}, error => {
    if (401 === error.response.status) {
        logout();
        window.location.reload();
    } else {
        return Promise.reject(error);
    }
})

export default api;