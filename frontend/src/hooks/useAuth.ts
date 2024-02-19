import { useCookie } from "./useCookie";
import { jwtDecode } from "jwt-decode";
import { TokenData, User } from "../types/types";
import { useSelector } from "react-redux";
import { RootState } from '../store/store';
export const useAuth = () => {
    const { getCookie, removeCookie } = useCookie();
    const getAuth = (): TokenData | boolean => {
        const access_token = getCookie('access_token');
        if (access_token) {
            try {
                const decodedToken = jwtDecode<TokenData>(access_token)
                if (decodedToken.exp * 1000 > Date.now()) {
                    return decodedToken;
                }
                removeCookie('access_token');
                return false;
            } catch (err: any) {
                throw new Error(err)
            }
        }
        return false;
    }
    const getUserAuth = (): boolean | User | TokenData => {
        const user = useSelector((state: RootState) => state.users.loggedIn)
        return user ? user : false;
    }
    return { getAuth, getUserAuth }
}