import CustomNavLink from './CustomNavLink';
import home_icon from '../assets/home.svg';
import theme_icon from '../assets/theme.svg';
import profile_icon from '../assets/profile.svg';
import SideBarCSS from './SideBar.module.css';
const SideBar = () => {
    return (
        <aside id='sideBar' className={SideBarCSS.sidebar_container}>
            <main className={SideBarCSS.main_wrapper}>
                <CustomNavLink title='Почетна' to='/' icon={home_icon}/>
                <CustomNavLink title='Теме' to='/topics' icon={theme_icon}/>
                <CustomNavLink title='Мој Профил' to='/profile' icon={profile_icon}/>
            </main>
        </aside>
    )
}
export default SideBar;