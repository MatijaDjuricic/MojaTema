import { createContext, useContext } from "react";
import { TokenData, User } from "../types/types";
import { useAuth } from "../hooks/useAuth";
import { useCookie } from "../hooks/useCookie";
import axios from "axios";
const UserContext = createContext<TokenData | User | undefined>(undefined);
export const useUserContext = () => {
    const user = useContext(UserContext);
    return user as User;
}
export const UserContextProvider = ({ children }: { children: JSX.Element }) => {
    const { getUserAuth } = useAuth();
    const { getCookie } = useCookie();
    const user = getUserAuth();
    axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie('accessToken')}`;
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}