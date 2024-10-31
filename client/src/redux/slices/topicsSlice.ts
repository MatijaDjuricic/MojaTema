import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { setSubjects } from "../../utils/helpers";
import { Topic, TopicsState } from "../../types/types";
const initialState: TopicsState = {
    topics: [],
    subjects: []
};
export const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        fetchTopics: (state, action: PayloadAction<Topic[]>) => {
            state.topics = action.payload;
            state.subjects = setSubjects(state.topics);
        },
        fetchTopicsByProfessorId: (state, action: PayloadAction<Topic[]>) => {
            state.topics = action.payload;
            state.subjects = setSubjects(state.topics);
        },
        createTopic: (state, action: PayloadAction<Topic>) => {
            state.topics.push(action.payload);
            state.subjects = setSubjects(state.topics);
        },
        updateTopic: (state, action: PayloadAction<Topic>) => {
            const updatedTopic = action.payload;
            const index = state.topics.findIndex(topic => topic.id === updatedTopic.id);
            if (index !== -1) {
                state.topics[index] = updatedTopic;
                state.subjects = setSubjects(state.topics);
            }
        },
        updateTopicStatus: (state, action: PayloadAction<Topic>) => {
            const updatedTopic = action.payload;
            const index = state.topics.findIndex(topic => topic.id === updatedTopic.id);
            if (index !== -1) {
                state.topics[index] = updatedTopic;
                state.subjects = setSubjects(state.topics);
            }
        },
        deleteTopic: (state, action) => {
            state.topics = state.topics.filter(topic => topic.id != action.payload.id);
            state.subjects = setSubjects(state.topics);
        },
        resetState: () => initialState
    }
});
export const selectTopics = (state: RootState) => state.topics.topics;
export const selectSubjects = (state: RootState) => state.topics.subjects;
export const { fetchTopics, fetchTopicsByProfessorId, createTopic, updateTopic, updateTopicStatus, deleteTopic, resetState } = topicsSlice.actions;
export default topicsSlice.reducer;