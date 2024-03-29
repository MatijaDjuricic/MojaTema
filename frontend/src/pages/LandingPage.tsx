import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import CTA from '../components/CTA';
import LandingCSS from './LandingPage.module.css';
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className={LandingCSS.main_container}>
      <SideBar/>
      <main className={LandingCSS.main_wrapper}>
        <section className={LandingCSS.home_section} id='home_section'>
          <div className={LandingCSS.text_wrapper}>
            <h1><span>Пријави се</span><br/>и бирај теме сада!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quo ut corporis cum! Sed animi nisi sunt?</p>
          </div>
          <CTA title='Пријави се' type='normal_btn' size='lg' onClick={() => navigate('/login')}/>
        </section>
        <section className={LandingCSS.theme_section} id='topic_section'>
          <h1 style={{color: "var(--orange)"}}>Теме</h1>
        </section>
      </main>
    </div>
  );
}
export default LandingPage;