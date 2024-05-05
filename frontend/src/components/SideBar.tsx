import NavItem from './NavItem';
import Notifications from './Notifications';
import Chats from './Chats';
import LogOutModal from './LogOut';
import home_icon from '../assets/home.svg';
import theme_icon from '../assets/theme.svg';
import profile_icon from '../assets/profile.svg';
import SideBarCSS from './SideBar.module.css';
const SideBar = () => {
    const { ButtonLogOut, ModalLogOut } = LogOutModal();
    const closeSideBar = () => document.body.classList.remove('toggle_sidebar');
    return (
        <aside id='sideBar' className={SideBarCSS.sidebar_container}>
            <main className={SideBarCSS.main_wrapper}>
                <div className={SideBarCSS.nav_items}>
                    <NavItem title='Почетна' to='/' icon={home_icon} onClick={closeSideBar}/>
                    <NavItem title='Теме' to='/topics' icon={theme_icon} onClick={closeSideBar}/>
                    <NavItem title='Мој Профил' to='/profile' icon={profile_icon} onClick={closeSideBar}/>
                </div>
                <div className={SideBarCSS.nav_buttons}>
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