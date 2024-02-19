import LoaderCSS from './Loader.module.css';
const Loader = (props: any) => {
  return (
    <>
      {
        props.type == 'btn' ?
          <div className={`${LoaderCSS.loader} ${LoaderCSS.btn_loader}`}></div>
        : 
        <div className={LoaderCSS.loader_wrapper}>
          <div className={`${LoaderCSS.loader} ${LoaderCSS.normal_loader}`}></div>
        </div>
      }
    </>
  );
}
export default Loader;