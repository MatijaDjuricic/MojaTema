import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setReportedTopics, topicsFetchAll } from '../store/topicsSlice';
import { useUserContext } from '../context/UserContext';
import SideBar from '../components/SideBar';
import Loader from '../components/Loader';
import TopicHeader from '../components/TopicHeader';
import TopicAccordion from '../components/TopicAccordion';
import TopicsCSS from './TopicsPage.module.css';
const TopicsPage = () => {
  const user = useUserContext();
  const topics = useSelector((state: RootState) => state.topics);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);
  const effectRef = useRef<boolean>(false);
  useEffect(() => {
    const setUpTopics = async () => {
      await dispatch(topicsFetchAll()).finally(() => setLoading(false));
      dispatch(setReportedTopics(user.id));
    }
    if (effectRef.current == false) setUpTopics();
    return () => {
      effectRef.current = true;
    }
  }, []);
  return (
    <div className={TopicsCSS.main_container}>
      <SideBar/>
      <main className={TopicsCSS.main_wrapper}>
        <TopicHeader reported_topics={topics.reported_topics}/>
        {
          loading ? <Loader/> :
          <div className={TopicsCSS.topics_wrapper}>
            {
              topics.topics.map((topic, index) => (  
                <TopicAccordion key={index} topic={topic} user={user} reported_topics={topics.reported_topics}/>
              ))
            }
          </div>
        }
      </main>
    </div>
  );
}
export default TopicsPage;