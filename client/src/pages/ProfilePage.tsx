import { useAuthContext } from '../context/AuthContext';
import { getCyrillicName } from '../utils/helpers';
import { roleEnum } from '../utils/constants';
import Header from '../components/Header';
import styles from './ProfilePage.module.css';
const ProfilePage = () => {
  const { currentUser } = useAuthContext();
  return (
    <>
      <Header>
        <h1 className={styles.heading}>Мој Профил</h1>
      </Header>
      <h3>{getCyrillicName(roleEnum, currentUser.roleStatus)}, {currentUser.firstName} {currentUser.lastName}, {currentUser.email}</h3>
    </>
  );
}
export default ProfilePage;