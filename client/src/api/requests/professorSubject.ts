import apiClient from "../apiClient";
import type { ProfessorSubject } from "../../types";
import type { ICreateProfessorSubjectRequest, IUpdateProfessorSubjectRequest } from "../../types/interface";
export const getProfessorSubjectsAsync = async () => {
    try {
        const response = await apiClient.get('/professor-subjects');
        return await response.data.data as ProfessorSubject[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const getProfessorSubjectByIdAsync = async (id: number) => {
    try {
        const response = await apiClient.get(`/professor-subjects/${id}`);
        return await response.data.data as ProfessorSubject;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const getProfessorSubjectByProfessorAsync = async (id: number) => {
    try {
        const response = await apiClient.get(`/professor-subjects/professor/${id}`);
        return await response.data.data as ProfessorSubject[];
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const createProfessorSubjectAsync = async (data: ICreateProfessorSubjectRequest) => {
    try {
        const response = await apiClient.post('/professor-subjects', data);
        return await response.data.data as ProfessorSubject;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const importProfessorSubjectsAsync = async (formData: FormData) => {
    try {
        const response = await apiClient.post('/professor-subjects/import', formData, {
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
        const response = await apiClient.put(`/professor-subjects/${id}`, data);
        return await response.data.data as ProfessorSubject;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}
export const deleteProfessorSubjectAsync = async (id: number) => {
    try {
        const response = await apiClient.delete(`/professor-subjects/${id}`);
        return await response.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}