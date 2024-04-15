import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Message, MessagesState } from "../types/types";
import axios from "axios";
axios.defaults.withCredentials = true;
const URL = import.meta.env.VITE_API_URL;
const initialState: MessagesState = {
    messages: []
};
export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessages: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        resetState: () => initialState
    },
    extraReducers(builder) {
        
    }
});
export const { addMessages, resetState } = messagesSlice.actions;
export default messagesSlice.reducer;