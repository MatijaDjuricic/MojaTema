import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useRedirect } from './hooks/useRedirect';
import ToastMessage from './components/ToastMessage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TopicsPage from './pages/TopicsPage';
import NotFoundPage from './pages/NotFoundPage';
const App = () => {
  const { RequireAuth, AuthRedirect, TopicsRedirect } = useRedirect();
  const router = createBrowserRouter([
    {
      path: '/',
      element:
        <RequireAuth>
          <MainPage/>
        </RequireAuth>,
      errorElement: <NotFoundPage/>
    },
    {
      path: '/login',
      element:
        <AuthRedirect>
          <LoginPage/>
        </AuthRedirect>
    },
    {
      path: '/topics',
      element:
        <RequireAuth>
          <TopicsRedirect>
            <TopicsPage/>
          </TopicsRedirect>
        </RequireAuth>
    }
  ]);
  return (
    <>
      <ToastMessage/>
      <RouterProvider router = {router}/>
    </>
  );
}
export default App;