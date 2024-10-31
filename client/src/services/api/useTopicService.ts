import { createApiClientPrivate } from "./apiClient";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Topic, CreateTopicProps, UpdateTopicProps, TopicStatusProps, DeleteTopicProps } from "../../types/types";
import { createTopic, deleteTopic, fetchTopics, fetchTopicsByProfessorId, updateTopic, updateTopicStatus } from "../../redux/slices/topicsSlice";
export const useTopicService = () => {
    const apiClient = createApiClientPrivate();
    const dispatch = useDispatch<AppDispatch>();
    const fetchTopicsAsync = async () => {
        try {
            const response = await apiClient.get('/topic/get');
            const payload = await response.data as Topic[];
            if (payload) dispatch(fetchTopics(payload));
        } catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
    const fetchTopicsByProfessorIdAsync = async (id: number) => {
        try {
            const response = await apiClient.get(`/topic/professor/${id}`)
            const payload = await response.data as Topic[];
            if (payload) dispatch(fetchTopicsByProfessorId(payload))
        } catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
    const createTopicAsync = async ({ title, description, subjectId, professorId }: CreateTopicProps) => {
        try {
            const response = await apiClient.post('/topic/create', {
                "title": title,
                "description": description,
                "subjectId": subjectId,
                "professorId": professorId,
            });
            const payload = response.data as Topic;
            if (payload) dispatch(createTopic(payload))
        } catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
    const updateTopicAsync = async ({ id, userId }: UpdateTopicProps) => {
        try {
            const response = await apiClient.put(`/topic/update/${id}`, {
                "studentUserId": userId
            });
            const payload = await response.data as Topic;
            if (payload) dispatch(updateTopic(payload));
        } catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
    const updateTopicStatusAsync = async ({ id, professorId, topicStatus }: TopicStatusProps) => {
        try {
            const response = await apiClient.put(`/topic/update/status/${id}`, {
                "professorId": professorId,
                "topicStatus": topicStatus
            });
            const payload = await response.data as Topic;
            if (payload) dispatch(updateTopicStatus(payload));
        } catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
    const deleteTopicAsync = async ({ id, professorId }: DeleteTopicProps) => {
        try {
            const response = await apiClient.delete(`/topic/delete/${id}`, {
                params: { professorId },
            });
            const payload = await response.data as Topic;
            if (payload) dispatch(deleteTopic(payload));
        } catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
    return { fetchTopicsAsync, fetchTopicsByProfessorIdAsync, createTopicAsync, updateTopicAsync, updateTopicStatusAsync, deleteTopicAsync };
};