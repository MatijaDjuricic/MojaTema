import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resetAllStates } from "./rootSlice";
import { RootState } from "../store";
import { useAuth } from "../../hooks/useAuth";
import { isReportedUser, setSubjects } from "../../utils/utils";
import { CreateTopicProps, DeleteTopicProps, Topic, TopicsState, TopicStatusProps, UpdateTopicProps } from "../../types/types";
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
export const fetchTopics = createAsyncThunk<Topic[], void>('topics/fetchTopics', fetchTopicsAsync);
export const fetchTopicsByProfessorId = createAsyncThunk<Topic[], number>('topics/fetchTopicsByProfessorId', fetchTopicsByProfessorIdAsync);
export const updateTopic = createAsyncThunk<Topic, UpdateTopicProps>('topics/updateTopic', updatedTopicAsync);
export const updateTopicStatus = createAsyncThunk<Topic, TopicStatusProps>('topics/updateTopicStatus', updateTopicStatusAsync);
export const createTopic = createAsyncThunk<Topic, CreateTopicProps>('topics/createTopic', createTopicAsync);
export const deleteTopic = createAsyncThunk<Topic, DeleteTopicProps>('topics/deleteTopic', deletedTopicAsync);
export const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        resetState: () => initialState
    },
    extraReducers(builder) {
        builder.addCase(resetAllStates, () => initialState);
        builder.addCase(fetchTopics.fulfilled, (state, action: PayloadAction<Topic[]>) => {
            state.topics = action.payload;
            state.subjects = setSubjects(state.topics);
            const user = getAuth();
            if (user) state.registeredStudent = isReportedUser(action.payload, user.id)
        }).addCase(fetchTopicsByProfessorId.fulfilled, (state, action: PayloadAction<Topic[]>) => {
            state.topics = action.payload;
            state.subjects = setSubjects(state.topics);
        }).addCase(updateTopic.fulfilled, (state, action: PayloadAction<Topic>) => {
            const updatedTopic = action.payload;
            const index = state.topics.findIndex(topic => topic.id === updatedTopic.id);
            if (index !== -1) {
                state.topics[index] = updatedTopic;
                state.subjects = setSubjects(state.topics);
            }
            state.registeredStudent = !state.registeredStudent;
        }).addCase(updateTopicStatus.fulfilled, (state, action: PayloadAction<Topic>) => {
            const updatedTopic = action.payload;
            const index = state.topics.findIndex(topic => topic.id === updatedTopic.id);
            if (index !== -1) {
                state.topics[index] = updatedTopic;
                state.subjects = setSubjects(state.topics);
            }
        }).addCase(createTopic.fulfilled, (state, action: PayloadAction<Topic>) => {
            state.topics.push(action.payload);
            state.subjects = setSubjects(state.topics);
        }).addCase(deleteTopic.fulfilled, (state, action) => {
            state.topics = state.topics.filter(topic => topic.id != action.payload.id);
            state.subjects = setSubjects(state.topics);
        })
    }
});
export const selectTopics = (state: RootState) => state.topics.topics;
export const selectSubjects = (state: RootState) => state.topics.subjects;
export const selectRegisteredStudent = (state: RootState) => state.topics.registeredStudent;
export const { resetState } = topicsSlice.actions;
export default topicsSlice.reducer;