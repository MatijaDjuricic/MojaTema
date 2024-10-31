import axios from "axios";
import { useLayoutEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useRefreshToken from "../api/useRefreshToken";
const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true
});
const apiClientPrivate = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
export const createApiClientPrivate = () => {
    const { accessToken } = useAuthContext();
    const refresh = useRefreshToken();
    useLayoutEffect(() => {
        const authInterceptor = apiClientPrivate.interceptors.request.use(
            config => {
                if (accessToken) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );
        const refreshInterceptor = apiClientPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    try {
                        const newAccessToken = await refresh();
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return apiClient(prevRequest);
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
        return () => {
            apiClient.interceptors.request.eject(authInterceptor);
            apiClient.interceptors.response.eject(refreshInterceptor);
        }
    }, [accessToken, refresh]);
    return apiClientPrivate;
};
export default apiClient;