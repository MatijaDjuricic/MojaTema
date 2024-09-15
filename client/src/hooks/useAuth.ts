import { useCookie } from "./useCookie";
import { jwtDecode } from "jwt-decode";
import { TokenData, User } from "../types/types";
import { useSelector } from "react-redux";
import { RootState } from '../store/store';
export const useAuth = () => {
    const { getCookie, removeCookie } = useCookie();
    const getAuth = (): TokenData | User | undefined => {
        const accessToken = getCookie('accessToken');
        if (accessToken) {
            try {
                const decodedToken = jwtDecode<TokenData>(accessToken)
                if (decodedToken.exp * 1000 > Date.now()) {
                    return decodedToken;
                }
                removeCookie('accessToken');
                return undefined;
            } catch (err: any) {
                throw new Error(err)
            }
        }
        return undefined;
    }
    const getUserAuth = (): TokenData | User | undefined => {
        const user = useSelector((state: RootState) => state.users.loggedIn);
        return user;
    }
    return { getAuth, getUserAuth }
}