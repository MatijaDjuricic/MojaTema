import { useState } from 'react';
import { useAccordionButton } from 'react-bootstrap';
import { topicsRegistrationApply, topicsRegistrationCancel } from '../store/topicsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { Topic, User } from '../types/types';
import { ReactSVG } from 'react-svg';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import CTA from './CTA';
import arrow_icon from '../assets/arrow.svg';
import TopicAccordionCSS from './TopicAccordion.module.css';
type TopicAccordionProps = {
  topic: Topic,
  user: User,
  reported_topics: {
    current_number: number;
    limit: number
  }
}
type TopicAccordionToggleButtonProps = {
  eventKey: string
}
const ToggleButton = ({eventKey}: TopicAccordionToggleButtonProps) => {
  const [rotate, setRotate] = useState<boolean>(false);
  const decoratedOnClick = useAccordionButton(eventKey, () => setRotate(!rotate));
  return (
    <button type="button" className={TopicAccordionCSS.toggle_btn} onClick={decoratedOnClick}>
      <ReactSVG className={`${TopicAccordionCSS.toggle_icon} ${rotate && TopicAccordionCSS.toggle_icon_rotated}`} src={arrow_icon}/>
    </button>
  );
}
const TopicAccordion = ({topic, reported_topics, user}: TopicAccordionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [btnLoading, setBtnLoading] = useState({btn_id: -1, loading: false});
  const handleTopicsRegistrationApply = (topic_id: number) => {
    setBtnLoading({btn_id: topic_id, loading: true});
    dispatch(topicsRegistrationApply({"user_id": user.id, "topic_id": topic_id})).finally(() => setBtnLoading({btn_id: -1, loading: false}));
  }
  const handleTopicsRegistrationCancel = (topic_id: number) => {
    setBtnLoading({btn_id: topic_id, loading: true});
    dispatch(topicsRegistrationCancel({"user_id": user.id, "topic_id": topic_id})).finally(() => setBtnLoading({btn_id: -1, loading: false}));
  }
  return (
    <Accordion defaultActiveKey="1">
      <Card className={TopicAccordionCSS.container}>
        <Card.Header style={{position: 'relative'}}>
          <ToggleButton eventKey="0"/>
            <div className={TopicAccordionCSS.header_text}><h1>{topic.title}</h1><p>{topic.subject_title}</p></div>
          </Card.Header>
         <Accordion.Collapse eventKey="0">
          <Card.Body className={TopicAccordionCSS.card_body}>
            <div className={TopicAccordionCSS.info_container}>
              <div className={TopicAccordionCSS.info_wrapper}>
                <p className={TopicAccordionCSS.body_text}>
                  <span>Opis: </span>
                  {topic.info}
                  </p>
              </div>
              <div className={TopicAccordionCSS.professor_wrapper}>
                <p>Profesor</p>
                <span>{topic.professor_username}</span>
              </div>
            </div>
            <div className={TopicAccordionCSS.reported_container}>
              <div className={TopicAccordionCSS.reported_wrapper}>
                <p>
                  <span>Odobren učenik: </span>
                  {topic.student_username ? topic.student_username : '/'}
                </p>
                <div className={TopicAccordionCSS.reported_users_wrapper}>
                    <span>Prijavljeni učenici: </span>
                  <ul>
                    {
                      topic.reportedTopicUsers.length > 0 ? 
                        topic.reportedTopicUsers.map((reported_topic, index) =>
                          <li key={index}>
                            {topic.reportedTopicUsers.length != 1 && index != 0 && ', '}
                            {reported_topic.student_username}
                          </li>
                        )
                      : <li>/</li>
                    }
                  </ul>
                </div>
              </div>
              <div className={TopicAccordionCSS.cta_wrapper}>
                {
                  topic.reportedTopicUsers.find(reported_topic => reported_topic.user_id == user.id ? true : false) ?
                  <CTA title="Odjavi temu" type='loading_btn' loading={btnLoading.btn_id == topic.id && btnLoading.loading}
                  size='sm' onClick={() => handleTopicsRegistrationCancel(topic.id)}
                  /> : 
                  reported_topics.current_number < reported_topics.limit ?
                  <CTA title="Prijavi temu" type='loading_btn' loading={btnLoading.btn_id == topic.id && btnLoading.loading}
                    size='sm' onClick={() => handleTopicsRegistrationApply(topic.id)}
                  /> :
                  <h3 style={{color: 'var(--red)'}}>3/3</h3>
                }
              </div>
            </div>
            </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
export default TopicAccordion;