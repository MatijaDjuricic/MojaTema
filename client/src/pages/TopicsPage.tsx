import { useState, useEffect, useRef, useDeferredValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchTopics } from '../redux/slices/topicsSlice';
import { useUserContext } from '../context/UserContext';
import { hasNoSearchResults, isReportedTopic } from '../utils/utils';
import Loader from '../components/Loader';
import TopicsHeader from '../components/TopicsHeader';
import TopicAccordion from '../components/TopicAccordion';
import styles from './TopicsPage.module.css';
const TopicsPage = () => {
  const user = useUserContext();
  const topics = useSelector((state: RootState) => state.topics);
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const searchValue = useDeferredValue(search.toLowerCase());
  const useEffectRef = useRef<boolean>(false);
  useEffect(() => {
    const fetchAllTopics = async () => {
      await dispatch(fetchTopics()).finally(() => setLoading(false));
    }
    if (useEffectRef.current == false && topics.topics.length == 0) fetchAllTopics();
    else setLoading(false);
    return () => {
      useEffectRef.current = true;
    }
  }, []);
  return (
    <>
      <TopicsHeader search={search} onChange={e => setSearch(e.target.value)} onClear={() => setSearch('')}/>
      {
        loading ? <Loader/> : <>
          <div className={styles.topics_wrapper}>
            {
              topics.topics.map((topic, index) => (
                isReportedTopic(topic, user.id) &&
                <TopicAccordion key={index} topic={topic} user={user} isRegisteredStudent={topics.registeredStudent} type='topic'/>
              )) 
            }
          </div>
          { topics.registeredStudent && <div className={styles.line}></div> }
          <div className={styles.subjects_wrapper}>
            {
              topics.subjects.filter(item => {
                return searchValue ? item[0].subjectTitle.toLowerCase().includes(searchValue.trim()) : item;
              }).map((topic, index) => ( 
                <TopicAccordion key={index} topic={topic[0]} subject={topic} user={user} isRegisteredStudent={topics.registeredStudent} type='subject'/>
              ))
            }
            {
              topics.topics.filter(item => {
                return searchValue ? item.title.toLowerCase().includes(searchValue.trim()) ||
                item.professorUsername.toLowerCase().includes(searchValue.trim()) : null;
              }).map((topic, index) => (
                <TopicAccordion key={index} topic={topic} user={user} isRegisteredStudent={topics.registeredStudent} type='topic'/>
              ))
            }
            {
              hasNoSearchResults(searchValue, topics.topics) &&
              <p className={styles.no_search_results}>Нема резултата претраге <span>"{searchValue}"</span></p>
            }
          </div>
        </>
      }
    </>
  );
}
export default TopicsPage;