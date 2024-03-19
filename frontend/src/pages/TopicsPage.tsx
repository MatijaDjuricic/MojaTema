import { useState, useEffect, useRef, useDeferredValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setReportedTopics, topicsFetchAll } from '../store/topicsSlice';
import { useUserContext } from '../context/UserContext';
import { hasNoSearchResults, isReportedTopic } from '../utils/utils';
import SideBar from '../components/SideBar';
import Loader from '../components/Loader';
import TopicsHeader from '../components/TopicsHeader';
import TopicAccordion from '../components/TopicAccordion';
import TopicsCSS from './TopicsPage.module.css';
const TopicsPage = () => {
  const user = useUserContext();
  const topics = useSelector((state: RootState) => state.topics);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const searchValue = useDeferredValue(search.toLowerCase());
  const useEffectRef = useRef<boolean>(false);
  useEffect(() => {
    const fetchTopics = async () => {
      await dispatch(topicsFetchAll()).finally(() => setLoading(false));
      dispatch(setReportedTopics(user.id));
    }
    if (useEffectRef.current == false) fetchTopics();
    return () => {
      useEffectRef.current = true;
    }
  }, []);
  return (
    <div className={TopicsCSS.main_container}>
      <SideBar/>
      <TopicsHeader topics={topics} search={search} onChange={e => setSearch(e.target.value)}/>
      <main className={TopicsCSS.main_wrapper}>
        {
          loading ? <Loader/> : <>
            <div className={TopicsCSS.topics_wrapper}>
              {
                topics.topics.map((topic, index) => (
                  isReportedTopic(topic, user.id) &&
                  <TopicAccordion key={index} topic={topic} user={user} reported_topics={topics.reported_topics} type='topic'/>
                ))
              }
            </div>
            { topics.reported_topics.current_number > 0 && <div className={TopicsCSS.line}></div> }
            <div className={TopicsCSS.subjects_wrapper}>
            {
              topics.subjects.filter(item => {
                return searchValue ? item[0].subject_title.toLowerCase().includes(searchValue.trim()) : item;
              }).map((topic, index) => ( 
                <TopicAccordion key={index} topic={topic[0]} subject={topic} user={user} reported_topics={topics.reported_topics} type='subject'/>
              ))
            }
            {
              topics.topics.filter(item => {
                return searchValue ? item.title.toLowerCase().includes(searchValue.trim()) ||
                item.professor_username.toLowerCase().includes(searchValue.trim()) : null;
              }).map((topic, index) => (
                <TopicAccordion key={index} topic={topic} user={user} reported_topics={topics.reported_topics} type='topic'/>
              ))
            }
            {
              hasNoSearchResults(searchValue, topics.topics) &&
              <p className={TopicsCSS.no_search_results}>Nema rezultata pretrage <span>"{searchValue}"</span></p>
            }
            </div>
          </>
        }
      </main>
    </div>
  );
}
export default TopicsPage;