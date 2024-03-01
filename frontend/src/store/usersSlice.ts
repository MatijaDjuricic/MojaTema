import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TokenData, User, UsersState } from "../types/types";
import { useToastMessage } from "../hooks/useToastMessage";
import { useCookie } from "../hooks/useCookie";
import { useAuth } from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
axios.defaults.withCredentials = true;
const URL = import.meta.env.VITE_API_URL;
const { setCookie, removeCookie } = useCookie();
const { getAuth } = useAuth();
const { successMessage, errorMessage } = useToastMessage()
const initialState: UsersState = {
    users: [],
    loggedIn: getAuth()
};
export const userLogin = createAsyncThunk('users/login', async (password: string | undefined) => {
    try {
        const response = await axios.post(`${URL}/users/login`, {
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
            successMessage('Uspšena odjava');
            state.loggedIn = undefined;
        },
        resetState: () => initialState
    },
    extraReducers(builder) {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            setCookie("access_token", action.payload.access_token);
            const tokenBody = jwtDecode<TokenData | User>(action.payload.access_token);
            state.loggedIn = tokenBody;
            successMessage('Uspešna prijava');
        }).addCase(userLogin.rejected, () => {
            errorMessage('Pogrešna lozinka');
        });
    }
});
export const { logOut, resetState } = usersSlice.actions;
export default usersSlice.reducer;