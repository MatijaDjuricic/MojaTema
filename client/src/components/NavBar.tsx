import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { useUserContext } from '../context/UserContext';
import { Divide as Hamburger } from 'hamburger-react';
import Notifications from './Notifications';
import Logo from './Logo';
import Chats from './Chats';
import LogOutModal from './LogOut';
import DropDown from './DropDown';
import hamburger_icon from '../assets/hamburger.svg';
import profile_icon from '../assets/profile.svg';
import styles from './NavBar.module.css';
const NavBar = () => {
    const user = useUserContext();
    const { ButtonLogOut, ModalLogOut } = LogOutModal();
    const [isOpen, setOpen] = useState(false);
    const toggleSideBar = () => document.body.classList.toggle('toggle_sidebar');
    const toggleHamburger = () => {
        toggleSideBar();
        setOpen(!isOpen);
    }
    useEffect(() => {
        document.body.className == 'toggle_sidebar' ? setOpen(true) : setOpen(false);
    }, [document.body.className]);
    return (
        <header className={styles.nav_wrapper}>
            <div className={styles.left_side}>
                <Logo/>
                <button onClick={toggleSideBar}>
                    <ReactSVG src={hamburger_icon} className={styles.nav_icons_fill_hamburger}/>
                </button>
                <div className={styles.hamburger_wrapper}>
                    <Hamburger color='var(--text-prim)' rounded toggled={isOpen} toggle={toggleHamburger}/>
                </div>
            </div>
            <div className={styles.right_side}>
                <Notifications type='icon'/>
                <Chats type='icon'/>
                <DropDown title={`${user.firstName} ${user.lastName}`} outside={<ModalLogOut/>}>
                    <div className={styles.dropdown}>
                        <div className={styles.dropdown_header}>
                            <p className={styles.username}>{user.firstName} {user.lastName}</p>
                            <p className={styles.status}>{user.roleStatus == 'ucenik' ? 'ученик' : user.roleStatus}</p>
                        </div>
                        <NavLink to='/profile' className={styles.profile_btn} title='Мој профил'>
                            <ReactSVG src={profile_icon} className={styles.nav_icons_fill_profile}/>
                            <p>Мој профил</p>
                        </NavLink>
                        <ButtonLogOut/>
                    </div>
                </DropDown>
            </div>
        </header>
    );
}
export default NavBar;