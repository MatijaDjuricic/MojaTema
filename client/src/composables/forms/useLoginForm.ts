import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useToastMessage } from '../utils/useToastMessage';
interface IUseLoginForm {
  email: Ref<string>,
  password: Ref<string>,
  passwordVisible: Ref<boolean>,
  loading: Ref<boolean>,
  togglePasswordVisibility: () => void,
  handleSubmit: () => Promise<void>
}
export const useLoginForm = (): IUseLoginForm => {
  const { successMessage, errorMessage } = useToastMessage();
  const router = useRouter();
  const authStore = useAuthStore();
  const email = ref<string>('');
  const password = ref<string>('');
  const passwordVisible = ref<boolean>(false);
  const loading = ref<boolean>(false);
  const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
  };
  const handleSubmit = async () => {
    if (!email.value || !password.value) {
      errorMessage("Поља форме су празна");
      return;
    }
    loading.value = true;
    await authStore.login({
      'email': email.value,
      'password': password.value
    }).then((response) => {
      if (response) {
        successMessage("Успешно пријављивање");
      } else errorMessage("Грешка при пријављивању");
    }).finally(() => {
      loading.value = false;
      router.push('/');
    });
  }
  return {
    email,
    password,
    passwordVisible,
    loading,
    togglePasswordVisibility,
    handleSubmit,
  };
};