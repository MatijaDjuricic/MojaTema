import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useUserContext } from '../context/UserContext';
import { logOut } from '../redux/slices/usersSlice';
import { resetAllStates } from "../redux/slices/rootSlice";
import { ReactSVG } from 'react-svg';
import { ModalHandle } from '../types/types';
import { roleEnum } from '../utils/constants';
import NavItem from './NavItem';
import Notifications from './Notifications';
import Chats from './Chats';
import CTA from './CTA';
import Modal from './Modal';
import home_icon from '../assets/home.svg';
import theme_icon from '../assets/theme.svg';
import profile_icon from '../assets/profile.svg';
import add_icon from '../assets/add.svg';
import logout_icon from '../assets/logout.svg';
import styles from './SideBar.module.css';
const SideBar = () => {
    const user = useUserContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modal = useRef<ModalHandle>(null);
    const closeSideBar = () => document.body.classList.remove('toggle_sidebar');
    const logOutSubmit = () => {
        dispatch(resetAllStates());
        dispatch(logOut());
        navigate("/");
    };
    return (
        <aside id='sideBar' className={styles.sidebar_container}>
            <main className={styles.main_wrapper}>
                <div className={styles.nav_items}>
                    <NavItem title='Почетна' to='/' icon={home_icon} onClick={closeSideBar}/>
                    <NavItem title='Теме' to='/topics' icon={theme_icon} onClick={closeSideBar}/>
                    {
                        user.roleStatus == roleEnum.PROFESOR.id &&
                        <NavItem title='Додај Тему' to='/create-topic' icon={add_icon} onClick={closeSideBar}/>
                    }
                    <NavItem title='Мој Профил' to='/profile' icon={profile_icon} onClick={closeSideBar}/>
                </div>
                <div className={styles.nav_buttons}>
                    <Chats/>
                    <Notifications/>
                    <button
                        onClick={() => modal.current?.open()}
                        className={styles.logout_btn}
                        title="Одјави се"
                    >
                        <ReactSVG src={logout_icon} className={styles.logout_icon} />
                        Одјави се
                    </button>
                    <Modal
                        ref={modal}
                        title="Одјава"
                        body="Да ли сте сигурни да желите да се одјавите?"
                        CTA={
                        <CTA title="Одјави се" color="red" size="sm" onClick={logOutSubmit} />
                        }
                    />
                </div>
            </main>
        </aside>
    );
}
export default SideBar;