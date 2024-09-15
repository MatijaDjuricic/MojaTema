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
        if (user.roleStatus == 'ученик') return children;
        return (
            <PageLayout>
                <ReportedTopicsPage/>
            </PageLayout>
        );
    }
    const CreateTopicRedirect = ({ children }: { children: JSX.Element }): JSX.Element => {
        if (user.roleStatus == 'професор') return children;
        return <NotFoundPage/>;
    }
    const ChatRedirect = ({ children }: { children: JSX.Element }): JSX.Element => {
        const { receiver } = useParams();
        // redirect checks
        if (receiver && user.id != parseInt(receiver) && !isNaN(parseInt(receiver))) return children;
        return <NotFoundPage/>;
    }
    return { RequireAuth, AuthRedirect, TopicsRedirect, CreateTopicRedirect, ChatRedirect };
}