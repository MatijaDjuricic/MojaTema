import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import Offcanvas from 'react-bootstrap/Offcanvas';
import bell_icon from '../assets/bell.svg';
import close_icon from '../assets/close.svg';
import NotificationCSS from './Notifications.module.css';
const Notifications = ({ type }: { type?: string }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      {
        type == 'icon' ?
        <button className={NotificationCSS.notification_btn} onClick={() => setShow(true)}>
          <ReactSVG src={bell_icon} className={NotificationCSS.nav_icons_fill}/>
        </button> :
        <button onClick={() => setShow(true)} className={NotificationCSS.nav_notification_btn} title='Обавештења'>
          <ReactSVG src={bell_icon} className={NotificationCSS.nav_notification_icon}/>
          <p>Обавештења</p>
        </button>
      }
      <Offcanvas className={NotificationCSS.canvas_bg} show={show} onHide={() => setShow(false)} placement='end'>
        <Offcanvas.Header>
          <Offcanvas.Title className={NotificationCSS.canvas_title}>Обавештења</Offcanvas.Title>
          <button className={NotificationCSS.close_btn} onClick={() => setShow(false)}>
            <ReactSVG className={NotificationCSS.close_icon} src={close_icon}/>
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body className={NotificationCSS.canvas_body}>
          <p>Нема обавештења...</p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Notifications;