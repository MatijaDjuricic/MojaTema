import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CustomNavButton from './CustomNavButton';
import bell_icon from '../assets/bell.svg';
import close_icon from '../assets/close.svg';
import NotificationCSS from './Notifications.module.css';
const Notifications = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <CustomNavButton title='Obaveštenja' icon={bell_icon} type='fill' onClick={() => setShow(true)}/>
      <Offcanvas className={NotificationCSS.canvas_bg} show={show} onHide={() => setShow(false)} placement='end'>
        <Offcanvas.Header>
          <Offcanvas.Title className={NotificationCSS.canvas_title}>Obaveštenja</Offcanvas.Title>
          <button className={NotificationCSS.close_btn} onClick={() => setShow(false)}>
            <ReactSVG className={NotificationCSS.close_icon} src={close_icon}/>
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body className={NotificationCSS.canvas_body}>
          <p>Nema obaveštenja...</p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Notifications;