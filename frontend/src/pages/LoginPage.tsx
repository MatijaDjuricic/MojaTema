import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { userLogin } from '../store/usersSlice';
import { useToastMessage } from '../hooks/useToastMessage';
import LoginCSS from './LoginPage.module.css';
import CTA from '../components/CTA';
import Logo from '../components/Logo';
const LoginPage = () => {
  const { errorMessage } = useToastMessage();
  const [password, setPassword] = useState<string>();
  const [, setEmail] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (password) {
      setLoading(true);
      await dispatch(userLogin(password.trim())).finally(() => setLoading(false));
    }
    else errorMessage('Поље за лозинку је празно');
  }
  return (
    <main className={LoginCSS.main_wrapper}>
      <div className={LoginCSS.form_container}>
        <Logo/>
        <form className={LoginCSS.login_form}>
          <h1>Пријави се</h1>
          <label>ИМЕЈЛ АДРЕСА:</label>
          <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="text" placeholder='Унеси имејл адресу...'/>
          <label>ЛОЗИКА:</label>
          <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="text" placeholder='Унеси лозинку...'/>
          <CTA title='Пријави се' type='loading_btn' loading={loading} size='lg' onClick={handleSubmit}/>
        </form>
      </div>
    </main>
  );
}
export default LoginPage;