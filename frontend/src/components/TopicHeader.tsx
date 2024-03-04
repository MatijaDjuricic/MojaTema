import { useEffect, useState } from 'react';
import TopicHeaderCSS from './TopicHeader.module.css';
type topicHeaderProps = {
  reported_topics: {
    current_number: number;
    limit: number
  }
}
const TopicHeader = ({reported_topics}: topicHeaderProps) => {
  const [spanColor, setSpanColor] = useState<string>('');
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
      <div className={TopicHeaderCSS.left_side}>
        <h1>Teme</h1>
        <p>Predmeti</p>
        <p>Profesori</p>
      </div>
      <div className={TopicHeaderCSS.right_side}>
        <p>Broj prijavljenih tema: <span style={{color: `var(--${spanColor})`}}>{reported_topics.current_number}/{reported_topics.limit}</span></p>
      </div>
    </header>
  );
}
export default TopicHeader;