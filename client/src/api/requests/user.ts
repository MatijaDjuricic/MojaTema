import apiClient from "../apiClient";
import type { User } from "../../types";
import type { IUpdateUserReqeust } from "../../types/interface";
export const getUsersAsync = async () => {
    try {
        const response = await apiClient.get('/users');
        return await response.data.data as User[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const getUserByIdAsync = async (id: number) => {
    try {
        const response = await apiClient.get(`/users/${id}`);
        return await response.data.data as User;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const getChatAvailableUsersAsync = async (receiver_id?: number) => {
    try {
        const query: string = receiver_id ? `?receiver_id=${receiver_id}` : '';
        const response = await apiClient.get(`/users/chat${query}`);
        return await response.data.data as User[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const createUserAsync = async (data: IUpdateUserReqeust) => {
    try {
        const response = await apiClient.post('/users', data);
        return await response.data.data as User;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const importUserAsync = async (formData: FormData) => {
    try {
        const response = await apiClient.post('/users/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return await response.data.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const updateUserAsync = async (id: number, data: IUpdateUserReqeust) => {
    try {
        const response = await apiClient.put(`/users/${id}`, data);
        return await response.data.data as User;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const deleteUserAsync = async (id: number) => {
    try {
        const response = await apiClient.delete(`/users/${id}`);
        return await response.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}