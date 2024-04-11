import SideBar from "../components/SideBar";
import ReportedTopicsCSS from './ReportedTopicsPage.module.css';
const ReportedTopicsPage = () => {
  return (
    <div className={ReportedTopicsCSS.main_container}>
      <SideBar/>
      <main className={ReportedTopicsCSS.main_wrapper}>
        <h1>Mentor - Reported Topics Page</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit</p>
      </main>
    </div>
  )
}
export default ReportedTopicsPage;