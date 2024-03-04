import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Topic, TopicsState } from "../types/types";
import axios from "axios";
axios.defaults.withCredentials = true;
const URL = import.meta.env.VITE_API_URL;
const initialState: TopicsState = {
    topics: [],
    reported_topics: {
        current_number: 0,
        limit: 3,
    }
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
export const topicsRegistrationCancel = createAsyncThunk('/topics/registrationCancel', async ({ user_id, topic_id }: topicsRegistrationProps) => {
    try {
        const response = await axios.post(`${URL}/topics/registrationCencel`, {
            "user_id": user_id,
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
        setReportedTopics: (state, action: PayloadAction<number>) => {
            const reportedTopicsCount = state.topics.reduce((count, topic) => {
                const reportedTopics = topic.reportedTopicUsers.filter(reportedTopic => reportedTopic.user_id == action.payload);
                return count + reportedTopics.length;
            }, 0);
            state.reported_topics.current_number = reportedTopicsCount;
        },
        resetState: () => initialState
    },
    extraReducers(builder) {
        builder.addCase(topicsFetchAll.fulfilled, (state, action) => {
            state.topics = action.payload;
            
        }).addCase(topicsRegistrationApply.fulfilled, (state, action) => {
            const reportedTopic = {
                "student_username": action.payload.student_username,
                "user_id": action.payload.user_id
            }
            state.topics[action.payload.topic_id - 1].reportedTopicUsers.push(reportedTopic);
            state.reported_topics.current_number++;
        }).addCase(topicsRegistrationCancel.fulfilled, (state, action) => {
            state.topics[action.payload.topic_id - 1].reportedTopicUsers
            .splice(state.topics[action.payload.topic_id - 1]
            .reportedTopicUsers.findIndex(reportedTopic => reportedTopic.user_id == action.payload.user_id), 1);
            state.reported_topics.current_number--;
        })
    }
});
export const { setReportedTopics, resetState } = topicsSlice.actions;
export default topicsSlice.reducer;