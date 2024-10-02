import { Navigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { roleEnum } from "../utils/constants";
import ReportedTopicsPage from "../pages/ReportedTopicsPage";
import PageLayout from "../components/PageLayout";
import NotFoundPage from "../pages/NotFoundPage";
export const RequireAuth = ({ children }: { children: JSX.Element }): JSX.Element => {
    const user = useUserContext();
    if (user != undefined) return children;
    return <Navigate to = '/login'/>;
}
export const AuthRedirect = ({ children }: { children: JSX.Element }): JSX.Element => {
    const user = useUserContext();
    if (user == undefined) return children;
    return <Navigate to = '/'/>;
}
export const TopicsRedirect = ({ children }: { children: JSX.Element }): JSX.Element => {
    const user = useUserContext();
    if (user.roleStatus == roleEnum.UCENIK.id) return children;
    return (
        <PageLayout>
            <ReportedTopicsPage/>
        </PageLayout>
    );
}
export const CreateTopicRedirect = ({ children }: { children: JSX.Element }): JSX.Element => {
    const user = useUserContext();
    if (user.roleStatus == roleEnum.PROFESOR.id) return children;
    return <NotFoundPage/>;
}
export const ChatRedirect = ({ children }: { children: JSX.Element }): JSX.Element => {
    const user = useUserContext();
    const { receiver } = useParams();
    // redirect checks
    if (receiver && user.id != parseInt(receiver) && !isNaN(parseInt(receiver))) return children;
    return <NotFoundPage/>;
}