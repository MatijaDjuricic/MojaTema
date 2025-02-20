import socketClient from "../socketClient";
import type { Message } from "../../types";
export const getMessagesAsync = async () => {
    try {
        const response = await socketClient.get('/messages');
        return await response.data as Message[];
    } catch (error) {
        console.error('Failed to fetch messages:', error);
    }
}
export const getMessagesByUserAsync = async (senderId: number, receiverId: number) => {
    try {
        const response = await socketClient.get(`/messages/chat?sender_id=${senderId}&receiver_id=${receiverId}`);
        return await response.data as Message[];
    } catch (error) {
        console.error('Failed to fetch messages:', error);
    }
}