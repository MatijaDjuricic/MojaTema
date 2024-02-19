import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TopicsState } from "../types/types";
import axios from "axios";
axios.defaults.withCredentials = true;
const URL = import.meta.env.VITE_URL_PUBLIC;
const initialState: TopicsState = {
    topics: [],
    loading_status: false,
}
export const topicsFetchAll = createAsyncThunk('/topics/get', async () => {
    try {
        const response = await axios.get(URL + '/topics/get');
        return response.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
})
export const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        resetState: () => initialState
    },
    extraReducers(builder) {
        builder.addCase(topicsFetchAll.pending, state => {
            if (state.topics.length === 0) state.loading_status = true;
        }).addCase(topicsFetchAll.fulfilled, (state, action) => {
            if (state.topics.length === 0) {
                state.topics = action.payload;
                state.loading_status = false;
            }
        });
    }
});
export const { resetState } = topicsSlice.actions;
export default topicsSlice.reducer;