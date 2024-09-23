import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ReactSVG } from "react-svg";
import { useUserContext } from "../context/UserContext";
import { Divide as Hamburger } from "hamburger-react";
import { ModalHandle } from "../types/types";
import { resetAllStates } from "../redux/slices/rootSlice";
import { logOut } from "../redux/slices/usersSlice";
import Notifications from "./Notifications";
import Logo from "./Logo";
import Chats from "./Chats";
import DropDown from "./DropDown";
import hamburger_icon from "../assets/hamburger.svg";
import profile_icon from "../assets/profile.svg";
import logout_icon from "../assets/logout.svg";
import styles from "./NavBar.module.css";
import Modal from "./Modal";
import CTA from "./CTA";
const NavBar = () => {
  const user = useUserContext();
  const [isOpen, setOpen] = useState(false);
  const modal = useRef<ModalHandle>(null);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const toggleSideBar = () => document.body.classList.toggle("toggle_sidebar");
  const toggleHamburger = () => {
    toggleSideBar();
    setOpen(!isOpen);
  };
  const logOutSubmit = () => {
    dispatch(resetAllStates());
    dispatch(logOut());
    navigate("/");
  };
  useEffect(() => {
    setOpen(document.body.className === "toggle_sidebar");
  }, [document.body.className]);
  return (
    <>
      <Modal
        ref={modal}
        title="Одјава"
        body="Да ли сте сигурни да желите да се одјавите?"
        CTA={
          <CTA title="Одјави се" color="red" size="sm" onClick={logOutSubmit} />
        }
      />
      <header className={styles.nav_wrapper}>
        <div className={styles.left_side}>
          <Logo />
          <button onClick={toggleSideBar}>
            <ReactSVG
              src={hamburger_icon}
              className={styles.nav_icons_fill_hamburger}
            />
          </button>
          <div className={styles.hamburger_wrapper}>
            <Hamburger
              color="var(--text-prim)"
              rounded
              toggled={isOpen}
              toggle={toggleHamburger}
            />
          </div>
        </div>
        <div className={styles.right_side}>
          <Notifications type="icon" />
          <Chats type="icon" />
          <DropDown title={`${user.firstName} ${user.lastName}`}>
            <div className={styles.dropdown}>
              <div className={styles.dropdown_header}>
                <p className={styles.username}>
                  {user.firstName} {user.lastName}
                </p>
                <p className={styles.status}>
                  {user.roleStatus === "ucenik" ? "ученик" : user.roleStatus}
                </p>
              </div>
              <NavLink
                to="/profile"
                className={styles.profile_btn}
                title="Мој профил"
              >
                <ReactSVG
                  src={profile_icon}
                  className={styles.nav_icons_fill_profile}
                />
                <p>Мој профил</p>
              </NavLink>
              <button
                onClick={() => modal.current?.open()}
                className={styles.logout_btn}
                title="Одјави се"
              >
                <ReactSVG src={logout_icon} className={styles.logout_icon} />
                Одјави се
              </button>
            </div>
          </DropDown>
        </div>
      </header>
    </>
  );
};
export default NavBar;