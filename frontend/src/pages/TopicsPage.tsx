import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { topicsFetchAll, topicsRegistrationApply, topicsRegistrationCancel } from '../store/topicsSlice';
import { useUserContext } from '../context/UserContext';
import Card from 'react-bootstrap/Card';
import Loader from '../components/Loader';
import SideBar from '../components/SideBar';
import CTA from '../components/CTA';
import TopicsCSS from './TopicsPage.module.css';
const TopicsPage = () => {
  const user = useUserContext();
  const effectRef = useRef<boolean>(false);
  const topics = useSelector((state: RootState) => state.topics.topics);
  const [loading, setLoading] = useState<boolean>(true);
  const [btnLoading, setBtnLoading] = useState({btn_id: -1, loading: false});
  const dispatch = useDispatch<AppDispatch>();
  const handleTopicsRegistrationApply = (user_id: number, topic_id: number) => {
    setBtnLoading({btn_id: topic_id, loading: true});
    dispatch(topicsRegistrationApply({"user_id": user_id, "topic_id": topic_id})).finally(() => setBtnLoading({btn_id: -1, loading: false}));
  }
  const handleTopicsRegistrationCancel = (topic_id: number) => {
    setBtnLoading({btn_id: topic_id, loading: true});
    dispatch(topicsRegistrationCancel(topic_id)).finally(() => setBtnLoading({btn_id: -1, loading: false}));
  }
  useEffect(() => {
    if (effectRef.current == false) {
      dispatch(topicsFetchAll()).finally(() => setLoading(false));
    }
    return () => {
      effectRef.current = true;
    }
  }, []);
  return (
    <div className={TopicsCSS.main_container}>
      <SideBar/>
      <main className={TopicsCSS.main_wrapper}>
        <h1>Teme</h1>
        {
          loading ? <Loader/> :
          <div className={TopicsCSS.topics_wrapper}>
            {
              topics.map((topic, index) => (
                <Card key={index} className={TopicsCSS.card}>
                  <Card.Body>
                    <Card.Title className={TopicsCSS.title}>{topic.subject_title}</Card.Title>
                    <Card.Subtitle className={TopicsCSS.subtitle}>Tema: {topic.title}</Card.Subtitle>
                    <Card.Subtitle className={TopicsCSS.subtitle}>Profesor: {topic.professor_username}</Card.Subtitle>
                    <Card.Text>
                      Opis: {topic.info}
                    </Card.Text>
                    {
                      topic.user_id && topic.user_id != -1 ?
                      <>
                        <Card.Subtitle className={TopicsCSS.subtitle}>Prijavljen ucenik: {topic.student_username}</Card.Subtitle>
                        {
                          topic.user_id == user.id &&
                          <CTA title="Odjavi temu" type='loading_btn' loading={btnLoading.btn_id == topic.id && btnLoading.loading} size='sm' onClick={() => handleTopicsRegistrationCancel(topic.id)}/>
                        }
                      </>
                      :
                      <CTA title="Prijavi temu" type='loading_btn' loading={btnLoading.btn_id == topic.id && btnLoading.loading} size='sm' onClick={() => handleTopicsRegistrationApply(user.id, topic.id)}/>
                    }
                  </Card.Body>
                </Card>
              ))
            }
          </div>
        }
      </main>
    </div>
  );
}
export default TopicsPage;