import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
interface IUseLoginForm {
  email: Ref<string>,
  password: Ref<string>,
  passwordVisible: Ref<boolean>,
  loading: Ref<boolean>,
  togglePasswordVisibility: () => void,
  handleSubmit: () => Promise<void>
}
export const useLoginForm = (): IUseLoginForm => {
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
    loading.value = true;
    await authStore.login({
      'email': email.value,
      'password': password.value
    }).finally(() => loading.value = false);
    router.push('/');
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