import { ref, type Ref } from 'vue';
import { importTopicsAsync } from '../services/topic';
import { getSubjectsByProfessorAsync } from '../services/subject';
import { useToastMessage } from './useToastMessage';
import { useTopicStore } from '../stores/topic';
import { useAuthStore } from '../stores/auth';
import type { Subject } from '../types';
interface IUseCreateTopic {
    title: Ref<string>,
    description: Ref<string>,
    loading: Ref<boolean>,
    subjectId: Ref<number>,
    fileInput: Ref<HTMLInputElement | null>,
    defaultSubject: Ref<Subject | null>,
    subjects: Ref<Subject[]>,
    handleClear: () => void,
    handleSubmit: () => Promise<void>,
    handleFileUpload: () => Promise<void>,
    fetchSubjects: () => Promise<void>
}
export const useCreateTopic = (): IUseCreateTopic => {
    const { successMessage, errorMessage } = useToastMessage();
    const topicStore = useTopicStore();
    const authStore = useAuthStore();
    const title = ref<string>("");
    const description = ref<string>("");
    const subjectId = ref<number>(-1);
    const loading = ref<boolean>(false);
    const fileInput = ref<HTMLInputElement | null>(null);
    const defaultSubject = ref<Subject | null>(null);
    const subjects = ref<Subject[]>([]);
    const handleClear = () => {
        title.value = "";
        description.value = "";
    };
    const handleSubmit = async () => {
        if (title.value && description.value && subjectId.value !== -1) {
            loading.value = true;
            await topicStore.createTopic({
                title: title.value.trim(),
                description: description.value.trim(),
                subjectId: subjectId.value
            }).finally(() => {
                loading.value = false;
                handleClear();
                successMessage("Успешно додата тема");
            });
        } else {
            errorMessage("Поља форме су празна");
        }
    };
    const handleFileUpload = async () => {
        const file = fileInput.value?.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                loading.value = true;
                await importTopicsAsync(formData);
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
    const fetchSubjects = async () => {
        const response = await getSubjectsByProfessorAsync(authStore.currentUser.id);
        if (response) {
            subjects.value = response;
            defaultSubject.value = response[0];
            subjectId.value = defaultSubject.value.id;
        }
    };
    return {
        title,
        description,
        loading,
        subjectId,
        fileInput,
        defaultSubject,
        subjects,
        handleClear,
        handleSubmit,
        handleFileUpload,
        fetchSubjects
    };
};