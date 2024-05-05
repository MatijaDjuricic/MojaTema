import NavBar from './NavBar';
import SideBar from './SideBar';
import PageLayoutCSS from './PageLayout.module.css';
const PageLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <NavBar/>
      <SideBar/>
      <main id='mainWrapper' className={PageLayoutCSS.main_wrapper}>
        { children }
      </main>
    </>
  );
}
export default PageLayout;