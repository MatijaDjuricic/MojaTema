import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { resetAllStates } from "../../redux/slices/rootSlice";
import { useAuthService } from "../../services/api/useAuthService";
import { useAuthContext } from "../../context/AuthContext";
import { useToastMessage } from "../../hooks/useToastMessage";
const useLogOut = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { setAuth } = useAuthContext();
    const { userLogOutAsync } = useAuthService();
    const { successMessage, errorMessage } = useToastMessage();
    const logOut = async () => {
        try {
            await userLogOutAsync();
        } catch (err) {
            console.error(err);
            errorMessage(err as string);
        } finally {
            setAuth(undefined);
            dispatch(resetAllStates());
            navigate("/login");
            successMessage('Успешна одјава');
        }
    }
    return logOut;
}
export default useLogOut;