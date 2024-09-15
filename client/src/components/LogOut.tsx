import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { logOut } from '../store/usersSlice';
import CTA from './CTA';
import logout_icon from '../assets/logout.svg';
import close_icon from '../assets/close.svg';
import styles from './LogOut.module.css';
const LogOutModal = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutSubmit = () => {
    dispatch(logOut());
    navigate('/');
    scrollTo(0, 0);
  };
  const ButtonLogOut = () => (
    <button onClick={() => setShow(true)} className={styles.logout_btn} title='Одјави се'>
      <ReactSVG src={logout_icon} className={styles.logout_icon} />
      <p>Одјави се</p>
    </button>
  );
  const ModalLogOut = () => (
    show && (
      <div className={styles.modal_overlay} onClick={() => setShow(false)}>
        <div className={styles.modal_content} onClick={e => e.stopPropagation()}>
          <div className={styles.modal_header}>
            <h2 className={styles.modal_title}>Одјава</h2>
            <button className={styles.close_btn} onClick={() => setShow(false)}>
              <ReactSVG className={styles.close_icon} src={close_icon} />
            </button>
          </div>
          <div className={styles.modal_body}>
            <p>Да ли сте сигурни да желите да се одјавите?</p>
          </div>
          <div className={styles.modal_footer}>
            <CTA title='Одјави се' color='red' size='sm' onClick={logOutSubmit} />
          </div>
        </div>
      </div>
    )
  );
  return { ButtonLogOut, ModalLogOut };
};
export default LogOutModal;