import apiClient from "../apiClient";
import type { Subject } from "../../types";
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
export const deleteSubjectAsync = async (id: number) => {
    try {
        const response = await apiClient.delete(`/subjects/${id}`);
        return await response.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}