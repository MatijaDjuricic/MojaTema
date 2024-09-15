import { useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import bell_icon from '../assets/bell.svg';
import close_icon from '../assets/close.svg';
import styles from './Notifications.module.css';
const Notifications = ({ type }: { type?: string }) => {
  const [show, setShow] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) setShow(false);
    };
    if (show) document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);
  return (
    <>
      {
        type === 'icon' ?
        <button className={styles.notification_btn} onClick={() => setShow(true)}>
          <ReactSVG src={bell_icon} className={styles.nav_icons_fill} />
        </button>
        :
        <button onClick={() => setShow(true)} className={styles.nav_notification_btn} title='Обавештења'>
          <ReactSVG src={bell_icon} className={styles.nav_notification_icon} />
          <p>Обавештења</p>
        </button>
      }
      <div ref={panelRef} className={`${styles.canvas_bg} ${show ? styles.show : null}`}>
        <div className={styles.canvas_header}>
          <h1 className={styles.canvas_title}>Обавештења</h1>
          <button className={styles.close_btn} onClick={() => setShow(false)}>
            <ReactSVG className={styles.close_icon} src={close_icon} />
          </button>
        </div>
        <div className={styles.canvas_body}>
          <p>Нема обавештења...</p>
        </div>
      </div>
    </>
  );
};
export default Notifications;