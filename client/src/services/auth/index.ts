import apiClient from "../apiClient";
import type { ILoginRequest, ILoginResponse } from "../../types/interface";
import type { User } from "../../types";
export const fetchCsrfTokenAsync = async () => {
    try {
        await apiClient.get('/sanctum/csrf-cookie');
    } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
    }
};
export const loginAsync = async (creds: ILoginRequest) => {
    try {
        const response = await apiClient.post('/auth/login', creds);
        return response.data.data as ILoginResponse;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const getAuthUserAsync = async () => {
    try {
        const response = await apiClient.get('/auth/me');
        return response.data.data as User;
    } catch (error) {
        console.error('Failed to fetch current user:', error);
    }
};
export const logoutAsync = async () => {
    try {
        await apiClient.post('/auth/logout');
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}