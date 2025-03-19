import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useAuthStore } from '../../stores/auth';
import { fetchCsrfTokenAsync, loginAsync, logoutAsync } from '../../api/requests/auth';
import { ILoginRequest, ILoginResponse } from '../../types/interface';
import { useToastMessage } from '../utils/useToastMessage';
import { useRouter } from 'vue-router';
export const useAuth = () => {
    const { successMessage, errorMessage } = useToastMessage();
    const queryClient = useQueryClient();
    const router = useRouter();
    const authStore = useAuthStore();
    const { mutate: login, isPending: isSubmitLoading } = useMutation({
        mutationFn: async (credentials: ILoginRequest): Promise<ILoginResponse> => {
            await fetchCsrfTokenAsync();
            const response = await loginAsync(credentials);
            return response;
        },
        onSuccess: (data: ILoginResponse) => {
            queryClient.invalidateQueries({queryKey: ['currentUser']});
            authStore.setUser(data.user);
            successMessage("Успешно пријављивање");
            router.push('/');
        },
        onError: () => {
            errorMessage("Грешка при пријављивању");
        }
    });
    const { mutate: logout } = useMutation({
        mutationFn: async () => {
            await logoutAsync();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
            authStore.logout();
            successMessage("Успешно одјављивање");
            router.push('/login');
        },
        onError: () => {
            errorMessage("Грешка при одјављивању");
        }
    });
    return { login, isSubmitLoading, logout };
};