import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Topic, TopicsState } from "../types/types";
import axios from "axios";
axios.defaults.withCredentials = true;
const URL = import.meta.env.VITE_API_URL;
const initialState: TopicsState = {
    topics: []
};
type topicsRegistrationProps = {
    user_id: number,
    topic_id: number,
};
export const topicsFetchAll = createAsyncThunk('/topics/get', async () => {
    try {
        const response = await axios.get(`${URL}/topics/get`);
        return await response.data as Topic[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
export const topicsRegistrationApply = createAsyncThunk('/topics/registrationApply', async ({ user_id, topic_id }: topicsRegistrationProps) => {
    try {
        const response = await axios.post(`${URL}/topics/registrationApply`, {
            "user_id": user_id,
            "topic_id": topic_id
        });
        return await response.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
export const topicsRegistrationCancel = createAsyncThunk('/topics/registrationCancel', async (topic_id: number) => {
    try {
        const response = await axios.post(`${URL}/topics/registrationCencel`, {
            "topic_id": topic_id
        });
        return await response.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
export const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        resetState: () => initialState
    },
    extraReducers(builder) {
        builder.addCase(topicsFetchAll.fulfilled, (state, action) => {
            state.topics = action.payload;
        }).addCase(topicsRegistrationApply.fulfilled, (state, action) => {
            state.topics[action.payload.topic_id - 1]["student_username"] = action.payload.student_username;
            state.topics[action.payload.topic_id - 1]["user_id"] = action.payload.user_id;
        }).addCase(topicsRegistrationCancel.fulfilled, (state, action) => {
            state.topics[action.payload.topic_id - 1]["user_id"] = -1;
        })
    }
});
export const { resetState } = topicsSlice.actions;
export default topicsSlice.reducer;