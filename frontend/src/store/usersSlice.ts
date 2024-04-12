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
const { successMessage, errorMessage } = useToastMessage()
const initialState: UsersState = {
    users: [],
    loggedIn: getAuth()
};
export const userLogin = createAsyncThunk('user/login', async (password: string) => {
    try {
        const response = await axios.post(`${URL}/user/login`, {
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
            removeCookie("access_token");
            successMessage('Успешна одјава');
            state.loggedIn = undefined;
        },
        resetState: () => initialState
    },
    extraReducers(builder) {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            setCookie("access_token", action.payload.access_token);
            const tokenBody = jwtDecode<TokenData | User>(action.payload.access_token);
            state.loggedIn = tokenBody;
            successMessage('Успешна пријава');
        }).addCase(userLogin.rejected, () => {
            errorMessage('Погрешна лозинка');
        });
    }
});
export const { logOut, resetState } = usersSlice.actions;
export default usersSlice.reducer;