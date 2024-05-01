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
const LogOutModal = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutSubmit = () => {
    dispatch(logOut());
    navigate('/');
    scrollTo(0, 0);
  }
  const ButtonLogOut = (): JSX.Element => {
    return (
      <button onClick={() => setShow(true)} className={LogOutModalCSS.logout_btn} title='Одјави се'>
        <ReactSVG src={logout_icon} className={LogOutModalCSS.logout_icon}/><p>Одјави се</p>
      </button>
    );
  }
  const ModalLogOut = (): JSX.Element => {
    return (
      <Modal show={show} onHide={() => setShow(false)} contentClassName={LogOutModalCSS.modal_content} backdrop="static">
        <Modal.Header className={LogOutModalCSS.modal_header}>
          <Modal.Title className={LogOutModalCSS.modal_title}>Одјава</Modal.Title>
          <button className={LogOutModalCSS.close_btn} onClick={() => setShow(false)}>
            <ReactSVG className={LogOutModalCSS.close_icon} src={close_icon}/>
          </button>
        </Modal.Header>
        <Modal.Body className={LogOutModalCSS.modal_body}>
          <p>Да ли сте сигурни да желите да се одјавите?</p>
        </Modal.Body>
        <Modal.Footer className={LogOutModalCSS.modal_footer}>
          <CTA title='Одјави се' type='normal_btn' size='sm' onClick={logOutSubmit}/>
        </Modal.Footer>
      </Modal>
    ); 
  }
  return { ButtonLogOut, ModalLogOut }
}
export default LogOutModal;