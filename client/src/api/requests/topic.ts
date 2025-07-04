import apiClient from "../apiClient";
import type { Topic } from "../../types";
import type { ICreateTopicRequest, IUpdateTopicRequest } from "../../types/interface";
export const getTopicsAsync = async (search?: string) => {
    try {
        const query: string = search ? `?search=${search}` : '';
        const response = await apiClient.get(`/api/topics${query}`);
        return await response.data.data as Topic[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const getReportedTopicsAsync = async () => {
    try {
        const response = await apiClient.get('/api/topics/reported');
        return await response.data.data as Topic[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const getTopicsByProfessorAsync = async (id: number) => {
    try {
        const response = await apiClient.get(`/api/topics/professor/${id}`);
        return await response.data.data as Topic[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const createTopicAsync = async (data: ICreateTopicRequest) => {
    try {
        const response = await apiClient.post('/api/topics', data);
        return await response.data.data as Topic;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const importTopicsAsync = async (formData: FormData) => {
    try {
        const response = await apiClient.post('/api/topics/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return await response.data.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const updateTopicAsync = async (id: number, data: IUpdateTopicRequest) => {
    try {
        const response = await apiClient.put(`/api/topics/${id}`, data);
        return await response.data.data as Topic;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const updateTopicStatusAsync = async (id: number, status: number) => {
    try {
        const response = await apiClient.patch(`/api/topics/${id}/status`, { status });
        return await response.data.data as Topic;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const deleteTopicAsync = async (id: number) => {
    try {
        const response = await apiClient.delete(`/api/topics/${id}`);
        return await response.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}