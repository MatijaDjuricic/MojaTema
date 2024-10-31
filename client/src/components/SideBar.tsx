import { useRef } from 'react';
import { ReactSVG } from 'react-svg';
import { ModalHandle } from '../types/types';
import { useAuthContext } from '../context/AuthContext';
import { roleEnum } from '../utils/constants';
import useLogOut from '../services/api/useLogOut';
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
    const { currentUser } = useAuthContext();
    const logOut = useLogOut();
    const logOutSubmit = async () => await logOut();
    const modal = useRef<ModalHandle>(null);
    return (
        <aside id='sideBar' className={styles.sidebar_container}>
            <main className={styles.main_wrapper}>
                <div className={styles.nav_items}>
                    <NavItem title='Почетна' to='/' icon={home_icon}/>
                    {
                        currentUser.roleStatus == roleEnum.UCENIK.id && <>
                            <NavItem title='Теме' to='/student/topics' icon={theme_icon}/>
                        </>
                    }
                    {
                        currentUser.roleStatus == roleEnum.PROFESOR.id && <>
                            <NavItem title='Теме' to='/professor/topics' icon={theme_icon}/>
                            <NavItem title='Додај Тему' to='/topics/create' icon={add_icon}/>
                        </>
                    }
                    <NavItem title='Мој Профил' to='/profile' icon={profile_icon}/>
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