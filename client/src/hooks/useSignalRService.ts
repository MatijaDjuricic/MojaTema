import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addMessages, fetchReceiverUserById } from "../redux/slices/messagesSlice";
import { useCookie } from "../hooks/useCookie";
import * as signalR from "@microsoft/signalr";
const useSignalRService = (receiver: string | undefined) => {
    const URL = import.meta.env.VITE_SOCKET_SERVICE_URL;
    const { getCookie } = useCookie();
    const token = getCookie('accessToken');
    const receiverUser = useSelector((state: RootState) => state.messages.receiverUser);
    const dispatch = useDispatch<AppDispatch>();
    const [hubConnection, setHubConnection] = useState<signalR.HubConnection | null>(null);
    const [connectionState, setConnectionState] = useState<signalR.HubConnectionState>(signalR.HubConnectionState.Disconnected);
    const useEffectRef = useRef<boolean>(false);
    useEffect(() => {
      const fetchReceiverUser = async () => {
        await dispatch(fetchReceiverUserById(parseInt(receiver!)));
      };
      if (useEffectRef.current == false && receiver) fetchReceiverUser();
      return () => {
        useEffectRef.current = true;
      };
    }, []);
    useEffect(() => {
        if (!receiverUser) return;
        const connection = new signalR.HubConnectionBuilder().withUrl(URL, { accessTokenFactory: () => token || '' }).build();
        const handleReceiveMessage = (messageDto: { receiverId: string, userIdentifier: string, message: string }) => {
            if (receiverUser) {
                dispatch(addMessages({
                    id: parseInt(messageDto.receiverId),
                    content: messageDto.message,
                    receiveUsername: `${receiverUser.firstName} ${receiverUser.lastName}`,
                    createdAt: new Date()
                }));
            } else console.error('Receiver user is not defined.');
        };
        connection.on("ReceiveMessage", handleReceiveMessage);
        connection.start().then(() => {
            setHubConnection(connection);
            setConnectionState(connection.state);
        }).catch(err => console.error('SignalR connection error: ', err));
        connection.onclose(() => setConnectionState(signalR.HubConnectionState.Disconnected));
        return () => {
            connection.off("ReceiveMessage", handleReceiveMessage);
            connection.stop();
        };
    }, [dispatch, receiverUser, URL, token]);
    const sendMessage = async (message: string) => {
        if (hubConnection && connectionState === signalR.HubConnectionState.Connected) {
            try {
                await hubConnection.invoke("SendMessage", receiverUser?.receiverId.toString(), message);
            } catch (err) {
                console.error('Send message error: ', err);
            }
        }
    };
    return sendMessage;
};
export default useSignalRService;