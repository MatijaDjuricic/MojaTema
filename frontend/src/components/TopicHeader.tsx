import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import arrow_icon from '../assets/arrow.svg';
import filter_icon from '../assets/filter.svg';
import TopicHeaderCSS from './TopicHeader.module.css';
import { useDropdown } from '../hooks/useDropDown';
type topicHeaderProps = {
  reported_topics: {
    current_number: number;
    limit: number
  }
}
const TopicHeader = ({reported_topics}: topicHeaderProps) => {
  const [spanColor, setSpanColor] = useState<string>('');
  const { dropdownRef, isOpen, toggleDropdown } = useDropdown();
  useEffect(() => {
    switch (reported_topics.current_number) {
      case 0: setSpanColor('green');
        break;
      case 1: setSpanColor('yellow');
        break;
      case 2: setSpanColor('orange');
        break;
      case 3: setSpanColor('red');
        break;
    }
  }, [reported_topics.current_number])
  return (
    <header className={TopicHeaderCSS.header_container}>
      <div ref={dropdownRef} className={TopicHeaderCSS.left_side}>
        <h1>Teme</h1>
        <div className={TopicHeaderCSS.filter_wrapper}>
          <button onClick={() => toggleDropdown()}>
            <ReactSVG src={filter_icon} className={TopicHeaderCSS.filter_icon}/>
            Filteri
            <ReactSVG src={arrow_icon} className={`${TopicHeaderCSS.arrow_icon} ${isOpen && TopicHeaderCSS.rotate}`}/>
          </button>
        </div>
        {
          isOpen &&
          <div className={TopicHeaderCSS.dropdown}>
            <div className={TopicHeaderCSS.subjects_wrapper}>
              <p>Predmeti</p>
              <ul>
                <li>Matematika</li>
                <li>Srpski</li>
              </ul>
            </div>
            <div className={TopicHeaderCSS.professors_wrapper}>
              <p>Profesori</p>
              <ul>
                <li>Vektori</li>
                <li>Povrsina</li>
                <li>Delo</li>
                <li>Pisac</li>
              </ul>
            </div>
          </div>
        }
      </div>
      <div className={TopicHeaderCSS.right_side}>
        <p>Broj prijavljenih tema: <span style={{color: `var(--${spanColor})`}}>{reported_topics.current_number}/{reported_topics.limit}</span></p>
      </div>
    </header>
  );
}
export default TopicHeader;