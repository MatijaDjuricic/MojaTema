import { ref, type Ref } from "vue"
import { changePasswordAsync } from "../../api/requests/auth";
import { useToastMessage } from "../utils/useToastMessage";
interface IUseProfileForm {
    currentPassword: Ref<string>,
    newPassword: Ref<string>,
    confirmPassword: Ref<string>,
    passwordVisible: Ref<boolean>,
    loading: Ref<boolean>,
    togglePasswordVisibility: () => void,
    handleClear: () => void,
    handleSubmit: () => Promise<void>
}
export const useProfileForm = (): IUseProfileForm => {
    const { successMessage, errorMessage } = useToastMessage();
    const currentPassword = ref<string>('');
    const newPassword = ref<string>('');
    const confirmPassword = ref<string>('');
    const passwordVisible = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const togglePasswordVisibility = () => {
        passwordVisible.value = !passwordVisible.value;
    };
    const handleClear = () => {
        currentPassword.value = "";
        newPassword.value = "";
        confirmPassword.value = "";
    };
    const handleSubmit = async () => {
        if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
            errorMessage("Поља форме су празна");
            return;
        }
        if (currentPassword.value === newPassword.value) {
            errorMessage("Тренутна и нова лозинка се поклапају");
            return;
        }
        if (newPassword.value !== confirmPassword.value) {
            errorMessage("Нова и поновљена лозинка се непоклапају");
            return;
        }
        loading.value = true;
        await changePasswordAsync({
            'current_password': currentPassword.value,
            'new_password': newPassword.value,
            'new_password_confirmation': confirmPassword.value
        }).then((response) => {
            if (response) {
                successMessage("Успешно промењена лозинка");
            } else errorMessage("Лозинка није валидна");
        }).catch(() => {
            errorMessage("Грешка при промени лозинке");
        }).finally(() => {
            loading.value = false;
            handleClear();
        })
    }
    return {
        currentPassword,
        newPassword,
        confirmPassword,
        passwordVisible,
        loading,
        togglePasswordVisibility,
        handleClear,
        handleSubmit,
    };
}