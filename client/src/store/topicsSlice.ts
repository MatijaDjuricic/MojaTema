import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Topic, TopicsState } from "../types/types";
import { isReportedUser, setSubjects } from "../utils/utils";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
axios.defaults.withCredentials = true;
const URL = import.meta.env.VITE_API_URL;
const { getAuth } = useAuth();
const initialState: TopicsState = {
    topics: [],
    subjects: [],
    registeredStudent: false,
};
type UpdateTopicProps = {
    id: number,
    userId: number
}
type TopicStatusProps = {
    id: number,
    professorId: number,
    topicStatus: number
}
type CreateTopicProps = {
    title: string,
    description: string,
    subjectId: number,
    professorId: number
}
type DeleteTopicProps = {
    id: number,
    professorId: number,
}
export const fetchTopics = createAsyncThunk<Topic[]>('fetchTopics', async () => {
    try {
        const response = await axios.get(`${URL}/topic/get`);
        return await response.data as Topic[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
export const fetchTopicsByProfessorId = createAsyncThunk<Topic[], number>('fetchTopicsByProfessorId', async (id: number) => {
    try {
        const response = await axios.get(`${URL}/topic/professor/${id}`)
        return await response.data as Topic[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
export const updateTopic = createAsyncThunk<Topic, UpdateTopicProps>('updateTopic', async ({ id, userId }: UpdateTopicProps) => {
    try {
        const response = await axios.put(`${URL}/topic/update/${id}`, {
            "studentUserId": userId
        });
        return await response.data as Topic;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
export const updateTopicStatus = createAsyncThunk<Topic, TopicStatusProps>('updateTopicStatus', async ({ id, professorId, topicStatus }: TopicStatusProps) => {
    try {
        const response = await axios.put(`${URL}/topic/update/status/${id}`, {
            "professorId": professorId,
            "topicStatus": topicStatus
        });
        return await response.data as Topic;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
export const createTopic = createAsyncThunk<Topic, CreateTopicProps>('createTopic', async ({ title, description, subjectId, professorId }: CreateTopicProps) => {
    try {
        const response = await axios.post(`${URL}/topic/create`, {
            "title": title,
            "description": description,
            "subjectId": subjectId,
            "professorId": professorId,
        });
        return await response.data as Topic;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
export const deleteTopic = createAsyncThunk<Topic, DeleteTopicProps>('deleteTopic', async ({ id, professorId }: DeleteTopicProps) => {
    try {
        const response = await axios.delete(`${URL}/topic/delete/${id}`, {
            params: { professorId },
        });
        return await response.data as Topic;
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
            const deletedTopic = action.payload;
            state.topics = state.topics.filter(topic => topic.id != deletedTopic.id);
            state.subjects = setSubjects(state.topics);
        })
    }
});
export const { resetState } = topicsSlice.actions;
export default topicsSlice.reducer;