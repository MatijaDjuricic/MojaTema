import { useEffect, useRef, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { useToastMessage } from '../hooks/useToastMessage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { createTopic, fetchTopicsByProfessorId } from "../redux/slices/topicsSlice";
import Header from '../components/Header';
import CTA from '../components/CTA';
import styles from './CreateTopicPage.module.css';
const CreateTopicPage = () => {
  const user = useUserContext();
  const { successMessage, errorMessage } = useToastMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const topics = useSelector((state: RootState) => state.topics);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const useEffectRef = useRef<boolean>(false);
  const handleClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (titleRef.current) titleRef.current.value = '';
    if (descriptionRef.current) descriptionRef.current.value = '';
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const title = titleRef.current?.value.trim();
    const description = descriptionRef.current?.value.trim();
    const subjectId = subjectRef.current?.value ? parseInt(subjectRef.current?.value, 10) : null;
    if (title && description && subjectId) {
      setLoading(true);
      await dispatch(createTopic({
        'title': title,
        'description': description,
        'subjectId': subjectId,
        'professorId': user.id
      })).finally(() => {
        setLoading(false);
        handleClear(e);
        successMessage('Успешно додата тема');
      });
    } else {
      errorMessage('Поља форме су празна');
    }
  };
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
      <Header><h1>Додавање теме</h1></Header>
      <form className={styles.create_form}>
        <label>ПРЕДМЕТ:</label>
        <select ref={subjectRef} defaultValue="">
          {
            topics.subjects.map((topic, index) => (
              <option key={index} value={topic[0].subjectId}>
                {topic[0].subjectTitle}
              </option>
            ))
          }
        </select>
        <label>НАЗИВ:</label>
        <input ref={titleRef} type="text" placeholder='Унеси назив...'/>
        <label>ОПИС:</label>
        <textarea ref={descriptionRef} placeholder='Унеси опис...'/>
        <div className={styles.cta_wrapper}>
          <CTA title='Додај тему' color='green' size='sm' loading={loading} onClick={handleSubmit}/>
          <CTA title='Одбаци тему' color='red' size='sm' onClick={handleClear}/>
        </div>
      </form>
    </>
  );
}
export default CreateTopicPage;