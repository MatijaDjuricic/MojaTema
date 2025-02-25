import apiClient from "../apiClient";
import type { Topic } from "../../types";
import type { ICreateTopicRequest } from "../../types/interface";
export const getTopicsAsync = async (search?: string) => {
    try {
        const query: string = search ? `?search=${search}` : '';
        const response = await apiClient.get(`/topics${query}`);
        return await response.data.data as Topic[];
    } catch (error) {
        console.error('Failed to fetch topics:', error);
    }
}
export const getReportedTopicsAsync = async () => {
    try {
        const response = await apiClient.get(`/topics/reported`);
        return await response.data.data as Topic[];
    } catch (error) {
        console.error('Failed to fetch topics:', error);
    }
}
export const getTopicsByProfessorAsync = async (id: number) => {
    try {
        const response = await apiClient.get(`/topics/professor/${id}`);
        return await response.data.data as Topic[];
    } catch (error) {
        console.error('Failed to fetch topics:', error);
    }
}
export const createTopicAsync = async (data: ICreateTopicRequest) => {
    try {
        const response = await apiClient.post('/topics', data);
        return await response.data.data as Topic;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const importTopicsAsync = async (formData: FormData) => {
    try {
        const response = await apiClient.post('/topics/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return await response.data.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const updateTopicStatusAsync = async (id: number, status: number) => {
    try {
        const response = await apiClient.patch(`/topics/${id}/status`, { status });
        return await response.data.data as Topic;
    } catch (error) {
        console.error('Failed to fetch topics:', error);
    }
}
export const deleteTopicAsync = async (id: number) => {
    try {
        const response = await apiClient.delete(`/topics/${id}`);
        return await response.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}