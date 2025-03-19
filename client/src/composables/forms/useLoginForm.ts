import { ref } from 'vue';
import { useToastMessage } from '../utils/useToastMessage';
import { useAuth } from '../queries/useAuth';
export const useLoginForm = ()  => {
  const { errorMessage } = useToastMessage();
  const { login, isSubmitLoading } = useAuth();
  const email = ref<string>('');
  const password = ref<string>('');
  const passwordVisible = ref<boolean>(false);
  const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
  };
  const handleSubmit = () => {
    if (!email.value || !password.value) {
      errorMessage("Поља форме су празна");
      return;
    }
    login({
      'email': email.value,
      'password': password.value
    });
  }
  return {
    email,
    password,
    passwordVisible,
    isSubmitLoading,
    togglePasswordVisibility,
    handleSubmit
  };
};