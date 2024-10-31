import { useState, PropsWithChildren } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UserAuthResponse } from "../../types/types";
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<UserAuthResponse | undefined>(undefined);
  const value = {
    auth,
    setAuth: (newAuth: UserAuthResponse | undefined) => setAuth(newAuth)
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};