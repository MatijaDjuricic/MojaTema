import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopics, selectRegisteredStudent, selectSubjects, selectTopics } from "../redux/slices/topicsSlice";
import { useUserContext } from "../context/UserContext";
import { useTopicSearch } from "../hooks/useTopicSearch";
import { hasNoSearchResults, isReportedTopic } from "../utils/utils";
import { AppDispatch } from "../redux/store";
import Loader from "../components/Loader";
import TopicsHeader from "../components/TopicsHeader";
import SubjectAccordion from "../components/SubjectAccordion";
import TopicAccordion from "../components/TopicAccordion";
import styles from "./TopicsPage.module.css";
const TopicsPage = () => {
  const user = useUserContext();
  const topics = useSelector(selectTopics);
  const subjects = useSelector(selectSubjects);
  const registeredStudent = useSelector(selectRegisteredStudent);
  const { search: searchValue, setSearch, clearSearch } = useTopicSearch();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);
  const useEffectRef = useRef<boolean>(false);
  useEffect(() => {
    const fetchAllTopics = async () => {
      await dispatch(fetchTopics()).finally(() => setLoading(false));
    };
    if (useEffectRef.current == false && topics.length == 0) fetchAllTopics();
    else setLoading(false);
    return () => {
      useEffectRef.current = true;
    };
  }, []);
  if (loading) return <Loader />;
  return (
    <>
      <TopicsHeader search={searchValue} onChange={e => setSearch(e.target.value)} onClear={() => clearSearch()}/>
      {
        <>
          <div className={styles.topics_wrapper}>
            {
              topics.map((topic, index) => (
                isReportedTopic(topic, user.id) &&
                <TopicAccordion key={index} topic={topic} user={user} isRegisteredStudent={registeredStudent}/>
              )) 
            }
          </div>
          { registeredStudent && <div className={styles.line}></div> }
          <div className={styles.subjects_wrapper}>
            {
              subjects.filter(item => {
                return searchValue ? item[0].subjectTitle.toLowerCase().includes(searchValue.toLowerCase().trim()) : item;
              }).map((topic, index) => ( 
                <SubjectAccordion key={index} subject={topic} user={user} isRegisteredStudent={registeredStudent}/>
              ))
            }
            {
              topics.filter(item => {
                return searchValue ? item.title.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
                item.professorUsername.toLowerCase().includes(searchValue.toLowerCase().trim()) : null;
              }).map((topic, index) => (
                <TopicAccordion key={index} topic={topic} user={user} isRegisteredStudent={registeredStudent}/>
              ))
            }
            {
              hasNoSearchResults(searchValue.toLowerCase(), topics) &&
              <p className={styles.no_search_results}>Нема резултата претраге <span>"{searchValue}"</span></p>
            }
          </div>
        </>
      }
    </>
  );
}
export default TopicsPage;