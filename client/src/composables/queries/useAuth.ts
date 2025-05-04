import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useAuthStore } from '../../stores/auth';
import { useToastMessage } from '../utils/useToastMessage';
import { fetchCsrfTokenAsync } from '../../api/requests/auth';
import { ILoginRequest } from '../../types/interface';
export const useAuth = () => {
    const { successMessage, errorMessage } = useToastMessage();
    const queryClient = useQueryClient();
    const router = useRouter();
    const authStore = useAuthStore();
    const { mutate: login, isPending: isSubmitLoading } = useMutation({
        mutationFn: async (credentials: ILoginRequest): Promise<void> => {
            await fetchCsrfTokenAsync();
            await authStore.login(credentials);
        },
        onSuccess: (): void => {
            queryClient.invalidateQueries({queryKey: ['currentUser']});
            successMessage("Успешно пријављивање");
            router.push('/');
        },
        onError: (): void => {
            errorMessage("Грешка при пријављивању");
        }
    });
    const { mutate: logout } = useMutation({
        mutationFn: async (): Promise<void> => {
            await authStore.logout();
        },
        onSuccess: (): void => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
            successMessage("Успешно одјављивање");
            router.push('/login');
        },
        onError: (): void => {
            errorMessage("Грешка при одјављивању");
        }
    });
    return { login, isSubmitLoading, logout };
};