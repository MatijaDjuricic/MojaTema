import apiClient from "../apiClient";
import type { Subject } from "../../types";
import type { IUpdateSubjectRequest } from "../../types/interface";
export const getSubjectsAsync = async () => {
    try {
        const response = await apiClient.get('/subjects');
        return await response.data.data as Subject[];
    } catch (error) {
        console.error('Failed to fetch topics:', error);
    }
}
export const getSubjectByIdAsync = async (id: number) => {
    try {
        const response = await apiClient.get(`/subjects/${id}`);
        return await response.data.data as Subject;
    } catch (error) {
        console.error('Failed to fetch topics:', error);
    }
}
export const getSubjectsByProfessorAsync = async (id: number) => {
    try {
        const response = await apiClient.get(`/subjects/professor/${id}`);
        return await response.data.data as Subject[];
    } catch (error) {
        console.error('Failed to fetch topics:', error);
    }
}
export const updateSubjectAsync = async (id: number, data: IUpdateSubjectRequest) => {
    try {
        const response = await apiClient.put(`/subjects/${id}`, data);
        return await response.data.data as Subject;
    } catch (error) {
        console.error('Failed to fetch subject:', error);
    }
}
export const deleteSubjectAsync = async (id: number) => {
    try {
        const response = await apiClient.delete(`/subjects/${id}`);
        return await response.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}