import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useEffect } from 'react';
import { topicsFetchAll } from '../store/topicsSlice';
import Loader from '../components/Loader';
import SideBar from '../components/SideBar';
import TopicsCSS from './TopicsPage.module.css';
const TopicsPage = () => {
  const { getUserAuth } = useAuth();
  const user = getUserAuth();
  const topics = useSelector((state: RootState) => state.topics.topics);
  const loading_status = useSelector((state: RootState) => state.topics.loading_status);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(topicsFetchAll());
  }, [dispatch]);
  return (
    <div className={TopicsCSS.main_container}>
      <SideBar user = {user}/>
      <main className={TopicsCSS.main_wrapper}>
        <h1>Teme</h1>
        {
          loading_status ? <Loader/> :
          topics.map((topic, index) => (
            <div key={index}>
              <p>{topic.id}</p>
              <p>{topic.subject_title}</p>
              <p>{topic.title}</p>
              <p>{topic.info}</p>
              <p>{topic.professor_username}</p>
              <p>{topic.student_username}</p>
              <br />
            </div>
          ))
        }
      </main>
    </div>
  );
}
export default TopicsPage;