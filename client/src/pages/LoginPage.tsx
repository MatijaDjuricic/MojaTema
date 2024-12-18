import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuthService } from "../services/api/useAuthService";
import { useAuthContext } from "../context/AuthContext";
import { useToastMessage } from "../hooks/useToastMessage";
import { ReactSVG } from "react-svg";
import CTA from "../components/CTA";
import Logo from "../components/Logo";
import eyeSlash from "../assets/eye_slash.svg";
import eye from "../assets/eye.svg";
import styles from "./LoginPage.module.css";
const LoginPage = () => {
  const { accessToken, setAuth } = useAuthContext();
  const { userLoginAsync, userVerifyTokenAsync } = useAuthService();
  const { successMessage, errorMessage } = useToastMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const from = location.state?.from || "/";
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    if (email && password) {
      setLoading(true);
      const response = await userLoginAsync({ email, password }).finally(() =>
        setLoading(false)
      );
      if (response) {
        setAuth({ user: response.user, accessToken: response.accessToken });
        navigate(from, { replace: true });
        successMessage("Успешна пријава");
      } else {
        errorMessage("Имејл или лозинка су погрешни");
      }
    } else {
      errorMessage("Поља форме су празна");
    }
  };
  useEffect(() => {
    const verifyAuthToken = async () => {
      const auth = await userVerifyTokenAsync();
      if (auth) {
        setAuth(auth);
      }
    };
    if (!accessToken) verifyAuthToken();
  }, []);
  if (accessToken) return <Navigate to={from} replace />;
  return (
    <main className={styles.main_wrapper}>
      <div className={styles.form_container}>
        <Logo />
        <form className={styles.login_form}>
          <h1>Пријави се</h1>
          <label>ИМЕЈЛ АДРЕСА:</label>
          <input ref={emailRef} type="text" placeholder="Унеси имејл адресу..."/>
          <label>ЛОЗИКА:</label>
          <div className={styles.password_wrapper}>
            <input ref={passwordRef} type={passwordVisible ? "text" : "password"} placeholder="Унеси лозинку..."/>
            <button type="button" className={styles.eye_button} onClick={togglePasswordVisibility} aria-label={passwordVisible ? "Hide password" : "Show password"}>
            { passwordVisible ? <ReactSVG src={eye} className={styles.eye_icon}/> : <ReactSVG src={eyeSlash} className={styles.eye_icon}/> }
            </button>
          </div>
          <div className={styles.submit_wrapper}>
            <CTA title="Пријави се" loading={loading} disabled={loading} size="lg" onClick={handleSubmit}/>
          </div>
        </form>
      </div>
    </main>
  );
};
export default LoginPage;