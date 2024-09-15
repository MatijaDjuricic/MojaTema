import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useRedirect } from './hooks/useRedirect';
import ToastMessage from './components/ToastMessage';
import PageLayout from './components/PageLayout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TopicsPage from './pages/TopicsPage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import NotFoundPage from './pages/NotFoundPage';
import CreateTopicPage from './pages/CreateTopicPage';
const App = () => {
  const { RequireAuth, AuthRedirect, TopicsRedirect, CreateTopicRedirect, ChatRedirect } = useRedirect();
  const router = createBrowserRouter([
    {
      path: '/',
      element:
        <RequireAuth>
          <PageLayout>
            <HomePage/>
          </PageLayout>
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
            <PageLayout>
              <TopicsPage/>
            </PageLayout>
          </TopicsRedirect>
        </RequireAuth>
    },
    {
      path: '/profile',
      element:
        <RequireAuth>
          <PageLayout>
            <ProfilePage/>
          </PageLayout>
        </RequireAuth>
    },
    {
      path: '/create-topic',
      element:
        <RequireAuth>
          <CreateTopicRedirect>
            <PageLayout>
              <CreateTopicPage/>
            </PageLayout>
          </CreateTopicRedirect>
        </RequireAuth>
    },
    {
      path: '/chat/:receiver',
      element:
        <RequireAuth>
          <ChatRedirect>
            <PageLayout>
              <ChatPage/>
            </PageLayout>
          </ChatRedirect>
        </RequireAuth>
    }
  ]);
  return (
    <>
      <ToastMessage/>
      <RouterProvider router={router}/>
    </>
  );
}
export default App;