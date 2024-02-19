import { NavLink } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
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
const SideBar = ({ user }: any) => {
    return (
        <aside className={SideBarCSS.sidebar_container}>
            <main className={SideBarCSS.main_wrapper}>
                <div className={SideBarCSS.head}>
                    <Logo/>
                    <NavLink to = '/'><span>Moja</span><p>Tema</p></NavLink>
                    <div className={SideBarCSS.line}></div>
                </div>
                <div className={SideBarCSS.navs}>
                    {
                        user ?
                        <>
                            <CustomNavLink title='Početna' to='/' icon={home_icon} type='normal'/>
                            <CustomNavLink title='Teme' to='/topics' icon={theme_icon} type='normal'/>
                            <Chats/>
                            <Notifications/>
                        </> :
                        <>
                            <CustomNavLink title='Početna' to='home_section' icon={home_icon} type='scroll'/>
                            <CustomNavLink title='Teme' to='theme_section' icon={theme_icon} type='scroll'/>
                        </>
                    }
                </div>
                {
                    user ?
                    <div className={SideBarCSS.profile_container}>
                        <div className={SideBarCSS.status_wrapper}>
                            <ReactSVG src={success_icon} className={SideBarCSS.nav_icons_fill}/>
                            <span>{user.role_status}</span>
                        </div>
                        <div className={SideBarCSS.line}></div>
                        <div className={SideBarCSS.profile_wrapper}>
                            <ReactSVG src={profile_icon} className={SideBarCSS.nav_icons_stroke}/>
                            <p>{user.first_name} {user.last_name}</p>
                            <LogOutModal/>
                        </div>
                    </div>
                    :
                    <div className={SideBarCSS.login}>
                        <NavLink to = '/login'>Prijavi se</NavLink>
                    </div>
                }
            </main>
        </aside>
    );
}
export default SideBar;