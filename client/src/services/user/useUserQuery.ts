import { ref, Ref } from "vue"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useToastMessage } from "../../composables/useToastMessage";
import {
    getUsersAsync,
    createUserAsync,
    importUserAsync,
    updateUserAsync,
    deleteUserAsync,
    getChatAvailableUsersAsync
} from ".";
import { User } from "../../types"
import { IUpdateUserReqeust } from "../../types/interface";
interface IUseUserQuery {
    users: Ref<User[] | undefined>,
    chatAvailableUsers: Ref<User[] | undefined>,
    createUserRef: Ref<IUpdateUserReqeust>,
    updateUserRef: Ref<IUpdateUserReqeust>,
    isLoadingUsers: Ref<boolean>,
    isLoadingChatAvailableUsers: Ref<boolean>,
    isSubmitLoading: Ref<boolean>,
    fileInput: Ref<HTMLInputElement | null>,
    handleClear: () => void,
    openEditModal: (id: number) => void,
    createUser: () => void,
    importUsers: () => void,
    updateUser: (id: number) => void,
    deleteUser: (id: number) => void
}
const initialUserState: IUpdateUserReqeust = {
    first_name: "",
    last_name: "",
    email: "",
    role: 0,
};
export const useUserQuery = (): IUseUserQuery => {
    const { successMessage, errorMessage } = useToastMessage();
    const queryClient = useQueryClient();
    const fileInput = ref<HTMLInputElement | null>(null)
    const createUserRef = ref<IUpdateUserReqeust>(initialUserState);
    const updateUserRef = ref<IUpdateUserReqeust>(initialUserState);
    const handleClear = () => {
        createUserRef.value = { ...initialUserState };
        updateUserRef.value = { ...initialUserState };
    };
    const openEditModal = (id: number) => {
        const user = users.value?.find(user => user.id === id);
        if (!user) return;
        updateUserRef.value = {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            role: user.role,
        };
    }
    const { data: users, isLoading: isLoadingUsers } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsersAsync()
    });
    const { data: chatAvailableUsers, isLoading: isLoadingChatAvailableUsers } = useQuery({
        queryKey: ['chatAvailableUsers'],
        queryFn: () => getChatAvailableUsersAsync(),
    });
    const { mutate: createUser, isPending: isSubmitLoading } = useMutation({
        mutationFn: async () => {
            if (!createUserRef.value.first_name || !createUserRef.value.last_name ||
                !createUserRef.value.email || !createUserRef.value.role
            ) {
                throw new Error("Поља форме су празна");
            }
            await createUserAsync({
                first_name: createUserRef.value.first_name,
                last_name: createUserRef.value.last_name,
                email: createUserRef.value.email,
                role: createUserRef.value.role,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            handleClear();
            successMessage("Успешно додат корисник");
        }, onError: (error) => {
            errorMessage(error.message);
        },
    });
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
            successMessage("Успешно додат корисник");
        }, onError: (error) => {
            errorMessage(error.message);
        },
    });
    const { mutate: updateUser } = useMutation({
        mutationFn: async (id: number) => {
            await updateUserAsync(id, {
                first_name: updateUserRef.value.first_name,
                last_name: updateUserRef.value.last_name,
                email: updateUserRef.value.email,
                role: updateUserRef.value.role,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            successMessage(`Успешно си изменио корисника`);
        },
        onError: () => errorMessage('Грешка при ажурирању корисника')
    });
    const { mutate: deleteUser } = useMutation({
        mutationFn: deleteUserAsync,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            successMessage("Успешно си обрисао корисника");
        }, onError: (error) => {
            errorMessage(error.message);
        },
    });
    return {
        users,
        chatAvailableUsers,
        createUserRef,
        updateUserRef,
        isLoadingUsers,
        isLoadingChatAvailableUsers,
        isSubmitLoading,
        fileInput,
        handleClear,
        openEditModal,
        createUser,
        importUsers,
        updateUser,
        deleteUser,
    }
}