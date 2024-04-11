import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import LandingPage from "../pages/LandingPage";
import ReportedTopicsPage from "../pages/ReportedTopicsPage";
export const useRedirect = () => {
    const user = useUserContext();
    const RequireAuth = ({ children }: { children: JSX.Element }): JSX.Element => {
        if (user != undefined) return children;
        return <LandingPage/>;
    }
    const AuthRedirect = ({ children }: { children: JSX.Element }): JSX.Element => {
        if (user == undefined) return children;
        return <Navigate to = '/'/>;
    }
    const TopicsRedirect = ({ children }: { children: JSX.Element }): JSX.Element => {
        if (user.role_status == "ucenik") return children;
        return <ReportedTopicsPage/>;
    }
    return { RequireAuth, AuthRedirect, TopicsRedirect };
};