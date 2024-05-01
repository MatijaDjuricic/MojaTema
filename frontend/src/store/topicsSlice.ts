import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reportedTopic, Topic, TopicsState } from "../types/types";
import { reportedTopicsCount, setSubjects } from "../utils/utils";
import axios from "axios";
axios.defaults.withCredentials = true;
const URL = import.meta.env.VITE_API_URL;
type topicsRegistrationProps = {
    topic_id: number,
    user_id: number,
    mentor_id: number
};
const initialState: TopicsState = {
    topics: [],
    subjects: [],
    reported_topics: {
        current_number: 0,
        limit: 3,
        topics: []
    }
};
export const topicsFetchAll = createAsyncThunk('/topic/get', async () => {
    try {
        const response = await axios.get(`${URL}/topic/get`);
        return await response.data as Topic[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
export const topicsFetchByMentorId = createAsyncThunk('/topic/reported/get', async (id : number) => {
    try {
        const response = await axios.get(`${URL}/topic/reported/get/${id}`);
        return await response.data as Topic[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
export const GetReportedUsersTopicsByMentorId = createAsyncThunk('/topic/reported/get/mentor', async (id: number) => {
    try {
        const response = await axios.get(`${URL}/topic/reported/get/mentor/${id}`);
        return await response.data as reportedTopic[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
export const GetReportedMentorsTopicsByUserId = createAsyncThunk('/topic/reported/get/user', async (id: number) => {
    try {
        const response = await axios.get(`${URL}/topic/reported/get/user/${id}`);
        return await response.data as reportedTopic[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
export const topicsRegistrationApply = createAsyncThunk('/topic/reported/add', async ({ user_id, topic_id, mentor_id }: topicsRegistrationProps) => {
    try {
        const response = await axios.post(`${URL}/topic/reported/add`, {
            "topic_id": topic_id,
            "user_id": user_id,
            "mentor_id": mentor_id
        });
        return await response.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
export const topicsRegistrationCancel = createAsyncThunk('/topic/reported/remove', async ({ user_id, topic_id, mentor_id }: topicsRegistrationProps) => {
    try {
        const response = await axios.post(`${URL}/topic/reported/remove`, {
            "topic_id": topic_id,
            "user_id": user_id,
            "mentor_id": mentor_id
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
            state.reported_topics.current_number = reportedTopicsCount(state.topics, action.payload);
        },
        resetState: () => initialState
    },
    extraReducers(builder) {
        builder.addCase(topicsFetchAll.fulfilled, (state, action) => {
            state.topics = action.payload;
            state.subjects = setSubjects(state.topics);
        }).addCase(topicsFetchByMentorId.fulfilled, (state, action) => {
            state.topics = action.payload;
            state.subjects = setSubjects(state.topics);
        }).addCase(GetReportedUsersTopicsByMentorId.fulfilled, (state, action) => {
            state.reported_topics.topics = action.payload;
        }).addCase(GetReportedMentorsTopicsByUserId.fulfilled, (state, action) => {
            state.reported_topics.topics = action.payload;
        }).addCase(topicsRegistrationApply.fulfilled, (state, action) => {
            const reportedTopic = {
                "student_username": action.payload.student_username,
                "user_id": action.payload.user_id
            }
            state.topics[action.payload.topic_id - 1].reportedTopicUsers.push(reportedTopic);
            state.reported_topics.current_number++;
            state.subjects = setSubjects(state.topics);
        }).addCase(topicsRegistrationCancel.fulfilled, (state, action) => {
            state.topics[action.payload.topic_id - 1].reportedTopicUsers
            .splice(state.topics[action.payload.topic_id - 1]
            .reportedTopicUsers.findIndex(reportedTopic => reportedTopic.user_id == action.payload.user_id), 1);
            state.reported_topics.current_number--;
            state.subjects = setSubjects(state.topics);
        })
    }
});
export const { setReportedTopics, resetState } = topicsSlice.actions;
export default topicsSlice.reducer;