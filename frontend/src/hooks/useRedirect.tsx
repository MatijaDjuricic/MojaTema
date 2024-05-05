import { Navigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import PageLayout from "../components/PageLayout";
import ReportedTopicsPage from "../pages/ReportedTopicsPage";
import NotFoundPage from "../pages/NotFoundPage";
export const useRedirect = () => {
    const user = useUserContext();
    const RequireAuth = ({ children }: { children: JSX.Element }): JSX.Element => {
        if (user != undefined) return children;
        return <Navigate to = '/login'/>;
    }
    const AuthRedirect = ({ children }: { children: JSX.Element }): JSX.Element => {
        if (user == undefined) return children;
        return <Navigate to = '/'/>;
    }
    const TopicsRedirect = ({ children }: { children: JSX.Element }): JSX.Element => {
        if (user.role_status == "ucenik") return children;
        return (
            <PageLayout>
                <ReportedTopicsPage/>
            </PageLayout>
        );
    }
    const ChatRedirect = ({ children }: { children: JSX.Element }): JSX.Element => {
        const { room } = useParams();
        if (room && room.includes('-') && room.split('-')[0] == `${user.first_name}${user.last_name}`) return children;
        return <NotFoundPage/>;
    }
    return { RequireAuth, AuthRedirect, TopicsRedirect, ChatRedirect };
}