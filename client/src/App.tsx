import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import ToastMessage from './components/ToastMessage';
const App = () => {
  return (
    <>
      <ToastMessage/>
      <RouterProvider router={router}/>
    </>
  );
}
export default App;