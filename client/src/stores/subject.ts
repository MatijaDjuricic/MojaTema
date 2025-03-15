import { defineStore } from 'pinia';
import {
    getSubjectsAsync,
    getSubjectsByProfessorAsync,
    createSubjectAsync,
    updateSubjectAsync,
    deleteSubjectAsync,
} from '../services/subject';
import type { ICreateSubjectRequest, IUpdateSubjectRequest, SubjectState } from '../types/interface';
import type { Subject } from '../types';
export const useSubjectStore = defineStore('subject', {
    state: (): SubjectState => ({
        subjects: [],
    }),
    getters: {
        defaultSubject(state): Subject {
            return state.subjects[0];
        }
    },
    actions: {
        async getSubjects(): Promise<void> {
            const subjects = await getSubjectsAsync();
            if (subjects) this.subjects = subjects;
        },
        async getSubjectsByProfessor(id: number): Promise<void> {
            const subjects = await getSubjectsByProfessorAsync(id);
            if (subjects) this.subjects = subjects;
        },
        async createSubject(data: ICreateSubjectRequest): Promise<void> {
            const createdSubject = await createSubjectAsync(data);
            if (createdSubject) this.subjects.push(createdSubject);
        },
        async updateSubject(id: number, data: IUpdateSubjectRequest): Promise<void> {
            const updatedSubject = await updateSubjectAsync(id, data);
            if (!updatedSubject || !this.subjects) return;
            const subjectIndex = this.subjects.findIndex((subject) => subject.id == id);
            if (subjectIndex == -1) return;
            this.subjects[subjectIndex] = updatedSubject;
        },
        async deleteSubject(id: number): Promise<void> {
            const response = await deleteSubjectAsync(id);
            if (response.statusCode == 200) this.subjects = this.subjects.filter((subject) => subject.id != id);
        }
    }
});