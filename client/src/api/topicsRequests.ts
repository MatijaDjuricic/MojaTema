import apiClient from "./apiClient";
import { Topic, CreateTopicProps, UpdateTopicProps, TopicStatusProps, DeleteTopicProps } from "../types/types";
export const fetchTopicsAsync = async () => {
    try {
        const response = await apiClient.get('/topic/get');
        return await response.data as Topic[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const fetchTopicsByProfessorIdAsync = async (id: number) => {
    try {
        const response = await apiClient.get(`/topic/professor/${id}`)
        return await response.data as Topic[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const updatedTopicAsync = async ({ id, userId }: UpdateTopicProps) => {
    try {
        const response = await apiClient.put(`/topic/update/${id}`, {
            "studentUserId": userId
        });
        return await response.data as Topic;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const updateTopicStatusAsync = async ({ id, professorId, topicStatus }: TopicStatusProps) => {
    try {
        const response = await apiClient.put(`/topic/update/status/${id}`, {
            "professorId": professorId,
            "topicStatus": topicStatus
        });
        return await response.data as Topic;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const createTopicAsync = async ({ title, description, subjectId, professorId }: CreateTopicProps) => {
    try {
        const response = await apiClient.post('/topic/create', {
            "title": title,
            "description": description,
            "subjectId": subjectId,
            "professorId": professorId,
        });
        return await response.data as Topic;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const deletedTopicAsync = async ({ id, professorId }: DeleteTopicProps) => {
    try {
        const response = await apiClient.delete(`/topic/delete/${id}`, {
            params: { professorId },
        });
        return await response.data as Topic;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}