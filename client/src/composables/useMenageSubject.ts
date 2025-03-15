import { ref, type Ref } from 'vue';
import { useToastMessage } from './useToastMessage';
import { useSubjectStore } from '../stores/subject';
import { importSubjectsAsync } from '../services/subject';
interface IUseMenageSubject {
    title: Ref<string>,
    classYearId: Ref<number>,
    loading: Ref<boolean>,
    fileInput: Ref<HTMLInputElement | null>,
    handleClear: () => void,
    handleSubmit: () => Promise<void>,
    handleEdit: (id: number) => Promise<void>,
    handleFileUpload: () => Promise<void>,
}
export const useMenageSubject = (): IUseMenageSubject => {
    const { successMessage, errorMessage } = useToastMessage();
    const subjectStore = useSubjectStore();
    const title = ref<string>("");
    const classYearId = ref<number>(-1);
    const loading = ref<boolean>(false);
    const fileInput = ref<HTMLInputElement | null>(null);
    const handleClear = () => {
        title.value = "";
        classYearId.value = -1;
    };
    const handleSubmit = async () => {
        if (!title.value || !classYearId.value) {
            errorMessage("Поља форме су празна");
            return;
        }
        loading.value = true;
        await subjectStore.createSubject({
            title: title.value.trim(),
            class_year_id: classYearId.value,
        }).finally(() => {
            loading.value = false;
            handleClear();
            successMessage("Успешно додата тема");
        });
    };
    const handleFileUpload = async () => {
        const file = fileInput.value?.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                loading.value = true;
                await importSubjectsAsync(formData);
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
    const handleEdit = async (id: number) => {
        const subject = subjectStore.subjects.find(s => s.id === id);
        if (subject) {
            await subjectStore.updateSubject(id, {
                'title': subject.title,
                'class_year_id': subject.class_year_id,
            }).finally(() => {
                successMessage(`Успешно си изменио предмет`);
            });
        }
    }
    return {
        title,
        classYearId,
        loading,
        fileInput,
        handleClear,
        handleSubmit,
        handleFileUpload,
        handleEdit
    };
}