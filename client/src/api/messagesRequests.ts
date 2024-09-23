import apiClient from "./apiClient";
import { Chats, ReceiverUser } from "../types/types";
export const fetchReceiverUserByIdAsync = async (id: number) => {
    try {
        const response = await apiClient.get(`/message/receiver/${id}`)
        return await response.data as ReceiverUser;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const fetchChatsByUserIdAsync = async (id: number) => {
    try {
        const response = await apiClient.get(`/message/chats/user/${id}`)
        return await response.data as Chats[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}