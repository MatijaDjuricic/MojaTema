import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-scroll';
import CustomNavLinkCSS from './CustomNavLink.module.css';
type CustomNavLinkProps = {
  title: string,
  type: "normal" | "scroll",
  to: string,
  icon: any
}
const CustomNavLink = ({ title, type, to, icon }: CustomNavLinkProps) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <>
      {
        type == "normal" ?
        <NavLink to={to} className={CustomNavLinkCSS.link_wrapper}>
            <div className={`${CustomNavLinkCSS.nav_item} ${isActive ? CustomNavLinkCSS.active : CustomNavLinkCSS.not_active}`}>
                <ReactSVG src={icon} className={CustomNavLinkCSS.nav_icons}/>
                <p>{title}</p>
            </div>
        </NavLink> :
        <Link className={CustomNavLinkCSS.scroll_wrapper} activeClass={CustomNavLinkCSS.active} to={to} spy={true} smooth={true} duration={100}>
          <div className={CustomNavLinkCSS.nav_item}>
              <ReactSVG src={icon} className={CustomNavLinkCSS.nav_icons}/>
              <p>{title}</p>
          </div>
        </Link>
      }
    </>
  );
}
export default CustomNavLink;