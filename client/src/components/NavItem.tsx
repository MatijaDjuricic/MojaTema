import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import styles from './NavItem.module.css';
type NavItemProps = {
  title: string,
  to: string,
  icon: any,
  onClick?: () => void
}
const NavItem = ({ title, to, icon, onClick }: NavItemProps) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <NavLink to={to} className={styles.link_wrapper} onClick={onClick}>
      <div className={`${styles.nav_item} ${isActive ? styles.active : styles.not_active}`} title={title}>
        <ReactSVG src={icon} className={styles.nav_icons}/>
        <p>{title}</p>
      </div>
    </NavLink>
  );
}
export default NavItem;