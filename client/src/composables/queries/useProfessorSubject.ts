import { ref } from "vue"
import { useAuthStore } from "../../stores/auth";
import { useToastMessage } from "../../composables/utils/useToastMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import {
    getProfessorSubjectsAsync,
    createProfessorSubjectAsync,
    updateProfessorSubjectAsync,
    importProfessorSubjectsAsync,
    deleteProfessorSubjectAsync,
    getProfessorSubjectByProfessorAsync,
} from "../../api/requests/professorSubject";
import { queryStaleTime } from "../../utils/constants";
import { ICreateProfessorSubjectRequest, IUpdateProfessorSubjectRequest } from "../../types/interface"
export const useProfessorSubjects = () => {
    return useQuery({
        queryKey: ['professorSubjects'],
        queryFn: () => getProfessorSubjectsAsync(),
        staleTime: queryStaleTime.professorSubjects
    });
}
export const useProfessorSubjectByProfessorId = () => {
    const currentUser = useAuthStore().currentUser;
    return useQuery({
        queryKey: ['professorSubjectByProfessorId'],
        queryFn: () => getProfessorSubjectByProfessorAsync(currentUser.id),
        staleTime: queryStaleTime.topics
    });
}
export const useCreateProfessorSubject = () => {
    const queryClient = useQueryClient();
    const { successMessage, errorMessage } = useToastMessage();
    return useMutation({
        mutationFn: async (data: ICreateProfessorSubjectRequest) => {
            if (!data.user_id || !data.subject_id) {
                throw new Error("Поља форме су празна");
            }
            await createProfessorSubjectAsync(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['professorSubjects'] });
            successMessage('Успешно сте додали професор-предмет');
        },
        onError: () => errorMessage('Грешка при додавању професор-предмета')
    });
}
export const useImportProfessorSubjects = () => {
    const queryClient = useQueryClient();
    const fileInput = ref<HTMLInputElement | null>(null)
    const { successMessage, errorMessage } = useToastMessage();
    const { mutate: importProfessorSubjects } = useMutation({
        mutationFn: async () => {
            const file = fileInput.value?.files?.[0];
            if (!file) throw new Error("Молимо изаберите фајл");
            const formData = new FormData();
            formData.append('file', file);
            return await importProfessorSubjectsAsync(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['professorSubjects'] });
            successMessage('Успешно сте додали професор-предмет');
        }, onError: (error) => {
            errorMessage(error.message);
        },
    });
    return { importProfessorSubjects, fileInput };
}
export const useUpdateProfessorSubject = () => {
    const queryClient = useQueryClient();
    const { successMessage, errorMessage } = useToastMessage();
    return useMutation({
        mutationFn: async ({ id, data }: { id: number, data: IUpdateProfessorSubjectRequest }) => {
            await updateProfessorSubjectAsync(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['professorSubjects'] });
            successMessage('Успешно сте изменили професор-предмет');
        },
        onError: () => errorMessage('Грешка при ажурирању професор-предмет')
    });
}
export const useDeleteProfessorSubject = () => {
    const queryClient = useQueryClient();
    const { successMessage, errorMessage } = useToastMessage();
    return useMutation({
        mutationFn: deleteProfessorSubjectAsync,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['professorSubjects'] });
            successMessage('Успешно сте обрисали професор-предмет');
        }, onError: (error) => {
            errorMessage(error.message);
        },
    });
}