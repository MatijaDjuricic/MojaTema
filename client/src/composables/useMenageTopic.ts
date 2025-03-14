import { ref, type Ref } from 'vue';
import { importTopicsAsync } from '../services/topic';
import { getSubjectsByProfessorAsync } from '../services/subject';
import { useToastMessage } from './useToastMessage';
import { useTopicStore } from '../stores/topic';
import { useAuthStore } from '../stores/auth';
import type { Subject } from '../types';
interface IUseMenageTopic {
    title: Ref<string>,
    description: Ref<string>,
    loading: Ref<boolean>,
    subjectId: Ref<number>,
    studentId: Ref<number | null>,
    professorId: Ref<number | null>,
    fileInput: Ref<HTMLInputElement | null>,
    defaultSubject: Ref<Subject | null>,
    subjects: Ref<Subject[]>,
    handleClear: () => void,
    handleSubmit: () => Promise<void>,
    handleEdit: (id: number) => Promise<void>,
    handleFileUpload: () => Promise<void>,
    fetchSubjects: () => Promise<void>
}
export const useMenageTopic = (): IUseMenageTopic => {
    const { successMessage, errorMessage } = useToastMessage();
    const topicStore = useTopicStore();
    const authStore = useAuthStore();
    const title = ref<string>("");
    const description = ref<string>("");
    const subjectId = ref<number>(-1);
    const studentId = ref<number | null>(null);
    const professorId = ref<number | null>(null);
    const loading = ref<boolean>(false);
    const fileInput = ref<HTMLInputElement | null>(null);
    const defaultSubject = ref<Subject | null>(null);
    const subjects = ref<Subject[]>([]);
    const handleClear = () => {
        title.value = "";
        description.value = "";
    };
    const handleSubmit = async () => {
        if (!title.value || !description.value || subjectId.value === -1) {
            errorMessage("Поља форме су празна");
            return;
        }
        loading.value = true;
        await topicStore.createTopic({
            title: title.value.trim(),
            description: description.value.trim(),
            subject_id: subjectId.value,
            professor_id: professorId.value,
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
    const handleEdit = async (id: number) => {
        const topic = topicStore.topics.find(t => t.id === id);
        if (topic) {
            await topicStore.updateTopic(id, {
                "title": topic.title,
                "description": topic.description,
                "status": Number(topic.status),
                "subject_id": topic.subject.id,
                "professor_id": topic.professor.userId,
                "student_user_id": studentId.value
            }).finally(() => {
                successMessage(`Успешно си изменио тему`);
            });
        }
    };
    return {
        title,
        description,
        loading,
        subjectId,
        studentId,
        professorId,
        fileInput,
        defaultSubject,
        subjects,
        handleClear,
        handleSubmit,
        handleEdit,
        handleFileUpload,
        fetchSubjects
    };
};