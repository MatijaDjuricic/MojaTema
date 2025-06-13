import apiClient from "../apiClient";
import type { User } from "../../types";
import type { IUpdateUserReqeust } from "../../types/interface";
export const getUsersAsync = async () => {
    try {
        const response = await apiClient.get('api/users');
        return await response.data.data as User[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const getUserByIdAsync = async (id: number) => {
    try {
        const response = await apiClient.get(`api/users/${id}`);
        return await response.data.data as User;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const getChatAvailableUsersAsync = async (receiver_id?: number) => {
    try {
        const query: string = receiver_id ? `?receiver_id=${receiver_id}` : '';
        const response = await apiClient.get(`api/users/chat${query}`);
        return await response.data.data as User[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const createUserAsync = async (data: IUpdateUserReqeust) => {
    try {
        const response = await apiClient.post('api/users', data);
        return await response.data.data as User;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const importUserAsync = async (formData: FormData) => {
    try {
        const response = await apiClient.post('api/users/import', formData, {
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
        const response = await apiClient.put(`api/users/${id}`, data);
        return await response.data.data as User;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const deleteUserAsync = async (id: number) => {
    try {
        const response = await apiClient.delete(`api/users/${id}`);
        return await response.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}