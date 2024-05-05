import { useUserContext } from '../context/UserContext';
import ProfileCSS from './ProfilePage.module.css';
const ProfilePage = () => {
  const user = useUserContext();
  return (
    <>
      <h1 className={ProfileCSS.heading}>Мој Профил - ({user.first_name} {user.last_name})</h1>
    </>
  );
}
export default ProfilePage;