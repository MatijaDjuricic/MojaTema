import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import CustomNavLinkCSS from './CustomNavLink.module.css';
type CustomNavLinkProps = {
  title: string,
  to: string,
  icon: any
}
const CustomNavLink = ({ title, to, icon }: CustomNavLinkProps) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <>
      <NavLink to={to} className={CustomNavLinkCSS.link_wrapper}>
          <div className={`${CustomNavLinkCSS.nav_item} ${isActive ? CustomNavLinkCSS.active : CustomNavLinkCSS.not_active}`} title={title}>
              <ReactSVG src={icon} className={CustomNavLinkCSS.nav_icons}/>
              <p>{title}</p>
          </div>
      </NavLink>
    </>
  );
}
export default CustomNavLink;