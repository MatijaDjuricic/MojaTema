import Header from '../components/Header';
import { useUserContext } from '../context/UserContext';
import styles from './ProfilePage.module.css';
const ProfilePage = () => {
  const user = useUserContext();
  return (
    <>
      <Header>
        <h1 className={styles.heading}>Мој Профил</h1>
      </Header>
      <h5>{user.firstName} {user.lastName}, {user.email}, {user.id}</h5>
    </>
  );
}
export default ProfilePage;