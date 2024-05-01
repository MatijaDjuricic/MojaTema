import { Link } from 'react-router-dom';
import NotFoundCSS from './NotFoundPage.module.css';
const NotFoundPage = () => {
  return (
    <div className={NotFoundCSS.main_wrapper}>
        <main className={NotFoundCSS.content_container}>
            <h1>Страница није пронађена</h1>
            <p><Link to = '/'>Врати се на почетну страницу</Link></p>
        </main>
    </div>
  );
}
export default NotFoundPage;