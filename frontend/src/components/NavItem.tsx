import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import NavItemCSS from './NavItem.module.css';
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
    <NavLink to={to} className={NavItemCSS.link_wrapper} onClick={onClick}>
      <div className={`${NavItemCSS.nav_item} ${isActive ? NavItemCSS.active : NavItemCSS.not_active}`} title={title}>
        <ReactSVG src={icon} className={NavItemCSS.nav_icons}/>
        <p>{title}</p>
      </div>
    </NavLink>
  );
}
export default NavItem;