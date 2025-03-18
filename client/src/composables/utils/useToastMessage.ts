import { useToast } from 'vue-toastification';
export const useToastMessage = (timeout: number = 2000) => {
  const toast = useToast();
  const successMessage = (title: string) => toast.success(title, { timeout });
  const errorMessage = (title: string) => toast.error(title, { timeout });
  return { successMessage, errorMessage };
}