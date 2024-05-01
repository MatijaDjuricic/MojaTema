import logo_icon from '../assets/logo.png';
import LogoCSS from '../components/Logo.module.css';
const Logo = () => {
  return <img src={logo_icon} className={LogoCSS.logo} alt="" />
}
export default Logo;