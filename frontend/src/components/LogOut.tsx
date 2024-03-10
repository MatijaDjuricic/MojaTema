import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { logOut } from '../store/usersSlice';
import Modal from 'react-bootstrap/Modal';
import CTA from './CTA';
import logout_icon from '../assets/logout.svg';
import close_icon from '../assets/close.svg';
import LogOutModalCSS from './LogOut.module.css';
const ModalPopup = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogOutSubmit = () => {
    dispatch(logOut());
    navigate('/');
    scrollTo(0, 0);
  }
  return (
    <>
      <button onClick={() => setShow(true)} className={LogOutModalCSS.logout_btn} title='Odjavi se'>
          <ReactSVG src={logout_icon} className={LogOutModalCSS.logout_icon}/>
      </button>
      <Modal show={show} onHide={() => setShow(false)} contentClassName={LogOutModalCSS.modal_content} backdrop="static">
        <Modal.Header className={LogOutModalCSS.modal_header}>
          <Modal.Title className={LogOutModalCSS.modal_title}>Odjava</Modal.Title>
          <button className={LogOutModalCSS.close_btn} onClick={() => setShow(false)}>
            <ReactSVG className={LogOutModalCSS.close_icon} src={close_icon}/>
          </button>
        </Modal.Header>
        <Modal.Body className={LogOutModalCSS.modal_body}>
          <p>Da li ste sigurni da želite da se odjavite?</p>
        </Modal.Body>
        <Modal.Footer className={LogOutModalCSS.modal_footer}>
          <CTA title='Odjavi se' type='normal_btn' size='sm' onClick={LogOutSubmit}/>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalPopup;