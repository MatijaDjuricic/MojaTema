import { createApiClientPrivate } from "./apiClient";
import { useDispatch } from "react-redux";
import { Chats, ReceiverUser } from "../../types/types";
import { AppDispatch } from "../../redux/store";
import { fetchChatsByUserId, fetchReceiverUserById } from "../../redux/slices/messagesSlice";
export const useMessageService = () => {
    const apiClient = createApiClientPrivate();
    const dispatch = useDispatch<AppDispatch>();
    const fetchReceiverUserByIdAsync = async (id: number) => {
        try {
            const response = await apiClient.get(`/message/receiver/${id}`)
            const payload = await response.data as ReceiverUser;
            if (payload) dispatch(fetchReceiverUserById(payload));
        } catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
    const fetchChatsByUserIdAsync = async (id: number) => {
        try {
            const response = await apiClient.get(`/message/chats/user/${id}`)
            const payload = await response.data as Chats[];
            if (payload) dispatch(fetchChatsByUserId(payload));
        } catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
    return { fetchReceiverUserByIdAsync, fetchChatsByUserIdAsync };
}