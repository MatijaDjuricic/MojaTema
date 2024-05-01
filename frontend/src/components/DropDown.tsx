import { ReactSVG } from 'react-svg';
import { useDropdown } from '../hooks/useDropDown';
import arrow_down_icon from '../assets/arrow_down.svg';
import DropDownCSS from './DropDown.module.css';
type DropDownProps = {
  title: string,
  children: React.ReactNode,
  outside?: React.ReactNode
}
const DropDown = ({title, children, outside}: DropDownProps) => {
  const { dropdownRef, isOpen, toggleDropdown } = useDropdown();
  return (
    <>
      <div ref={dropdownRef}>
        <button onClick={() => toggleDropdown()} className={DropDownCSS.button_wrapper}>
          {title}
          <ReactSVG src={arrow_down_icon} className={`${DropDownCSS.arrow_icon} ${isOpen && DropDownCSS.rotate}`}/>
        </button>
        { isOpen && children }
      </div>
      { outside }
    </>
  );
}
export default DropDown;