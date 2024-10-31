import { createContext, useContext} from "react";
import { User, UserAuthResponse } from "../types/types";
export type AuthContextProps = {
  auth: UserAuthResponse | undefined,
  setAuth: (newAuth: UserAuthResponse | undefined) => void,
};
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within an AuthProvider");
  return {
    currentUser: context.auth?.user as User,
    accessToken: context.auth?.accessToken as string,
    setAuth: context.setAuth
  };
};