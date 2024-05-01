import { useUserContext } from '../context/UserContext';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import ProfileCSS from './ProfilePage.module.css';
const ProfilePage = () => {
  const user = useUserContext();
  return (
    <>
      <NavBar/>
      <SideBar/>
      <main id='mainWrapper' className={ProfileCSS.main_wrapper}>
        <h1>Мој Профил - ({user.first_name} {user.last_name})</h1>
      </main>
    </>
  );
}
export default ProfilePage;