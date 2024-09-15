import { useUserContext } from '../context/UserContext';
import NavItem from './NavItem';
import Notifications from './Notifications';
import Chats from './Chats';
import LogOutModal from './LogOut';
import home_icon from '../assets/home.svg';
import theme_icon from '../assets/theme.svg';
import profile_icon from '../assets/profile.svg';
import add_icon from '../assets/add.svg';
import styles from './SideBar.module.css';
const SideBar = () => {
    const user = useUserContext();
    const { ButtonLogOut, ModalLogOut } = LogOutModal();
    const closeSideBar = () => document.body.classList.remove('toggle_sidebar');
    return (
        <aside id='sideBar' className={styles.sidebar_container}>
            <main className={styles.main_wrapper}>
                <div className={styles.nav_items}>
                    <NavItem title='Почетна' to='/' icon={home_icon} onClick={closeSideBar}/>
                    <NavItem title='Теме' to='/topics' icon={theme_icon} onClick={closeSideBar}/>
                    {
                        user.roleStatus == 'професор' &&
                        <NavItem title='Додај Тему' to='/create-topic' icon={add_icon} onClick={closeSideBar}/>
                    }
                    <NavItem title='Мој Профил' to='/profile' icon={profile_icon} onClick={closeSideBar}/>
                </div>
                <div className={styles.nav_buttons}>
                    <Chats/>
                    <Notifications/>
                    <ButtonLogOut/>
                    <ModalLogOut/>
                </div>
            </main>
        </aside>
    );
}
export default SideBar;