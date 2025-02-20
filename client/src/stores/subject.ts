import { defineStore } from 'pinia';
import { getSubjectsAsync, getSubjectsByProfessorAsync } from '../services/subject';
import type { SubjectState } from '../types/interface';
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
        }
    }
});