import { ReactSVG } from 'react-svg';
import { useDropdown } from '../hooks/useDropDown';
import arrow_down_icon from '../assets/arrow.svg';
import styles from './DropDown.module.css';
type DropDownProps = {
  title: string,
  children: JSX.Element
}
const DropDown = ({title, children }: DropDownProps) => {
  const { dropdownRef, isOpen, toggleDropdown } = useDropdown();
  return (
    <div ref={dropdownRef}>
      <button onClick={() => toggleDropdown()} className={styles.button_wrapper}>
        <p>{title}</p>
        <ReactSVG src={arrow_down_icon} className={`${styles.arrow_icon} ${isOpen && styles.rotate}`}/>
      </button>
      { isOpen && children }
    </div>
  );
}
export default DropDown;