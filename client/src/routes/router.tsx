import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { roleEnum } from "../utils/constants";
import PageLayout from "../layouts/PageLayout";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import TopicsPage from "../pages/TopicsPage";
import ReportedTopicsPage from "../pages/ReportedTopicsPage";
import ProfilePage from "../pages/ProfilePage";
import ChatPage from "../pages/ChatPage";
import NotFoundPage from "../pages/NotFoundPage";
import CreateTopicPage from "../pages/CreateTopicPage";
const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <PageLayout>
          <HomePage />
        </PageLayout>
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/student/topics",
    element: (
      <ProtectedRoute allowedRoles={[roleEnum.UCENIK.id]}>
        <PageLayout>
          <TopicsPage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/professor/topics",
    element: (
      <ProtectedRoute allowedRoles={[roleEnum.PROFESOR.id]}>
        <PageLayout>
          <ReportedTopicsPage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/topics/create",
    element: (
      <ProtectedRoute allowedRoles={[roleEnum.PROFESOR.id]}>
        <PageLayout>
          <CreateTopicPage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/chat/:receiver",
    element: (
      <ProtectedRoute>
        <PageLayout>
          <ChatPage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <PageLayout>
          <ProfilePage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
export const router = createBrowserRouter(routes);