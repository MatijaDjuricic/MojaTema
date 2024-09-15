import Loader from './Loader';
import styles from './CTA.module.css';
type CTAProps = {
  title: string;
  size: 'lg' | 'sm';
  color?: 'green' | 'red';
  loading?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
const CTA = ({ title, size, color, loading = false, onClick }: CTAProps) => {
  const baseClass = styles.cta_button;
  const sizeClass = size === 'lg' ? styles.button_lg : styles.button_sm;
  const colorClass = color === 'green' ? styles.button_green : color === 'red' ? styles.button_red : '';
  const buttonClass = loading ? `${baseClass} ${colorClass} ${styles.loading_button}
  ${size === 'lg' ? styles.loading_button_lg : styles.loading_button_sm}` : `${baseClass} ${sizeClass} ${colorClass}`;
  return (
    <button className={buttonClass} onClick={onClick} disabled={loading}>
      { loading ? <Loader type='btn_loader' size={size}/> : title }
    </button>
  );
};
export default CTA;