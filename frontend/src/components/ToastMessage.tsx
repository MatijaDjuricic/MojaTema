import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ToastMessage = () => {
  return <ToastContainer theme='light' autoClose={1500} draggable/>;
}
export default ToastMessage;