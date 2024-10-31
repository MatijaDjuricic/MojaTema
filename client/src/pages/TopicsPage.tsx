import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectSubjects, selectTopics } from "../redux/slices/topicsSlice";
import { useTopicService } from "../services/api/useTopicService";
import { useTopicSearch } from "../hooks/useTopicSearch";
import { hasNoSearchResults, isReportedTopic, isReportedUser } from "../utils/helpers";
import { useAuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import TopicsHeader from "../components/TopicsHeader";
import SubjectAccordion from "../components/SubjectAccordion";
import TopicAccordion from "../components/TopicAccordion";
import styles from "./TopicsPage.module.css";
const TopicsPage = () => {
  const { currentUser } = useAuthContext();
  const { fetchTopicsAsync } = useTopicService();
  const topics = useSelector(selectTopics);
  const subjects = useSelector(selectSubjects);
  const registeredStudent = isReportedUser(topics, currentUser.id);
  const { search: searchValue, setSearch, clearSearch } = useTopicSearch();
  const [loading, setLoading] = useState<boolean>(true);
  const useEffectRef = useRef<boolean>(false);
  useEffect(() => {
    const fetchAllTopics = async () => {
      await fetchTopicsAsync().finally(() => setLoading(false));
    };
    if (!useEffectRef.current) fetchAllTopics().finally(() => setLoading(false));
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
                isReportedTopic(topic, currentUser.id) &&
                <TopicAccordion key={index} topic={topic} user={currentUser} isRegisteredStudent={registeredStudent}/>
              )) 
            }
          </div>
          { registeredStudent && <div className={styles.line}></div> }
          <div className={styles.subjects_wrapper}>
            {
              subjects.filter(item => {
                return searchValue ? item[0].subjectTitle.toLowerCase().includes(searchValue.toLowerCase().trim()) : item;
              }).map((topic, index) => ( 
                <SubjectAccordion key={index} subject={topic} user={currentUser} isRegisteredStudent={registeredStudent}/>
              ))
            }
            {
              topics.filter(item => {
                return searchValue ? item.title.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
                item.professorUsername.toLowerCase().includes(searchValue.toLowerCase().trim()) : null;
              }).map((topic, index) => (
                <TopicAccordion key={index} topic={topic} user={currentUser} isRegisteredStudent={registeredStudent}/>
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