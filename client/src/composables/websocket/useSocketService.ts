import { ref, type Ref } from "vue";
interface IUseSocketService {
    socket: Ref<WebSocket | null>,
    connectWebSocket: (url: string) => void,
    onOpen: (callback: () => void) => void,
    onClose: (callback: () => void) => void,
    onMessage: (callback: (event: MessageEvent) => void) => void,
    closeWebSocket: () => void,
}
export const useScoketService = (): IUseSocketService => {
    const socket = ref<WebSocket | null>(null);
    const connectWebSocket = (url: string) => socket.value = new WebSocket(url);
    const onOpen = (callback: () => void) => {
        if (socket.value) {
            socket.value.onopen = () => callback();
        }
    }
    const onMessage = (callback: (event: MessageEvent) => void) => {
        if (socket.value) {
            socket.value.onmessage = (event) => callback(event);
        }
    }
    const onClose = (callback: () => void) => {
        if (socket.value) {
            socket.value.onclose = () => callback();
        }
    }
    const closeWebSocket = () => socket.value && socket.value.close();
    return {
        socket,
        connectWebSocket,
        onOpen,
        onMessage,
        onClose,
        closeWebSocket,
    }
}