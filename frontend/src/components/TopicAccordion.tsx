import { useState } from 'react';
import { useAccordionButton } from 'react-bootstrap';
import { topicsRegistrationApply, topicsRegistrationCancel } from '../store/topicsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { Topic, User } from '../types/types';
import { ReactSVG } from 'react-svg';
import { isReportedTopic } from '../utils/utils';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import CTA from './CTA';
import arrow_icon from '../assets/arrow.svg';
import TopicAccordionCSS from './TopicAccordion.module.css';
type TopicAccordionProps = {
  type: 'topic' | 'subject',
  topic: Topic,
  subject?: Topic[],
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
const TopicAccordion = ({type, subject, topic, reported_topics, user}: TopicAccordionProps) => {
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
        <Card.Header style={{position: 'relative', border: 'none'}}>
          <ToggleButton eventKey="0"/>
            <div className={TopicAccordionCSS.header_text}>
              {
                type == 'topic' ? <>
                  <h1>{topic.title}</h1>
                  <p>({topic.subject_title} - {topic.professor_username})</p>
                </> : <h1>{topic.subject_title}</h1>
              }
            </div>
          </Card.Header>
         <Accordion.Collapse eventKey="0">
          <Card.Body className={TopicAccordionCSS.card_body}>
            {
              type == 'topic' ? <>
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
                      {
                        topic.student_username && <>
                          <span>Odobren učenik: </span>
                          {topic.student_username}
                        </>
                      }
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
                      isReportedTopic(topic, user.id) ?
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
              </> : <>
                {
                  subject?.map((topic, index) => (
                    <div key={index}>
                      { index > 0 && <div className={TopicAccordionCSS.line}></div> }
                      <p style={{fontSize: "1.7rem"}}>{topic.title}</p>
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
                            {
                              topic.student_username && <>
                                <span>Odobren učenik: </span>
                                {topic.student_username}
                              </>
                            }
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
                            isReportedTopic(topic, user.id) ?
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
                    </div>
                  ))
                }
              </>
            }
            </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
export default TopicAccordion;