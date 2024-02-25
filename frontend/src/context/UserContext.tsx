import { createContext, useContext } from "react";
import { TokenData, User } from "../types/types";
import { useAuth } from "../hooks/useAuth";
const UserContext = createContext<TokenData | User | undefined>(undefined);
export const useUserContext = () => {
    const user = useContext(UserContext);
    return user;
}
export const UserContextProvider = ({ children }: { children: JSX.Element}) => {
    const { getUserAuth } = useAuth();
    const user = getUserAuth();
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}