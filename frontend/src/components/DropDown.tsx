import { useDropdown } from '../hooks/useDropDown';
import { ReactSVG } from 'react-svg';
import arrow_icon from '../assets/arrow.svg';
import filter_icon from '../assets/filter.svg';
import DropDownCSS from './DropDown.module.css';
type DropDownProps = {
  title: string,
  children1: React.ReactNode,
  children2: React.ReactNode
}
const DropDown = ({title, children1, children2}: DropDownProps) => {
  const { dropdownRef, isOpen, toggleDropdown } = useDropdown();
  return (
    <div ref={dropdownRef}>
        <div className={DropDownCSS.button_wrapper}>
          <button onClick={() => toggleDropdown()}>
            <ReactSVG src={filter_icon} className={DropDownCSS.filter_icon}/>
            {title}
            <ReactSVG src={arrow_icon} className={`${DropDownCSS.arrow_icon} ${isOpen && DropDownCSS.rotate}`}/>
          </button>
        </div>
        {
          isOpen &&
          <div className={DropDownCSS.dropdown}>
            <div className={DropDownCSS.subjects_wrapper}>
              {children1}
            </div>
            <div className={DropDownCSS.professors_wrapper}>
              {children2}
            </div>
          </div>
        }
      </div>
  );
}
export default DropDown;
/* how to use DropDown Component
<DropDown title='Filteri' children1={
    <>
        <p>Predmeti</p>
        <ul>
            <li>Matematika</li>
            <li>Srpski</li>
        </ul>
    </>
} children2={
    <>
        <p>Profesori</p>
        <ul>
            <li>Vektori</li>
            <li>Povrsina</li>
            <li>Delo</li>
            <li>Pisac</li>
        </ul>
    </>
}/>
*/