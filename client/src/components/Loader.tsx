import styles from './Loader.module.css';
type loaderProps = {
  type?: 'normal_loader' | 'btn_loader'
  size?: 'lg' | 'sm'
}
const Loader = ({type, size}: loaderProps) => {
  return (
    <>
      {
        type == 'btn_loader' ?
        <div className={`${styles.loader} ${size == 'lg' ? styles.btn_lg_loader : styles.btn_sm_loader}`}></div>
        : 
        <div className={styles.loader_wrapper}>
          <div className={`${styles.loader} ${styles.normal_loader}`}></div>
        </div>
      }
    </>
  );
}
export default Loader;