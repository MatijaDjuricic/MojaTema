import { PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { PersistAuth } from "./PersistAuth";
import { User } from "../types/types";
type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: User["roleStatus"][];
};
export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { currentUser } = useAuthContext();
  const location = useLocation();
  if (!currentUser || (allowedRoles && !allowedRoles.includes(currentUser.roleStatus))) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return (
    <PersistAuth>
      {children}
    </PersistAuth>
  );
};