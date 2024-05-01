import { useState, useEffect, useRef } from 'react';
import { ReactSVG } from 'react-svg';
import { TopicsState } from '../types/types';
import search_icon from '../assets/search.svg';
import close_icon from '../assets/close.svg';
import TopicsHeaderCSS from './TopicsHeader.module.css';
type TopicsHeaderProps = {
  topics: TopicsState,
  search: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onClear: () => void
}
const TopicsHeader = ({topics, search, onChange, onClear}: TopicsHeaderProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [spanColor, setSpanColor] = useState<string>('');
  useEffect(() => {
    switch (topics.reported_topics.current_number) {
      case 0: setSpanColor('green');
        break;
      case 1: setSpanColor('yellow');
        break;
      case 2: setSpanColor('orange');
        break;
      case 3: setSpanColor('red');
        break;
    }
  }, [topics.reported_topics.current_number]);
  return (
    <header className={TopicsHeaderCSS.topic_header}>
      <div className={TopicsHeaderCSS.left_side}>
        <h1>Теме</h1>
          <div className={TopicsHeaderCSS.input_wrapper} onClick={() => searchInputRef.current?.focus()}>
            <ReactSVG className={TopicsHeaderCSS.search_icon} src={search_icon}/>
            <input className={TopicsHeaderCSS.input} value={search} onChange={e => onChange(e)} ref={searchInputRef} placeholder='Претражи тему, предмет или професора...'/>
            { search && <button className={TopicsHeaderCSS.close_btn} onClick={onClear}><ReactSVG className={TopicsHeaderCSS.close_icon} src={close_icon}/></button> }
          </div>
        </div>
        <div className={TopicsHeaderCSS.right_side}>
          <p>Број пријављених тема: <span style={{color: `var(--${spanColor})`}}>{topics.reported_topics.current_number}/{topics.reported_topics.limit}</span></p>
        </div>
    </header>
  );
}
export default TopicsHeader;