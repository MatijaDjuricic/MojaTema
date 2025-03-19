import { ref } from "vue"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useToastMessage } from "../../composables/utils/useToastMessage";
import {
    getUsersAsync,
    createUserAsync,
    importUserAsync,
    updateUserAsync,
    deleteUserAsync,
    getChatAvailableUsersAsync
} from "../../api/requests/user";
import { queryStaleTime } from "../../utils/constants";
import { IUpdateUserReqeust } from "../../types/interface";
export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => getUsersAsync(),
        staleTime: queryStaleTime.users
    });
}
export const useChatAvailableUsers = () => {
    return useQuery({
        queryKey: ['chatAvailableUsers'],
        queryFn: () => getChatAvailableUsersAsync(),
        staleTime: queryStaleTime.users
    });
}
export const useCreateUser = () => {
    const queryClient = useQueryClient();
    const { successMessage, errorMessage } = useToastMessage();
    return useMutation({
        mutationFn: async (data: IUpdateUserReqeust) => {
            if (!data.first_name || !data.last_name ||
                !data.email || !data.role
            ) {
                throw new Error("Поља форме су празна");
            }
            await createUserAsync(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['chatAvailableUsers'] });
            successMessage("Успешно додат корисник");
        }, onError: (error) => {
            errorMessage(error.message);
        },
    });
}
export const useImportUsers = () => {
    const queryClient = useQueryClient();
    const { successMessage, errorMessage } = useToastMessage();
    const fileInput = ref<HTMLInputElement | null>(null)
    const { mutate: importUsers } = useMutation({
        mutationFn: async () => {
            const file = fileInput.value?.files?.[0];
            if (!file) throw new Error("Молимо изаберите фајл");
            const formData = new FormData();
            formData.append('file', file);
            return await importUserAsync(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['chatAvailableUsers'] });
            successMessage("Успешно додат корисник");
        }, onError: (error) => {
            errorMessage(error.message);
        },
    });
    return { importUsers, fileInput };
}
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const { successMessage, errorMessage } = useToastMessage();
    return useMutation({
        mutationFn: async ({id, data}: { id: number, data: IUpdateUserReqeust }) => {
            await updateUserAsync(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['chatAvailableUsers'] });
            successMessage(`Успешно си изменио корисника`);
        },
        onError: () => errorMessage('Грешка при ажурирању корисника')
    });
}
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const { successMessage, errorMessage } = useToastMessage();
    return useMutation({
        mutationFn: deleteUserAsync,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['chatAvailableUsers'] });
            successMessage("Успешно си обрисао корисника");
        }, onError: (error) => {
            errorMessage(error.message);
        },
    });
}