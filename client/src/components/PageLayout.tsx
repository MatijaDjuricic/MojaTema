import NavBar from './NavBar';
import SideBar from './SideBar';
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