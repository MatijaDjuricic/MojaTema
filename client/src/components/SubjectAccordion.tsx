import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { updateTopic } from "../redux/slices/topicsSlice";
import { getCyrillicName, isReportedTopic } from "../utils/utils";
import { topicStatusEnum } from "../utils/constants";
import { Topic, User } from "../types/types";
import { ReactSVG } from "react-svg";
import CTA from "./CTA";
import arrow_icon from "../assets/arrow.svg";
import styles from "./SubjectAccordion.module.css";
type SubjectAccordionProps = {
  subject: Topic[];
  isRegisteredStudent: boolean;
  user: User;
};
const SubjectAccordion = ({ subject, user, isRegisteredStudent }: SubjectAccordionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [btnLoading, setBtnLoading] = useState({ btn_id: -1, loading: false });
  const [open, setOpen] = useState(false);
  const handleTopicUpdate = (topic_id: number, user_id: number) => {
    setBtnLoading({ btn_id: topic_id, loading: true });
    dispatch(updateTopic({ id: topic_id, userId: user_id })).finally(() => setBtnLoading({ btn_id: -1, loading: false }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={() => setOpen(!open)}>
        <div className={styles.header_text}>
            <h1>{subject[0].subjectTitle}</h1>
        </div>
        <button type="button" className={styles.toggle_btn}>
          <ReactSVG className={`${styles.toggle_icon} ${open ? styles.toggle_icon_rotated : ""}`} src={arrow_icon}/>
        </button>
      </div>
      <div className={`${styles.collapse_body} ${open ? styles.collapse_body_open : ""}`}>
        {
          subject.map((item, index) => (
            <div className={styles.topic_wrapper} key={index}>
              {index > 0 && <div className={styles.line}></div>}
              <p className={styles.topic_title}>{item.title}</p>
              <div className={styles.info_container}>
                <div className={styles.info_wrapper}>
                  <p className={styles.body_text}>
                    <span>Опис: </span>
                    {item.description}
                  </p>
                </div>
                <div className={styles.professor_wrapper}>
                  <p>Ментор</p>
                  <span>{item.professorUsername}</span>
                </div>
              </div>
              <div className={styles.reported_container}>
                <div className={styles.reported_wrapper}>
                  <p>
                    {item.status &&
                      <>
                        <span>Статус теме: </span>
                        {getCyrillicName(topicStatusEnum, item.status)}
                      </>
                    }
                  </p>
                  <div className={styles.reported_users_wrapper}>
                    <span>Пријављен ученик: {item.studentUsername || "/"}</span>
                  </div>
                </div>
                <div className={styles.cta_wrapper}>
                  {
                    isReportedTopic(item, user.id) ?
                    <CTA title="Одјави тему"
                      loading={btnLoading.btn_id === item.id && btnLoading.loading}
                      size="sm"
                      onClick={() => handleTopicUpdate(item.id, user.id)}
                    /> : item.studentUserId === null && !isRegisteredStudent ?
                    <CTA title="Пријави тему"
                      loading={btnLoading.btn_id === item.id && btnLoading.loading}
                      size="sm"
                      onClick={() => handleTopicUpdate(item.id, user.id)}
                    /> : <h1 style={{ color: "var(--red)" }}>1/1</h1>
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};
export default SubjectAccordion;