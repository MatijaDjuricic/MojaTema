import axios from "axios";
import { useAuthStore } from "../stores/auth";
const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    timeout: 60000,
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
        Accept: 'application/json',
    },
});
apiClient.interceptors.request.use((config) => {
    const { token } = useAuthStore();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
export default apiClient;