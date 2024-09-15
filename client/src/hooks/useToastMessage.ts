import { toast } from 'react-toastify';
export const useToastMessage = () => {
  const successMessage = (title: string) => toast.success(title);
  const errorMessage = (title: string) => toast.error(title);
  return { successMessage, errorMessage }
}