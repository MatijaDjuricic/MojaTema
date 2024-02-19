import { ReactSVG } from 'react-svg';
import logo_icon from '../assets/profile.svg';
import LogoCSS from '../components/Logo.module.css';
const Logo = () => {
  return <ReactSVG src={logo_icon} className={LogoCSS.logo}/>
}
export default Logo;