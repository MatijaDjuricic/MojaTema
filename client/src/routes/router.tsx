import { createBrowserRouter } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import TopicsPage from '../pages/TopicsPage';
import ProfilePage from '../pages/ProfilePage';
import ChatPage from '../pages/ChatPage';
import NotFoundPage from '../pages/NotFoundPage';
import CreateTopicPage from '../pages/CreateTopicPage';
import { AuthRedirect, ChatRedirect, CreateTopicRedirect, RequireAuth, TopicsRedirect } from './redirects';
const routes = [
    {
        path: "/",
        element: (
            <RequireAuth>
                <PageLayout>
                    <HomePage />
                </PageLayout>
            </RequireAuth>
        ),
        errorElement: <NotFoundPage />,
    },
    {
        path: "/login",
        element: (
            <AuthRedirect>
                <LoginPage />
            </AuthRedirect>
        ),
    },
    {
        path: "/topics",
        element: (
            <RequireAuth>
                <TopicsRedirect>
                    <PageLayout>
                        <TopicsPage />
                    </PageLayout>
                </TopicsRedirect>
            </RequireAuth>
        ),
    },
    {
        path: "/profile",
        element: (
            <RequireAuth>
                <PageLayout>
                    <ProfilePage />
                </PageLayout>
            </RequireAuth>
        ),
    },
    {
        path: "/create-topic",
        element: (
            <RequireAuth>
                <CreateTopicRedirect>
                    <PageLayout>
                        <CreateTopicPage />
                    </PageLayout>
                </CreateTopicRedirect>
            </RequireAuth>
        ),
    },
    {
        path: "/chat/:receiver",
        element: (
            <RequireAuth>
                <ChatRedirect>
                    <PageLayout>
                        <ChatPage />
                    </PageLayout>
                </ChatRedirect>
            </RequireAuth>
        ),
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
];
export const router = createBrowserRouter(routes);