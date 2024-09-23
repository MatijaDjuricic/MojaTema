import Loader from './Loader';
import classNames from 'classnames';
import styles from './CTA.module.css';
interface CTAProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  size: 'lg' | 'sm';
  color?: 'green' | 'red';
  loading?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const CTA = ({ title, size, color, loading = false, onClick, className, ...props }: CTAProps) => {
  const buttonClass = classNames(styles.cta_button, className, {
    [styles.button_lg]: size === 'lg',
    [styles.button_sm]: size === 'sm',
    [styles.button_green]: color === 'green',
    [styles.button_red]: color === 'red',
    [styles.loading_button]: loading,
    [styles.loading_button_lg]: loading && size === 'lg',
    [styles.loading_button_sm]: loading && size === 'sm',
  });
  return (
    <button className={buttonClass} onClick={onClick} disabled={loading} {...props}>
      {loading ? <Loader type="btn_loader" size={size} /> : title}
    </button>
  );
};
export default CTA;