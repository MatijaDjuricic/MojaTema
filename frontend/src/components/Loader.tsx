import LoaderCSS from './Loader.module.css';
type loaderProps = {
  type?: 'normal_loader' | 'btn_loader'
  size?: 'lg' | 'sm'
}
const Loader = ({type, size}: loaderProps) => {
  return (
    <>
      {
        type == 'btn_loader' ?
          <div className={`${LoaderCSS.loader} ${size == 'lg' ? LoaderCSS.btn_lg_loader : LoaderCSS.btn_sm_loader}`}></div>
        : 
        <div className={LoaderCSS.loader_wrapper}>
          <div className={`${LoaderCSS.loader} ${LoaderCSS.normal_loader}`}></div>
        </div>
      }
    </>
  );
}
export default Loader;