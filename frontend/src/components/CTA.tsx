import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Loader from './Loader';
import CTACSS  from './CTA.module.css';
type CTAProps = {
  title: string,
  type: 'normal_btn' | 'loading_btn',
  size: 'lg' | 'sm',
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
const CTA = ({ title, type, size, onClick }: CTAProps) => {
  let loading_status = false;
  if (type == 'loading_btn') loading_status = useSelector((state: RootState) => state.users.loading_status);
  return (
    <>
      {
        type == 'normal_btn' ?
          <button className={`${CTACSS.cta_button} ${size == 'lg' ? CTACSS.button_lg : CTACSS.button_sm}`} onClick={onClick}>{title}</button>
        :
        <button className={`${CTACSS.cta_button} ${CTACSS.loading_button} ${size == 'lg' ? CTACSS.loading_button_lg : CTACSS.loading_button_sm}`} onClick={onClick} disabled={loading_status && true}>
          { loading_status ? <Loader type='btn'/> : title}
        </button>
      }
    </>
  );
}
export default CTA;