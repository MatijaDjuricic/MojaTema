import { ref } from "vue";
import { ICreateProfessorSubjectRequest,IUpdateProfessorSubjectRequest } from "../../types/interface";
import { ProfessorSubject } from "../../types";
const initialCreateProfessorSubjectState: ICreateProfessorSubjectRequest = {
    user_id: 0,
    subject_id: 0
};
const initialUpdatePofessorSubjectState: IUpdateProfessorSubjectRequest = {
    user_id: 0,
    subject_id: 0
};
export const useProfessorSubjectForm = () => {
    const createProfessorSubjectRef = ref<ICreateProfessorSubjectRequest>(initialCreateProfessorSubjectState);
    const updateProfessorSubjectRef = ref<IUpdateProfessorSubjectRequest>(initialUpdatePofessorSubjectState);
    const handleClear = () => {
        createProfessorSubjectRef.value = {
            user_id: 0,
            subject_id: 0
        };
    }
    const openEditModal = (id: number, professorSubjects: ProfessorSubject[] | undefined) => {
        if (!professorSubjects) return;
        const professorSubject = professorSubjects.find(professorSubject => professorSubject.id === id);
        if (!professorSubject) return;
        updateProfessorSubjectRef.value = {
            user_id: professorSubject.user_id,
            subject_id: professorSubject.subject_id
        };
    }
    return { createProfessorSubjectRef, updateProfessorSubjectRef, handleClear, openEditModal };
}