import axios from "axios";
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
export default apiClient;