import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Chats, Message, MessagesState, ReceiverUser } from "../types/types";
import axios from "axios";
axios.defaults.withCredentials = true;
const URL = import.meta.env.VITE_API_URL;
const initialState: MessagesState = {
    messages: [],
    chats: [],
    receiverUser: undefined
};
export const fetchReceiverUserById = createAsyncThunk<ReceiverUser, number>('fetchReceiverUserById', async (id: number) => {
    try {
        const response = await axios.get(`${URL}/message/receiver/${id}`)
        return await response.data as ReceiverUser;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
export const fetchChatsByUserId = createAsyncThunk<Chats[], number>('fetchChatsByUserId', async (id: number) => {
    try {
        const response = await axios.get(`${URL}/message/chats/user/${id}`)
        return await response.data as Chats[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
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
        builder.addCase(fetchReceiverUserById.fulfilled, (state, action: PayloadAction<ReceiverUser>) => {
            state.receiverUser = action.payload;
        }).addCase(fetchChatsByUserId.fulfilled, (state, action: PayloadAction<Chats[]>) => {
            state.chats = action.payload;
        })
    }
});
export const { addMessages, resetState } = messagesSlice.actions;
export default messagesSlice.reducer;