import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Chats, Message, MessagesState, ReceiverUser } from "../../types/types";
import { RootState } from "../store";
const initialState: MessagesState = {
    messages: [],
    chats: [],
    receiverUser: undefined
};
export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessages: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        fetchReceiverUserById: (state, action: PayloadAction<ReceiverUser>) => {
            state.receiverUser = action.payload;
        },
        fetchChatsByUserId: (state, action: PayloadAction<Chats[]>) => {
            if (action.payload[0].id != -1) state.chats = action.payload;
        },
        resetState: () => initialState
    }
})
export const selectMessages = (state: RootState) => state.messages.messages;
export const selectChats = (state: RootState) => state.messages.chats;
export const selectReceiverUser = (state: RootState) => state.messages.receiverUser;
export const { addMessages, fetchReceiverUserById, fetchChatsByUserId, resetState } = messagesSlice.actions;
export default messagesSlice.reducer;