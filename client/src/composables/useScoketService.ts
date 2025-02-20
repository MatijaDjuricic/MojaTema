import { ref, type Ref } from "vue";
import { useMessageStore } from "../stores/message";
import { getUserByIdAsync } from "../services/user";
import type { Message, User } from "../types"
interface IUseSocketService {
    receiverUser: Ref<User | null>,
    message: Ref<string>,
    messages: Ref<Message[]>,
    connectWebSocket: (senderId: number, receiverId: number) => void,
    handleSendMessage: (senderId: number, receiverId: number) => void,
    fetchChat: (senderId: number, receiverId: number) => Promise<void>
    closeWebSocket: () => void,
}
export const useSocketService = (): IUseSocketService => {
    const socket = ref<WebSocket | null>(null);
    const messageStore = useMessageStore();
    const receiverUser = ref<User | null>(null);
    const message = ref<string>("");
    const messages = ref<Message[]>([]);
    const connectWebSocket = (senderId: number, receiverId: number) => {
        socket.value = new WebSocket(
            `${import.meta.env.VITE_SOCKET_URL}?sender_id=${senderId}&receiver_id=${receiverId}`
        );
        socket.value.onopen = () => {
            console.log("Connected...");
        };
        socket.value.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            messageStore.addMessage(receivedMessage);
        };
        socket.value.onclose = () => {
            console.log("Disconnected...");
        };
    };
    const closeWebSocket = () => {
        if (socket.value) socket.value.close();
    }
    const handleSendMessage = (senderId: number, receiverId: number) => {
        if (socket.value && message.value.trim() !== "") {
            const newMessage: Message = {
                senderId,
                receiverId,
                content: message.value.trim(),
                timestamp: Math.floor(Date.now() / 1000),
            };
            socket.value.send(newMessage.content);
            messageStore.addMessage(newMessage);
            message.value = "";
        }
    };
    const fetchChat = async (senderId: number, receiverId: number) => {
        const response = await getUserByIdAsync(receiverId);
        if (response) {
            receiverUser.value = response;
            await messageStore.getMessagesByUser(senderId, receiverId);
            messages.value = messageStore.messages;
        }
    };
    return {
        receiverUser,
        message,
        messages,
        connectWebSocket,
        handleSendMessage,
        fetchChat,
        closeWebSocket
    };
}