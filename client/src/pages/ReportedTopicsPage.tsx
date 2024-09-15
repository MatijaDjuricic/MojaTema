import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { deleteTopic, fetchTopicsByProfessorId, updateTopicStatus } from "../store/topicsSlice";
import { useUserContext } from "../context/UserContext";
import { topicStatusEnum } from "../utils/constants";
import { useToastMessage } from "../hooks/useToastMessage";
import Loader from "../components/Loader";
import CTA from "../components/CTA";
import Chats from "../components/Chats";
import Header from "../components/Header";
import styles from './ReportedTopicsPage.module.css';
const ReportedTopicsPage = () => {
  const user = useUserContext();
  const { successMessage, errorMessage } = useToastMessage();
  const topics = useSelector((state: RootState) => state.topics);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);
  const useEffectRef = useRef<boolean>(false);
  const handleTopicStatusUpdate = async (topicId: number, topicStatus: number) => {
    await dispatch(updateTopicStatus({ 'id': topicId, 'professorId': user.id, 'topicStatus': topicStatus }))
    .catch(e => errorMessage(e))
    .finally(() => successMessage('Успешно додавање новог статуса теме'));
  }
  const handleTopicDelete = async (topicId: number ) => {
    await dispatch(deleteTopic({ 'id': topicId, 'professorId': user.id }))
    .catch(e => errorMessage(e))
    .finally(() => successMessage('Успешно брисање теме'));
  }
  useEffect(() => {
    const fetchReportedTopics = async () => {
      await dispatch(fetchTopicsByProfessorId(user.id)).finally(() => setLoading(false));
    }
    if (useEffectRef.current == false && topics.topics.length == 0) fetchReportedTopics();
    else setLoading(false);
    return () => {
      useEffectRef.current = true;
    }
  }, []);
  return (
    <>
      <Header><h1>Теме</h1></Header>
      {
        loading ? <Loader/> :
        <div className={styles.reported_topics_wrapper}>
          {
            topics.subjects.map((topic, index) => (
              <div key={index} className={styles.subject_item}>
                <h1>{topic[0].subjectTitle}</h1>
                {
                  topics.subjects[index].map((topic, index) => (
                    <div key={index} className={styles.topic_item}>
                      <div className={styles.title_wrapper}>
                        <h1>{topic.title}</h1>
                        <CTA title="Обриши тему"
                          color='red'
                          size='sm'
                          onClick={() => handleTopicDelete(topic.id)}
                        />
                      </div>
                      <p>Статус теме: {topic.status}</p>
                      <div className={styles.approved_users_wrapper}>
                        {
                          topic.studentUserId != null ? <>
                            <h1>Одобрен ученик: {topic.studentUsername}</h1>
                            <div key={index} className={styles.approved_users_item}>
                              <div className={styles.approved_users_options}>
                                <Chats type="link" receiverId={topic.studentUserId}/>
                                <CTA title="Врати на пријаву"
                                  color='red'
                                  size='sm'
                                  onClick={() => handleTopicStatusUpdate(topic.id, topicStatusEnum.SLOBODNA)}
                                />
                                {
                                  topic.status == "резервисана" ?
                                  <CTA title="Постави на чекање"
                                    color='green'
                                    size='sm'
                                    onClick={() => handleTopicStatusUpdate(topic.id, topicStatusEnum.NA_CEKANJU)}
                                  />
                                  : 
                                  <CTA title="Предај тему"
                                    color='green'
                                    size='sm'
                                    onClick={() => handleTopicStatusUpdate(topic.id, topicStatusEnum.REZERVISANA)}
                                  />
                                }
                              </div>
                            </div>
                          </> : <h1>Одобрен ученик: /</h1>
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      }
    </>
  );
}
export default ReportedTopicsPage;