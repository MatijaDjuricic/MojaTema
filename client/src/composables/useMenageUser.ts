import { ref, type Ref } from 'vue';
import { useToastMessage } from './useToastMessage';
import { useUserStore } from '../stores/user';
import { importUserAsync } from '../services/user';
interface IUseMenageUser {
    firstName: Ref<string>,
    lastName: Ref<string>,
    email: Ref<string>,
    role: Ref<number>,
    loading: Ref<boolean>,
    fileInput: Ref<HTMLInputElement | null>,
    handleClear: () => void,
    handleDelete: (id: number) => Promise<void>,
    handleEdit: (id: number) => Promise<void>,
    handleSubmit: () => Promise<void>,
    handleFileUpload: () => Promise<void>,
}
export const useMenageUser = (): IUseMenageUser => {
    const { successMessage, errorMessage } = useToastMessage();
    const userStore = useUserStore();
    const firstName = ref<string>("");
    const lastName = ref<string>("");
    const email = ref<string>("");
    const role = ref<number>(-1);
    const loading = ref<boolean>(false);
    const fileInput = ref<HTMLInputElement | null>(null);
    const handleClear = () => {
        firstName.value = "";
        lastName.value = "";
        email.value = "";
    };
    const handleDelete = async (id: number) => {
        await userStore.deleteUser(id).finally(() => {
            successMessage(`Успешно си обрисао корисника`);
        });
    }
    const handleEdit = async (id: number) => {
        const user = userStore.users.find(u => u.id === id);
        if (!user) return;
        await userStore.updateUser(id, {
            "first_name": user.firstName,
            "last_name": user.lastName,
            "email": user.email,
            "role": user.role,
        }).finally(() => successMessage(`Успешно си изменио корисника`));
    }
    const handleSubmit = async () => {
        if (!firstName.value || !lastName.value || !email.value || role.value === -1) {
            errorMessage("Поља форме су празна");
            return;
        }
        loading.value = true;
        await userStore.createUser({
            first_name: firstName.value.trim(),
            last_name: lastName.value.trim(),
            role: Number(role.value),
            email: email.value.trim()
        }).finally(() => {
            loading.value = false;
            handleClear();
            successMessage("Успешно додат корисник");
        });
    };
    const handleFileUpload = async () => {
        const file = fileInput.value?.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                loading.value = true;
                await importUserAsync(formData);
                successMessage('Фајл успешно увезен');
            } catch (error) {
                errorMessage('Грешка при учитавању фајла');
            } finally {
                loading.value = false;
            }
        } else {
            errorMessage('Молимо изаберите фајл');
        }
    };
    return {
        firstName,
        lastName,
        email,
        role,
        fileInput,
        loading,
        handleClear,
        handleDelete,
        handleEdit,
        handleSubmit,
        handleFileUpload,
    };
};