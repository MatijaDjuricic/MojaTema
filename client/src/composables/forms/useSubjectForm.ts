import { ref } from "vue";
import { ICreateSubjectRequest, IUpdateSubjectRequest } from "../../types/interface";
import { Subject } from "../../types";
const initialCreateSubjectState: ICreateSubjectRequest = {
    title: "",
    class_year_id: 0,
};
const initialUpdateSubjectState: IUpdateSubjectRequest = {
    title: "",
    class_year_id: 0,
};
export const useSubjectForm = () => {
    const createSubjectRef = ref<ICreateSubjectRequest>(initialCreateSubjectState);
    const updateSubjectRef = ref<IUpdateSubjectRequest>(initialUpdateSubjectState);
    const handleClear = () => {
        createSubjectRef.value = {
            title: "",
            class_year_id: 0,
        }
    }
    const openEditModal = (id: number, subjects: Subject[] | undefined) => {
        if (!subjects) return;
        const subject = subjects.find(subject => subject.id === id);
        if (!subject) return;
        updateSubjectRef.value = {
            title: subject.title,
            class_year_id: subject.class_year_id,
        };
    }
    return { createSubjectRef, updateSubjectRef, handleClear, openEditModal };
}