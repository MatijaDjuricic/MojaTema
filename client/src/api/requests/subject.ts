import apiClient from "../apiClient";
import type { Subject } from "../../types";
import type { ICreateSubjectRequest, IUpdateSubjectRequest } from "../../types/interface";
export const getSubjectsAsync = async () => {
    try {
        const response = await apiClient.get('/subjects');
        return await response.data.data as Subject[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const getSubjectByIdAsync = async (id: number) => {
    try {
        const response = await apiClient.get(`/subjects/${id}`);
        return await response.data.data as Subject;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const getSubjectsByProfessorAsync = async (id: number) => {
    try {
        const response = await apiClient.get(`/subjects/professor/${id}`);
        return await response.data.data as Subject[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const createSubjectAsync = async (data: ICreateSubjectRequest) => {
    try {
        const response = await apiClient.post('/subjects', data);
        return await response.data.data as Subject;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const importSubjectsAsync = async (formData: FormData) => {
    try {
        const response = await apiClient.post('/subjects/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return await response.data.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const updateSubjectAsync = async (id: number, data: IUpdateSubjectRequest) => {
    try {
        const response = await apiClient.put(`/subjects/${id}`, data);
        return await response.data.data as Subject;
    } catch (err) {
        throw new Error(`Error: ${err}`);
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