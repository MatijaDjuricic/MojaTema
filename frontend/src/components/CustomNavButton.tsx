import { ReactSVG } from 'react-svg';
import CustomNavButtonCSS from './CustomNavButton.module.css';
type CustomNavButtonProps = {
  title: string,
  type: 'stroke' | 'fill',
  icon: any,
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
const CustomNavButton = ({ title, icon, type, onClick }: CustomNavButtonProps) => {
  return (
    <button className={CustomNavButtonCSS.btn} onClick={onClick} title={title}>
        <div className={CustomNavButtonCSS.nav_item}>
            <ReactSVG src={icon} className={type == "stroke" ? CustomNavButtonCSS.nav_icons_stroke : CustomNavButtonCSS.nav_icons_fill}/>
            <p>{title}</p>
        </div>
    </button>
  );
}
export default CustomNavButton;