import { useEffect, useRef, useState } from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useParams } from 'react-router-dom';
import { addMessages, resetState } from '../store/messagesSlice';
import { useUserContext } from '../context/UserContext';
import { useToastMessage } from '../hooks/useToastMessage';
import { formatDate, formatTime } from '../utils/utils';
import { ReactSVG } from 'react-svg';
import SideBar from "../components/SideBar";
import send_icon from '../assets/send.svg';
import ChatCSS from './ChatPage.module.css';
import NavBar from '../components/NavBar';
const ChatPage = () => {
    const URL = import.meta.env.VITE_SOCKET_SERVICE_URL;
    const user = useUserContext();
    const messages = useSelector((state: RootState) => state.messages);
    const dispatch = useDispatch<AppDispatch>();
    const { errorMessage } = useToastMessage();
    const { room: currentRoom } = useParams<{ room: string }>();
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [message, setMessage] = useState("");
    const useEffectRef = useRef<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const roomName = user.role_status === 'mentor' && currentRoom ? `${currentRoom.split('-')[1]}-${user.first_name}${user.last_name}` : currentRoom;
    const scrollToBottom = () => messagesEndRef.current && messagesEndRef.current.scrollIntoView();
    const sendMessage = async () => {
        if (connection && message.trim() !== "") {
            try {
                await connection.invoke('SendMessage', roomName, user.id, `${user.first_name} ${user.last_name}`, message);
                dispatch(addMessages({
                    id: user.id,
                    user: `${user.first_name} ${user.last_name}`,
                    content: message,
                    created_at: new Date()
                }));
                setMessage("");
            } catch (e) {
                console.log(e);
            }
        } else errorMessage("Поље за поруку је празно");
    }
    const sendMessageOnEnter = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            const textarea = e.target as HTMLTextAreaElement;
            const selectionStart = textarea.selectionStart;
            const selectionEnd = textarea.selectionEnd;
            const value = textarea.value;
            const newValue = value.substring(0, selectionStart) + '\n' + value.substring(selectionEnd);
            setMessage(newValue);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            await sendMessage();
        }
    }
    const startConnection = async () => {
        await stopConnection();
        try {
            const newConnection = new HubConnectionBuilder().withUrl(URL).configureLogging(LogLevel.Information).build();
            newConnection.on('ReceiveMessage', (id, username, message) => {
                if (user.id.toString() !== id) {
                    dispatch(addMessages({
                        id: id,
                        content: message,
                        user: username,
                        created_at: new Date()
                    }));
                }
            });
            await newConnection.start();
            await newConnection.invoke('JoinRoom', roomName);
            setConnection(newConnection);
        } catch (error) {
            errorMessage(error ? error.toString() : 'Failed to start connection');
        }
    }
    const stopConnection = async () => {
        if (connection) {
            connection.off('ReceiveMessage');
            connection.off('close');
            await connection.invoke('LeaveRoom', roomName);
            await connection.stop();
            setConnection(null);
        }
        dispatch(resetState());
    }
    useEffect(() => {
        if (!useEffectRef.current) startConnection();
        return () => {
            useEffectRef.current = true;
        }
    }, []);
    useEffect(() => { scrollToBottom() }, [messages]);
    return (
        <>
            <NavBar/>
            <SideBar/>
            <div className={ChatCSS.main_container}>
                <main id='mainWrapper' className={ChatCSS.main_wrapper}>
                    <header className={ChatCSS.chat_header}>
                        <h1>Поруке</h1>
                        <div className={ChatCSS.date_line}><p>{formatDate(new Date())}</p></div>
                    </header>
                    <div className={ChatCSS.chat_wrapper}>
                        <div className={ChatCSS.messages_wrapper}>
                            {messages.messages.map((message, index) => message.content &&
                                <div key={index} className={message.id !== user.id ? ChatCSS.message_left : ChatCSS.message_right}>
                                    <div className={ChatCSS.message_box}>
                                        <span>{message.user}</span>
                                        <p>{message.content}</p>
                                        <span className={ChatCSS.created_at}>{formatTime(message.created_at)}</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <div className={ChatCSS.input_wrapper}>
                        <textarea value={message} onChange={e => setMessage(e.target.value)} onKeyDown={sendMessageOnEnter} placeholder='Унеси поруку...'></textarea>
                        <button onClick={sendMessage}><ReactSVG src={send_icon}/></button>
                    </div>
                </main>
            </div>
        </>
    );
}
export default ChatPage;