import { ref, watch, type Ref } from "vue";
import { useMessageStore } from "../../stores/message";
import { useRouter } from "vue-router";
import { useChatAvailableUsers } from "../queries/useUsers";
import { useScoketService } from "./useSocketService";
import type { Message, User } from "../../types";
interface IUseChatService {
    receiverUser: Ref<User | undefined>;
    message: Ref<string>;
    messages: Ref<Message[]>;
    connect: () => void;
    handleSendMessage: () => void;
    initializeChat: () => Promise<void>;
    close: () => void;
}
export const useChatService = (senderId: number, receiverId: Ref<number>): IUseChatService => {
    const router = useRouter();
    const { data: chatAvailableUsers, refetch } = useChatAvailableUsers();
    const {
        socket,
        connectWebSocket,
        onOpen,
        onMessage,
        onClose,
        closeWebSocket
    } = useScoketService();
    const messageStore = useMessageStore();
    const receiverUser = ref<User | undefined>(undefined);
    const message = ref<string>("");
    const messages = ref<Message[]>([]);
    const connect = () => {
        connectWebSocket(`${import.meta.env.VITE_SOCKET_URL}?sender_id=${senderId}&receiver_id=${receiverId.value}`);
        onOpen(() => {
            console.log("Connected...");
        });
        onMessage((event) => {
            const receivedMessage = JSON.parse(event.data);
            messageStore.addMessage(receivedMessage);
        });
        onClose(() => {
            console.log("Disconnected...");
        });
    }
    const handleSendMessage = () => {
        if (socket.value && message.value.trim() !== "") {
            const newMessage: Message = {
                senderId,
                receiverId: receiverId.value,
                content: message.value.trim(),
                timestamp: Math.floor(Date.now() / 1000),
            };
            socket.value.send(newMessage.content);
            messageStore.addMessage(newMessage);
            message.value = "";
        }
    }
    const initializeChat = async () => {
        await refetch();
        if (chatAvailableUsers.value?.some(u => u.id == receiverId.value)) {
            await messageStore.getMessagesByUser(senderId, receiverId.value);
            messages.value = messageStore.messages;
            receiverUser.value = chatAvailableUsers.value.find(u => u.id == receiverId.value);
            if (receiverUser.value) {
                closeWebSocket();
                connect();
            }
        } else router.push("/");
    }
    watch(receiverId, async () => {
        closeWebSocket();
        await initializeChat();
    });
    return {
        receiverUser,
        message,
        messages,
        connect,
        handleSendMessage,
        initializeChat,
        close: closeWebSocket,
    };
};