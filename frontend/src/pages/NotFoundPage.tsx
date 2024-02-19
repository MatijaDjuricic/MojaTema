import NotFoundCSS from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
  return (
    <div className={NotFoundCSS.main_wrapper}>
        <main className={NotFoundCSS.content_container}>
            <h1>Page Not Found</h1>
            <p><Link to = '/'>Back to main page</Link></p>
        </main>
    </div>
  );
}
export default NotFoundPage;