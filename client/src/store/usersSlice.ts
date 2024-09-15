import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TokenData, User, UsersState } from "../types/types";
import { useToastMessage } from "../hooks/useToastMessage";
import { useCookie } from "../hooks/useCookie";
import { useAuth } from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
axios.defaults.withCredentials = true;
const URL = import.meta.env.VITE_API_URL;
const { getAuth } = useAuth();
const { setCookie, removeCookie } = useCookie();
const { successMessage, errorMessage } = useToastMessage();
type UserLoginProps = {
    email: string,
    password: string
}
const initialState: UsersState = {
    users: [],
    loggedIn: getAuth()
};
export const userLogin = createAsyncThunk('userLogin', async ({ email, password }: UserLoginProps) => {
    try {
        const response = await axios.post(`${URL}/user/login`, {
            'email': email,
            'password': password
        });
        return await response.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logOut: state => {
            removeCookie("accessToken");
            successMessage('Успешна одјава');
            state.loggedIn = undefined;
        },
        resetState: () => initialState
    },
    extraReducers(builder) {
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