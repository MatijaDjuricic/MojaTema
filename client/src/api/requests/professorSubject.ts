import apiClient from "../apiClient";
import type { ProfessorSubject } from "../../types";
import type { ICreateProfessorSubjectRequest, IUpdateProfessorSubjectRequest } from "../../types/interface";
export const getProfessorSubjectsAsync = async () => {
    try {
        const response = await apiClient.get('/api/professor-subjects');
        return await response.data.data as ProfessorSubject[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const getProfessorSubjectByIdAsync = async (id: number) => {
    try {
        const response = await apiClient.get(`/api/professor-subjects/${id}`);
        return await response.data.data as ProfessorSubject;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const getProfessorSubjectByProfessorAsync = async (id: number) => {
    try {
        const response = await apiClient.get(`/api/professor-subjects/professor/${id}`);
        return await response.data.data as ProfessorSubject[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const createProfessorSubjectAsync = async (data: ICreateProfessorSubjectRequest) => {
    try {
        const response = await apiClient.post('/api/professor-subjects', data);
        return await response.data.data as ProfessorSubject;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const importProfessorSubjectsAsync = async (formData: FormData) => {
    try {
        const response = await apiClient.post('/api/professor-subjects/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return await response.data.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const updateProfessorSubjectAsync = async (id: number, data: IUpdateProfessorSubjectRequest) => {
    try {
        const response = await apiClient.put(`/api/professor-subjects/${id}`, data);
        return await response.data.data as ProfessorSubject;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const deleteProfessorSubjectAsync = async (id: number) => {
    try {
        const response = await apiClient.delete(`/api/professor-subjects/${id}`);
        return await response.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}