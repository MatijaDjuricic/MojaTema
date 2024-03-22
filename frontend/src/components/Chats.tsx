import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CustomNavButton from './CustomNavButton';
import chats_icon from '../assets/chats.svg';
import close_icon from '../assets/close.svg';
import ChatsCSS from './Chats.module.css';
const Chats = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <CustomNavButton title='Поруке' icon={chats_icon} type='stroke' onClick={() => setShow(true)}/>
      <Offcanvas className={ChatsCSS.canvas_bg} show={show} onHide={() => setShow(false)} placement='end'>
        <Offcanvas.Header>
          <Offcanvas.Title className={ChatsCSS.canvas_title}>Поруке</Offcanvas.Title>
          <button className={ChatsCSS.close_btn} onClick={() => setShow(false)}>
            <ReactSVG className={ChatsCSS.close_icon} src={close_icon}/>
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body className={ChatsCSS.canvas_body}>
          <p>Нема порука...</p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Chats;