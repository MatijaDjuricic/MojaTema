import apiClient from "./apiClient";
import { UserAuthResponse } from "../../types/types";
export const useAuthService = () => {
    const userLoginAsync = async({ email, password }: { email: string, password: string }) => {
        try {
            const response = await apiClient.post('/auth/login', {
                email,
                password
            });
            return response.data as UserAuthResponse;
        } catch (err) {
            throw new Error(`Error: ${err}`);
        }
    };
    const userVerifyTokenAsync = async () => {
        try {
            const response = await apiClient.get('/auth/verify');
            return response.data as UserAuthResponse;
        } catch (err) {
            throw new Error(`Error: ${err}`);
        }
    };
    const userRefreshTokenAsync = async () => {
        try {
            const response = await apiClient.post('/auth/refresh');
            return response.data as UserAuthResponse;
        } catch (err) {
            throw new Error(`Error: ${err}`);
        }
    };
    const userLogOutAsync = async () => {
        try {
            await apiClient.post('/auth/logout');
        } catch (err) {
            throw new Error(`Error: ${err}`);
        }
    };
    return { userLoginAsync, userVerifyTokenAsync, userRefreshTokenAsync, userLogOutAsync };
};