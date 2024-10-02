import { useUserContext } from '../context/UserContext';
import { getCyrillicName } from '../utils/utils';
import { roleEnum } from '../utils/constants';
import Header from '../components/Header';
import styles from './ProfilePage.module.css';
const ProfilePage = () => {
  const user = useUserContext();
  return (
    <>
      <Header>
        <h1 className={styles.heading}>Мој Профил</h1>
      </Header>
      <h3>{getCyrillicName(roleEnum, user.roleStatus)}, {user.firstName} {user.lastName}, {user.email}</h3>
    </>
  );
}
export default ProfilePage;