import styles from './Header.module.css';
const Header = ({ children }: { children: JSX.Element }) => {
  return (
    <header className={styles.header}>
      {children}
    </header>
  );
}
export default Header;