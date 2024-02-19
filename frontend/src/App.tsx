import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import ToastMessage from './components/ToastMessage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TopicsPage from './pages/TopicsPage';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
const App = () => {
  const { getUserAuth } = useAuth();
  const auth = getUserAuth();
  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    if (auth) return children;
    return <LandingPage/>;
  }
  const AuthRedirect = ({ children }: { children: JSX.Element }) => {
    if (!auth) return children;
    return <Navigate to = '/'/>;
  }
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
      element: <TopicsPage/>
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