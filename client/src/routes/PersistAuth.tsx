import { useEffect, PropsWithChildren, useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useAuthService } from "../services/api/useAuthService";
import Loader from "../components/Loader";
export const PersistAuth = ({ children }: PropsWithChildren) => {
    const { accessToken, setAuth } = useAuthContext();
    const { userVerifyTokenAsync } = useAuthService();
    const useEffectRef = useRef<boolean>(false);
    useEffect(() => {
        const verifyAuthToken = async () => {
            try {
                const auth = await userVerifyTokenAsync();
                setAuth(auth);
            } catch (err) {
                console.error(err);
            } finally {
                useEffectRef.current = true;
            }
        }
        if (!accessToken) verifyAuthToken();
        return () => {
            useEffectRef.current = false;
        }
    }, []);
    if (useEffectRef.current) return <Loader/>;
    return children
};