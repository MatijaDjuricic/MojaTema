import { NavLink } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { useUserContext } from '../context/UserContext';
import Logo from './Logo';
import Chats from './Chats';
import LogOutModal from './LogOut';
import Notifications from './Notifications';
import CustomNavLink from './CustomNavLink';
import home_icon from '../assets/home.svg';
import theme_icon from '../assets/theme.svg';
import success_icon from '../assets/success.svg';
import profile_icon from '../assets/profile.svg';
import SideBarCSS from './SideBar.module.css';
const SideBar = () => {
    const user = useUserContext();
    return (
        <aside className={SideBarCSS.sidebar_container}>
            <main className={SideBarCSS.main_wrapper}>
                <div className={SideBarCSS.head}>
                    <Logo/>
                    <NavLink to = '/'><span>Моја</span><p>Тема</p></NavLink>
                    <div className={SideBarCSS.line}></div>
                </div>
                <div className={SideBarCSS.navs}>
                    {
                        user ?
                        <>
                            <CustomNavLink title='Почетна' to='/' icon={home_icon} type='normal'/>
                            <CustomNavLink title='Теме' to='/topics' icon={theme_icon} type='normal'/>
                            <Chats/>
                            <Notifications/>
                        </> :
                        <>
                            <CustomNavLink title='Почетна' to='home_section' icon={home_icon} type='scroll'/>
                            <CustomNavLink title='Теме' to='topic_section' icon={theme_icon} type='scroll'/>
                        </>
                    }
                </div>
                {
                    user ?
                    <div className={SideBarCSS.profile_container}>
                        <div className={SideBarCSS.status_wrapper} title={`${user.role_status}`}>
                            <ReactSVG src={success_icon} className={SideBarCSS.nav_icons_fill}/>
                            <span>{user.role_status}</span>
                        </div>
                        <div className={SideBarCSS.line}></div>
                        <div className={SideBarCSS.profile_wrapper}>
                            <div className={SideBarCSS.title_wrapper} title={`${user.first_name} ${user.last_name}`}>
                                <ReactSVG src={profile_icon} className={SideBarCSS.nav_icons_stroke}/>
                                <p>{user.first_name} {user.last_name}</p>
                            </div>
                            <LogOutModal/>
                        </div>
                    </div>
                    :
                    <div className={SideBarCSS.login}>
                        <NavLink to = '/login'>Пријави се</NavLink>
                    </div>
                }
            </main>
        </aside>
    );
}
export default SideBar;