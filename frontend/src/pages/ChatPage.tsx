import { useEffect, useRef, useState } from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addMessages } from '../store/messagesSlice';
import { useUserContext } from '../context/UserContext';
import { useToastMessage } from '../hooks/useToastMessage';
import { ReactSVG } from 'react-svg';
import SideBar from "../components/SideBar";
import send_icon from '../assets/send.svg';
import ChatCSS from './ChatPage.module.css';
const ChatPage = () => {
    const URL = import.meta.env.VITE_SOCKET_SERVICE_URL;
    const user = useUserContext();
    const messages = useSelector((state: RootState) => state.messages);
    const dispatch = useDispatch<AppDispatch>();
    const { errorMessage } = useToastMessage();
    const [connection, setConnection] = useState<HubConnection>();
    const [message, setMessage] = useState<string>('');
    const useEffectRef = useRef<boolean>(false);
    const sendMessage = async () => {
        if (connection && message) {
            await connection.invoke('SendMessage', user.id.toString(), `${user.first_name} ${user.last_name}`, message);
            dispatch(addMessages({
                id: user.id.toString(),
                content: message,
                user: `${user.first_name} ${user.last_name}`
            }));
            setMessage('');
        }
        else errorMessage("Поље за поруку је празно");
    }
    const startConnecton = async () => {
        try {
            const connection = new HubConnectionBuilder().withUrl(URL).configureLogging(LogLevel.Information).build();
            connection.on('ReceiveMessage', (id, username, message) => {
                if (user.id.toString() != id) {
                    dispatch(addMessages({
                        id: id,
                        content: message,
                        user: username
                    }));
                }
            })
            await connection.start();
            setConnection(connection);
        } catch (e) {
            errorMessage(e ? e.toString() : '');
        }
    }
    useEffect(() => {
        if (useEffectRef.current == false) startConnecton();
        return () => {
            useEffectRef.current = true;
        }
    }, []);
    return (
        <div className={ChatCSS.main_container}>
            <SideBar/>
            <header>
                <h1>Поруке</h1>
            </header>
            <main className={ChatCSS.main_wrapper}>
                <div className={ChatCSS.chat_wrapper}>
                    <div className={ChatCSS.input_wrapper}>
                        <textarea value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key == 'Enter' && sendMessage()} placeholder='Унеси поруку...'></textarea>
                        <button onClick={sendMessage}><ReactSVG src={send_icon}/></button>
                    </div>
                </div>
                <ul>
                    {
                        messages.messages.map((message, index) => message.content ? 
                            <li key={index}>
                                Порука: {message.content}<br/>
                                Корисник: {message.user}
                            </li>  : null
                        )
                    }
                </ul>
            </main>
        </div>
    );
}
export default ChatPage;