import { ref, Ref } from "vue"
import { useToastMessage } from "../../composables/useToastMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import {
    createSubjectAsync,
    deleteSubjectAsync,
    getSubjectsAsync,
    getSubjectsByProfessorAsync,
    importSubjectsAsync,
    updateSubjectAsync
} from ".";
import { Subject } from "../../types"
import { ICreateSubjectRequest, IUpdateSubjectRequest } from "../../types/interface"
import { useAuthStore } from "../../stores/auth";
interface IUseSubjectQuery {
    subjects: Ref<Subject[] | undefined>,
    professorSubjects: Ref<Subject[] | undefined>,
    createSubjectRef: Ref<ICreateSubjectRequest>,
    updateSubjectRef: Ref<IUpdateSubjectRequest>,
    isLoadingSubjects: Ref<boolean>,
    isLoadingProfessorSubjects: Ref<boolean>,
    isSubmitLoading: Ref<boolean>,
    fileInput: Ref<HTMLInputElement | null>,
    openEditModal: (id: number) => void,
    handleClear: () => void,
    createSubject: () => void,
    importSubjects: () => void,
    updateSubject: (id: number) => void,
    deleteSubject: (id: number) => void
}
const initialCreateSubjectState: ICreateSubjectRequest = {
    title: "",
    class_year_id: 0,
};
const initialUpdateSubjectState: IUpdateSubjectRequest = {
    title: "",
    class_year_id: 0,
};
export const useSubjectQuery = (): IUseSubjectQuery => {
    const { successMessage, errorMessage } = useToastMessage();
    const queryClient = useQueryClient();
    const currentUser = useAuthStore().currentUser;
    const fileInput = ref<HTMLInputElement | null>(null)
    const createSubjectRef = ref<ICreateSubjectRequest>(initialCreateSubjectState);
    const updateSubjectRef = ref<IUpdateSubjectRequest>(initialUpdateSubjectState);
    const handleClear = () => {
        createSubjectRef.value = { ...initialCreateSubjectState };
        updateSubjectRef.value = { ...initialUpdateSubjectState };
    };
    const openEditModal = (id: number) => {
        const subject = subjects.value?.find(subject => subject.id === id);
        if (!subject) return;
        updateSubjectRef.value = {
            title: subject.title,
            class_year_id: subject.class_year_id,
        };
    }
    const { data: subjects, isLoading: isLoadingSubjects } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => getSubjectsAsync()
    });
    const { data: professorSubjects, isLoading: isLoadingProfessorSubjects } = useQuery({
        queryKey: ['professorTopics'],
        queryFn: () => getSubjectsByProfessorAsync(currentUser.id)
    });
    const { mutate: createSubject, isPending: isSubmitLoading } = useMutation({
        mutationFn: async () => {
            if (!createSubjectRef.value.title || !createSubjectRef.value.class_year_id) {
                throw new Error("Поља форме су празна");
            }
            await createSubjectAsync(createSubjectRef.value);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subjects'] });
            successMessage('Успешно сте додали предмет');
        },
        onError: () => errorMessage('Грешка при додавању предмета')
    });
    const { mutate: importSubjects } = useMutation({
        mutationFn: async () => {
            const file = fileInput.value?.files?.[0];
            if (!file) throw new Error("Молимо изаберите фајл");
            const formData = new FormData();
            formData.append('file', file);
            return await importSubjectsAsync(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subjects'] });
            successMessage('Успешно сте додали предмет');
        }, onError: (error) => {
            errorMessage(error.message);
        },
    });
    const { mutate: updateSubject } = useMutation({
        mutationFn: async (id: number) => {
            await updateSubjectAsync(id, {
                title: updateSubjectRef.value.title,
                class_year_id: updateSubjectRef.value.class_year_id,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subjects'] });
            successMessage('Успешно сте изменили предмет');
        },
        onError: () => errorMessage('Грешка при ажурирању предметa')
    });
    const { mutate: deleteSubject } = useMutation({
        mutationFn: deleteSubjectAsync,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subjects'] });
            successMessage('Успешно сте обрисали предмет');
        }
    });
    return {
        subjects,
        professorSubjects,
        createSubjectRef,
        updateSubjectRef,
        isLoadingSubjects,
        isLoadingProfessorSubjects,
        isSubmitLoading,
        fileInput,
        openEditModal,
        handleClear,
        createSubject,
        importSubjects,
        updateSubject,
        deleteSubject
    };
}