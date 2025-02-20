import apiClient from "../apiClient";
import type { User } from "../../types";
export const getUsersAsync = async () => {
    try {
        const response = await apiClient.get('/users');
        return await response.data.data as User[];
    } catch (error) {
        console.error('Failed to fetch topics:', error);
    }
}
export const getUserByIdAsync = async (id: number) => {
    try {
        const response = await apiClient.get(`/users/${id}`);
        return await response.data.data as User;
    } catch (error) {
        console.error('Failed to fetch topics:', error);
    }
}
export const getChatAvailableUsersAsync = async () => {
    try {
        const response = await apiClient.get(`/users/chat`);
        return await response.data.data as User[];
    } catch (error) {
        console.error('Failed to fetch topics:', error);
    }
}