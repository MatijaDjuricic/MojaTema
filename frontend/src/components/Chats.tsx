import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetReportedMentorsTopicsByUserId, GetReportedUsersTopicsByMentorId } from '../store/topicsSlice';
import { reportedTopic } from '../types/types';
import { Card, CardBody } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CTA from './CTA';
import chats_icon from '../assets/chats.svg';
import close_icon from '../assets/close.svg';
import ChatsCSS from './Chats.module.css';
const Chats = ({ type }: { type?: string}) => {
  const user = useUserContext();
  const topics = useSelector((state: RootState) => state.topics);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const useEffectRef = useRef(false);
  const toChat = (topic: reportedTopic) => {
    navigate(`/chat/${user.first_name}${user.last_name}-${topic.first_name}${topic.last_name}`);
    setShow(false);
  }
  useEffect(() => {
    const fetchReportedTopics = async () => {
      if (user.role_status == "mentor") {
        await dispatch(GetReportedMentorsTopicsByUserId(user.id));
      } else if (user.role_status == "ucenik") {
        await dispatch(GetReportedUsersTopicsByMentorId(user.id));
      }
    }
    if (useEffectRef.current == false) fetchReportedTopics();
    return () => {
      useEffectRef.current = true;
    }
  }, []);
  return (
    <>
      {
        type == 'icon' ?
        <button className={ChatsCSS.chat_btn} onClick={() => setShow(true)}>
          <ReactSVG src={chats_icon} className={ChatsCSS.nav_icons_stroke}/>
        </button> :
        <button className={ChatsCSS.nav_chat_btn} onClick={() => setShow(true)} title='Поруке'>
          <ReactSVG src={chats_icon} className={ChatsCSS.nav_chat_icon}/>
          <p>Поруке</p>
        </button>
      }
      <Offcanvas className={ChatsCSS.canvas_bg} show={show} onHide={() => setShow(false)} placement='end'>
        <Offcanvas.Header>
          <Offcanvas.Title className={ChatsCSS.canvas_title}>Поруке</Offcanvas.Title>
          <button className={ChatsCSS.close_btn} onClick={() => setShow(false)}>
            <ReactSVG className={ChatsCSS.close_icon} src={close_icon}/>
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body className={ChatsCSS.canvas_body}>
          <div className={ChatsCSS.chats_wrapper}>
            {
              topics.reported_topics.topics.length > 0 ?
              topics.reported_topics.topics.map((topic, index) => (
                <Card key={index} className={ChatsCSS.card}>
                    <CardBody className={ChatsCSS.card_body} key={index}>
                      <p>{topic.first_name} {topic.last_name}</p>
                      <CTA title='Поруке' onClick={() => toChat(topic)} type={'normal_btn'} size={'sm'}/>
                    </CardBody>
                </Card>
              )) : <p>Нема конверзација(порука)</p>
            }
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Chats;