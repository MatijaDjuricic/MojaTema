import { useAuthContext } from '../../context/AuthContext';
import { useAuthService } from '../api/useAuthService';
const useRefreshToken = () => {
    const { setAuth } = useAuthContext();
    const { userRefreshTokenAsync } = useAuthService();
    const refresh = async () => {
        const response = await userRefreshTokenAsync();
        setAuth({ user: response.user, accessToken: response.accessToken });
        return response.accessToken;
    }
    return refresh;
};
export default useRefreshToken;