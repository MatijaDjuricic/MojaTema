import { ref } from "vue"
import { useToastMessage } from "../../composables/utils/useToastMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useAuthStore } from "../../stores/auth";
import {
    createSubjectAsync,
    deleteSubjectAsync,
    getSubjectsAsync,
    getSubjectsByProfessorAsync,
    importSubjectsAsync,
    updateSubjectAsync
} from "../../api/requests/subject";
import { queryStaleTime } from "../../utils/constants";
import { ICreateSubjectRequest, IUpdateSubjectRequest } from "../../types/interface"
export const useSubjects = () => {
    return useQuery({
        queryKey: ['subjects'],
        queryFn: () => getSubjectsAsync(),
        staleTime: queryStaleTime.subjects
    });
}
export const useProfessorSubjects = () => {
    const currentUser = useAuthStore().currentUser;
    return useQuery({
        queryKey: ['professorTopics'],
        queryFn: () => getSubjectsByProfessorAsync(currentUser.id),
        staleTime: queryStaleTime.subjects
    });
}
export const useCreateSubject = () => {
    const queryClient = useQueryClient();
    const { successMessage, errorMessage } = useToastMessage();
    return useMutation({
        mutationFn: async (data: ICreateSubjectRequest) => {
            if (!data.title || !data.class_year_id) {
                throw new Error("Поља форме су празна");
            }
            await createSubjectAsync(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subjects'] });
            successMessage('Успешно сте додали предмет');
        },
        onError: () => errorMessage('Грешка при додавању предмета')
    });
}
export const useImportSubjects = () => {
    const queryClient = useQueryClient();
    const fileInput = ref<HTMLInputElement | null>(null)
    const { successMessage, errorMessage } = useToastMessage();
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
    return { importSubjects, fileInput };
}
export const useUpdateSubject = () => {
    const queryClient = useQueryClient();
    const { successMessage, errorMessage } = useToastMessage();
    return useMutation({
        mutationFn: async ({id, data}: { id: number, data: IUpdateSubjectRequest }) => {
            await updateSubjectAsync(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subjects'] });
            successMessage('Успешно сте изменили предмет');
        },
        onError: () => errorMessage('Грешка при ажурирању предметa')
    });
}
export const useDeleteSubject = () => {
    const queryClient = useQueryClient();
    const { successMessage, errorMessage } = useToastMessage();
    return useMutation({
        mutationFn: deleteSubjectAsync,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subjects'] });
            successMessage('Успешно сте обрисали предмет');
        }, onError: (error) => {
            errorMessage(error.message);
        },
    });
}