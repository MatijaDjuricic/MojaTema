import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ReactSVG } from "react-svg";
import { AppDispatch } from "../store/store";
import { userLogin } from "../store/usersSlice";
import { useToastMessage } from "../hooks/useToastMessage";
import CTA from "../components/CTA";
import Logo from "../components/Logo";
import eye from "../assets/eye.svg";
import eyeSlash from "../assets/eye_slash.svg";
import styles from "./LoginPage.module.css";
const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { errorMessage } = useToastMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    if (email && password) {
      setLoading(true);
      await dispatch(userLogin({ email: email, password: password })).finally(() => setLoading(false));
    } else errorMessage("Поља форме су празна");
  };
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
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
            {
              passwordVisible ? <ReactSVG src={eyeSlash} className={styles.eye_icon}/> : <ReactSVG src={eye} className={styles.eye_icon}/>
            }
            </button>
          </div>
          <CTA title="Пријави се" loading={loading} size="lg" onClick={handleSubmit}/>
        </form>
      </div>
    </main>
  );
};
export default LoginPage;