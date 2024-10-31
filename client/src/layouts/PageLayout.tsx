import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import styles from './PageLayout.module.css';
const PageLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <NavBar/>
      <SideBar/>
      <main id='mainWrapper' className={styles.main_wrapper}>
        { children }
      </main>
    </>
  );
}
export default PageLayout;