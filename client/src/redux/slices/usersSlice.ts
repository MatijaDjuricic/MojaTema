import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLoginAsync } from "../../api/usersRequests";
import { resetAllStates } from "./rootSlice";
import { TokenData, User, UsersState } from "../../types/types";
import { useToastMessage } from "../../hooks/useToastMessage";
import { useCookie } from "../../hooks/useCookie";
import { useAuth } from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
const { getAuth } = useAuth();
const { setCookie, removeCookie } = useCookie();
const { successMessage, errorMessage } = useToastMessage();
const initialState: UsersState = {
    users: [],
    loggedIn: getAuth()
};
export const userLogin = createAsyncThunk('userLogin', userLoginAsync);
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logOut: state => {
            removeCookie('accessToken');
            successMessage('Успешна одјава');
            state.loggedIn = undefined;
        },
        resetState: () => initialState
    },
    extraReducers(builder) {
        builder.addCase(resetAllStates, () => initialState);
        builder.addCase(userLogin.fulfilled, (state, action) => {
            setCookie("accessToken", action.payload.accessToken);
            const tokenBody = jwtDecode<TokenData | User>(action.payload.accessToken);
            state.loggedIn = tokenBody;
            successMessage('Успешна пријава');
        }).addCase(userLogin.rejected, () => {
            errorMessage('Погрешна имејл адреса или лозинка');
        });
    }
});
export const { logOut, resetState } = usersSlice.actions;
export default usersSlice.reducer;