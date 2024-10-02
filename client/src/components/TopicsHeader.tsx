import { useRef } from 'react';
import { ReactSVG } from 'react-svg';
import search_icon from '../assets/search.svg';
import close_icon from '../assets/close.svg';
import styles from './TopicsHeader.module.css';
type TopicsHeaderProps = {
  search: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onClear: () => void,
}
const TopicsHeader = ({ search, onChange, onClear }: TopicsHeaderProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  return (
    <header className={styles.topic_header}>
      <div className={styles.header_wrapper}>
        <h1>Теме</h1>
        <div className={styles.input_wrapper} onClick={() => searchInputRef.current?.focus()}>
          <ReactSVG className={styles.search_icon} src={search_icon}/>
          <input className={styles.input} value={search} onChange={e => onChange(e)} ref={searchInputRef} placeholder='Претражи тему, предмет или професора...'/>
          { search && <button className={styles.close_btn} onClick={onClear}><ReactSVG className={styles.close_icon} src={close_icon}/></button> }
        </div>
      </div>
    </header>
  );
}
export default TopicsHeader;