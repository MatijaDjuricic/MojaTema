import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchChatsByUserIdAsync, fetchReceiverUserByIdAsync } from "../../api/messagesRequests";
import { Chats, Message, MessagesState, ReceiverUser } from "../../types/types";
import { resetAllStates } from "./rootSlice";
const initialState: MessagesState = {
    messages: [],
    chats: [],
    receiverUser: undefined
};
export const fetchReceiverUserById = createAsyncThunk('fetchReceiverUserById', fetchReceiverUserByIdAsync);
export const fetchChatsByUserId = createAsyncThunk('fetchChatsByUserId', fetchChatsByUserIdAsync);
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
        builder.addCase(resetAllStates, () => initialState);
        builder.addCase(fetchReceiverUserById.fulfilled, (state, action: PayloadAction<ReceiverUser>) => {
            state.receiverUser = action.payload;
        }).addCase(fetchChatsByUserId.fulfilled, (state, action: PayloadAction<Chats[]>) => {
            if (action.payload[0].id != -1) state.chats = action.payload;
        })
    }
});
export const { addMessages, resetState } = messagesSlice.actions;
export default messagesSlice.reducer;