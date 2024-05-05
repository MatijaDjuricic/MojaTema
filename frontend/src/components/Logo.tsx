import { NavLink } from 'react-router-dom';
import logo_icon from '/logo.png';
import LogoCSS from '../components/Logo.module.css';
const Logo = () => {
  return (
    <div className={LogoCSS.logo_wrapper}>
      <img src={logo_icon} alt="" />
      <NavLink to = '/'><p>МојаТема</p></NavLink>
    </div>
  );
}
export default Logo;