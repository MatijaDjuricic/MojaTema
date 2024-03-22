import SideBar from '../components/SideBar';
import MainCSS from './MainPage.module.css';
const MainPage = () => {
  return (
    <div className={MainCSS.main_container}>
      <SideBar/>
      <main className={MainCSS.main_wrapper}>
        <h1>Почетна</h1>
      </main>
    </div>
  );
}
export default MainPage;