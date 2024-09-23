import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetAllStates } from "./rootSlice";
import { useAuth } from "../../hooks/useAuth";
import { isReportedUser, setSubjects } from "../../utils/utils";
import { TopicsState } from "../../types/types";
import {
    createTopicAsync,
    deletedTopicAsync,
    fetchTopicsAsync,
    fetchTopicsByProfessorIdAsync,
    updatedTopicAsync,
    updateTopicStatusAsync,
} from "../../api/topicsRequests";
const { getAuth } = useAuth();
const initialState: TopicsState = {
    topics: [],
    subjects: [],
    registeredStudent: false,
};
export const fetchTopics = createAsyncThunk('fetchTopics', fetchTopicsAsync);
export const fetchTopicsByProfessorId = createAsyncThunk('fetchTopicsByProfessorId', fetchTopicsByProfessorIdAsync);
export const updateTopic = createAsyncThunk('updateTopic', updatedTopicAsync);
export const updateTopicStatus = createAsyncThunk('updateTopicStatus', updateTopicStatusAsync);
export const createTopic = createAsyncThunk('createTopic', createTopicAsync);
export const deleteTopic = createAsyncThunk('deleteTopic', deletedTopicAsync);
export const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        resetState: () => initialState
    },
    extraReducers(builder) {
        builder.addCase(resetAllStates, () => initialState);
        builder.addCase(fetchTopics.fulfilled, (state, action) => {
            state.topics = action.payload;
            state.subjects = setSubjects(state.topics);
            const user = getAuth();
            if (user) state.registeredStudent = isReportedUser(action.payload, user.id)
        }).addCase(fetchTopicsByProfessorId.fulfilled, (state, action) => {
            state.topics = action.payload;
            state.subjects = setSubjects(state.topics);
        }).addCase(updateTopic.fulfilled, (state, action) => {
            const updatedTopic = action.payload;
            const index = state.topics.findIndex(topic => topic.id === updatedTopic.id);
            if (index !== -1) {
                state.topics[index] = updatedTopic;
                state.subjects = setSubjects(state.topics);
            }
            state.registeredStudent = !state.registeredStudent;
        }).addCase(updateTopicStatus.fulfilled, (state, action) => {
            const updatedTopic = action.payload;
            const index = state.topics.findIndex(topic => topic.id === updatedTopic.id);
            if (index !== -1) {
                state.topics[index] = updatedTopic;
                state.subjects = setSubjects(state.topics);
            }
        }).addCase(createTopic.fulfilled, (state, action) => {
            state.topics.push(action.payload);
            state.subjects = setSubjects(state.topics);
        }).addCase(deleteTopic.fulfilled, (state, action) => {
            state.topics = state.topics.filter(topic => topic.id != action.payload.id);
            state.subjects = setSubjects(state.topics);
        })
    }
});
export const { resetState } = topicsSlice.actions;
export default topicsSlice.reducer;