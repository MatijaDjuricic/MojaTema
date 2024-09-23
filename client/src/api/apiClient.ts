import axios from "axios";
import Cookie from "js-cookie";
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true,
});
axiosClient.interceptors.request.use((config) => {
    const accessToken = Cookie.get('accessToken');
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});
axiosClient.interceptors.response.use((response) => {
    return response;
    }, error => {
        const { response } = error;
        if (response.status === 401) Cookie.remove('accessToken');
        throw error;
    }
);
export default axiosClient;