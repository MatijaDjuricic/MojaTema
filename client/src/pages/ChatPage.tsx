import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addMessages } from '../store/messagesSlice';
import { useUserContext } from '../context/UserContext';
import { useToastMessage } from '../hooks/useToastMessage';
import { formatDate, formatTime } from '../utils/utils';
import useSignalRService from '../hooks/useSignalRService';
import Header from '../components/Header';
import send_icon from '../assets/send.svg';
import styles from './ChatPage.module.css';
const ChatPage = () => {
    const user = useUserContext();
    const messages = useSelector((state: RootState) => state.messages);
    const dispatch = useDispatch<AppDispatch>();
    const { errorMessage } = useToastMessage();
    const { receiver: receiver } = useParams<{ receiver: string }>();
    const [message, setMessage] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const sendMessage = useSignalRService(receiver);
    const scrollToBottom = () => messagesEndRef.current && messagesEndRef.current.scrollIntoView();
    const handleSendMessage = async () => {
        if (message.trim() !== "") {
            await sendMessage(message);
            dispatch(addMessages({
                id: user.id,
                receiveUsername: `${user.firstName} ${user.lastName}`,
                content: message,
                createdAt: new Date()
            }));
            setMessage('');
        } else errorMessage("Поље за поруку је празно");
    };    
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
            await handleSendMessage();
        }
    }
    useEffect(() => { scrollToBottom() }, [messages]);
    return (
        <div className={styles.chat_container}>
            <Header>
                <>
                    <h1>Поруке - {messages.receiverUser?.firstName} {messages.receiverUser?.lastName}</h1>
                    <div className={styles.date_line}><p>{formatDate(new Date())}</p></div>
                </>
            </Header>
            <div className={styles.chat_wrapper}>
                <div className={styles.messages_wrapper}>
                {
                    messages.messages.map((message, index) => message.content &&
                        <div key={index} className={message.id !== user.id ? styles.message_left : styles.message_right}>
                            <div className={styles.message_box}>
                                <span>{message.receiveUsername}</span>
                                <p>{message.content}</p>
                                <span className={styles.created_at}>{formatTime(message.createdAt)}</span>
                            </div>
                        </div>
                    )
                }
                <div ref={messagesEndRef}/></div>
            </div>
            <div className={styles.input_wrapper}>
                <textarea value={message} onChange={e => setMessage(e.target.value)} onKeyDown={sendMessageOnEnter} placeholder='Унеси поруку...'></textarea>
                <button onClick={handleSendMessage}><ReactSVG src={send_icon}/></button>
            </div>
        </div>
    );
}
export default ChatPage;