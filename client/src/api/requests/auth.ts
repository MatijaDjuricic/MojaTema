import apiClient from "../apiClient";
import type { User } from "../../types";
import type {
    ILoginRequest,
    ILoginResponse,
    IChangePasswordRequest
} from "../../types/interface";
export const loginAsync = async (creds: ILoginRequest) => {
    try {
        const response = await apiClient.post('/api/auth/login', creds);
        return await response.data.data as ILoginResponse;
    } catch (err) {
        console.error('Failed to login:', err);
        throw new Error(`Error: ${err}`);
    }
}
export const getAuthUserAsync = async () => {
    try {
        const response = await apiClient.get('/api/auth/me');
        return await response.data.data as User;
    } catch (err) {
        console.error('Failed to fetch current user:', err);
        throw new Error(`Error: ${err}`);
    }
}
export const changePasswordAsync = async (data: IChangePasswordRequest) => {
    try {
        const response = await apiClient.patch('/api/auth/password', data);
        return await response.data.data;
    } catch (err) {
        console.error('Failed to change password:', err);
        throw new Error(`Error: ${err}`);
    }
}
export const refreshTokenAsync = async () => {
    try {
        const response = await apiClient.post('/api/auth/refresh');
        return await response.data.data as Omit<ILoginResponse, 'user'>;
    } catch (err) {
        console.error('Failed to refresh token:', err);
        throw new Error(`Error: ${err}`);
    }
}
export const logoutAsync = async () => {
    try {
        await apiClient.post('/api/auth/logout');
    } catch (err) {
        console.error('Failed to logout:', err);
        throw new Error(`Error: ${err}`);
    }
}