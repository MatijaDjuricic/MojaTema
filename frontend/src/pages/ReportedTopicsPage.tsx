import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useUserContext } from "../context/UserContext";
import { topicsFetchByMentorId } from "../store/topicsSlice";
import SideBar from "../components/SideBar";
import Loader from "../components/Loader";
import ReportedTopicsCSS from './ReportedTopicsPage.module.css';
const ReportedTopicsPage = () => {
  const user = useUserContext();
  const topics = useSelector((state: RootState) => state.topics);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);
  const useEffectRef = useRef<boolean>(false);
  useEffect(() => {
    const fetchReportedTopics = async () => {
      await dispatch(topicsFetchByMentorId(user.id)).finally(() => setLoading(false));
    }
    if (useEffectRef.current == false) fetchReportedTopics();
    return () => {
      useEffectRef.current = true;
    }
  }, []);
  return (
    <div className={ReportedTopicsCSS.main_container}>
      <SideBar/>
      <header className={ReportedTopicsCSS.reported_topics_header}>
        <h1>Теме</h1>
        <p>Broj tema: {topics.topics.length}</p>
      </header>
      <main className={ReportedTopicsCSS.main_wrapper}>
        {
          loading ? <Loader/> : <>
            <div className={ReportedTopicsCSS.reported_topics_wrapper}>
              {
                topics.subjects.map((topic, index) => (
                  <div key={index}>
                    <h1>{topic[0].subject_title}</h1>
                    <p>({topic[0].professor_username})</p>
                    <br />
                    {
                      topics.subjects[index].map((topic, index) => (
                        <div key={index}>
                          <h1>{topic.title}</h1>
                          <p>Пријављени ученици: {topic.reportedTopicUsers.length < 1 && "/"}</p>
                            {
                              topic.reportedTopicUsers.length > 0 &&
                              <ul>
                                {topic.reportedTopicUsers.map((student, index) => <li key={index}>{student.student_username}</li>)}
                              </ul>
                            }
                        </div>
                      ))
                    }
                  </div>
                ))
              }
            </div>
          </>
        }
      </main>
    </div>
  );
}
export default ReportedTopicsPage;