import Loader from './Loader';
import CTACSS  from './CTA.module.css';
type CTAProps = {
  title: string,
  type: 'normal_btn' | 'loading_btn',
  size: 'lg' | 'sm',
  loading?: boolean,
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
const CTA = ({ title, type, size, loading, onClick }: CTAProps) => {
  return (
    <>
      {
        type == 'normal_btn' ?
          <button className={`${CTACSS.cta_button} ${size == 'lg' ? CTACSS.button_lg : CTACSS.button_sm}`} onClick={onClick}>{title}</button>
        :
        <button className={`${CTACSS.cta_button} ${CTACSS.loading_button} ${size == 'lg' ? CTACSS.loading_button_lg : CTACSS.loading_button_sm}`} onClick={onClick} disabled={loading && true}>
          { loading ? <Loader type='btn_loader' size={size}/> : title}
        </button>
      }
    </>
  );
}
export default CTA;