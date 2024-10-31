import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuthContext } from "../context/AuthContext";
import { useMessageService } from "../services/api/useMessageService";
import { ReactSVG } from "react-svg";
import { selectChats } from "../redux/slices/messagesSlice";
import CTA from "./CTA";
import styles from "./Chats.module.css";
import chats_icon from "../assets/chats.svg";
import close_icon from "../assets/close.svg";
type ChatsProps = {
  type?: 'icon' | 'link',
  receiverId?: number
}
const Chats = ({ type, receiverId }: ChatsProps) => {
  const { currentUser } = useAuthContext();
  const { fetchChatsByUserIdAsync } = useMessageService();
  const chats = useSelector(selectChats);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toChat = (receiverId: number) => {
    navigate(`/chat/${receiverId}`);
    setShow(false);
  }
  const fetchChats = useCallback(async () => {
    await fetchChatsByUserIdAsync(currentUser.id);
  }, [currentUser.id]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
      fetchChats();
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);
  return (
    <>
      {
        type === "icon" ?
        <button className={styles.chat_btn} onClick={() => setShow(true)}>
          <ReactSVG src={chats_icon} className={styles.nav_icons_stroke} />
        </button> : type == 'link' ?
        <button className={styles.chat_btn} onClick={() => toChat(receiverId!)}>
          <ReactSVG src={chats_icon} className={styles.nav_icons_stroke} />
        </button> :
        <button className={styles.nav_chat_btn} onClick={() => setShow(true)} title="Поруке">
          <ReactSVG src={chats_icon} className={styles.nav_chat_icon} />
          <p>Поруке</p>
        </button>
      }
      <div ref={panelRef} className={`${styles.canvas_bg} ${show ? styles.show : ""}`}>
        <div className={styles.canvas_header}>
          <h1 className={styles.canvas_title}>Поруке</h1>
          <button className={styles.close_btn} onClick={() => setShow(false)}>
            <ReactSVG className={styles.close_icon} src={close_icon} />
          </button>
        </div>
        <div className={styles.canvas_body}>
          <div className={styles.chats_wrapper}>
            {
              chats.length > 0 ?
              chats.map((chat) => (
                <div className={styles.card} key={chat.id}>
                  <div className={styles.card_body}>
                    <p>{ chat.firstName } { chat.lastName }</p>
                    <CTA
                      title="Поруке"
                      onClick={() => toChat(chat.id)}
                      size="sm"
                    />
                  </div>
                </div>
              )) : <p>Нема конверзација(порука)</p>
            }
          </div>
        </div>
      </div>
    </>
  );
};
export default Chats;