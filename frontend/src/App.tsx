import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useUserContext } from './context/UserContext';
import ToastMessage from './components/ToastMessage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TopicsPage from './pages/TopicsPage';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
const App = () => {
  const user = useUserContext();
  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    if (user != undefined) return children;
    return <LandingPage/>;
  }
  const AuthRedirect = ({ children }: { children: JSX.Element }) => {
    if (user == undefined) return children;
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
      element:
        <RequireAuth>
          <TopicsPage/>
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