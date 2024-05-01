import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import HomeCSS from './HomePage.module.css';
const HomePage = () => {
  return (
    <>
      <NavBar/>
      <SideBar/>
      <main id='mainWrapper' className={HomeCSS.main_wrapper}>
        <h1>Почетна</h1>
      </main>
    </>
  );
}
export default HomePage;