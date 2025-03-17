import { ref, type Ref } from "vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useToastMessage } from "../../composables/useToastMessage";
import { getSubjectsAsync } from "../subject";
import { getUsersAsync } from "../user";
import {
    getTopicsAsync,
    createTopicAsync,
    importTopicsAsync,
    updateTopicAsync,
    deleteTopicAsync,
    getReportedTopicsAsync,
    updateTopicStatusAsync,
    getTopicsByProfessorAsync
} from ".";
import { Subject, Topic, User } from "../../types";
import { ICreateTopicRequest, IUpdateTopicRequest } from "../../types/interface";
import { TopicStatusEnum } from "../../utils/enums";
import { useAuthStore } from "../../stores/auth";
interface IUseTopicQuery {
    topics: Ref<Topic[] | undefined>,
    reportedTopics: Ref<Topic[] | undefined>,
    professorTopics: Ref<Topic[] | undefined>,
    subjects: Ref<Subject[] | undefined>,
    users: Ref<User[] | undefined>,
    createTopicRef: Ref<ICreateTopicRequest>,
    updateTopicRef: Ref<IUpdateTopicRequest>,
    isLoadingTopics: Ref<boolean>,
    isLoadingTopicStatus: Ref<boolean>,
    isLoadingReportedTopics: Ref<boolean>,
    isLoadingProfessorTopics: Ref<boolean>,
    isSubmitLoading: Ref<boolean>,
    fileInput: Ref<HTMLInputElement | null>,
    searchValue: Ref<string>,
    openEditModal: (id: number) => void,
    handleClear: () => void,
    createTopic: () => void,
    importTopics: () => void
    updateTopicStatus: ({ id, status }: { id: number, status: TopicStatusEnum }) => void,
    updateTopic: (id: number) => void,
    deleteTopic: (id: number) => void,
}
const initialCreateTopicState: ICreateTopicRequest = {
    title: "",
    description: "",
    subject_id: 0,
    professor_id: 0
};
const initialUpdateTopicState: IUpdateTopicRequest = {
    title: "",
    description: "",
    status: 0,
    subject_id: 0,
    professor_id: 0,
    student_user_id: 0
};
export const useTopicQuery = (): IUseTopicQuery => {
    const { successMessage, errorMessage } = useToastMessage();
    const queryClient = useQueryClient();
    const currentUser = useAuthStore().currentUser;
    const fileInput = ref<HTMLInputElement | null>(null);
    const searchValue = ref<string>('');
    const createTopicRef = ref<ICreateTopicRequest>(initialCreateTopicState);
    const updateTopicRef = ref<IUpdateTopicRequest>(initialUpdateTopicState);
    const handleClear = () => {
        createTopicRef.value = { ...initialCreateTopicState };
        updateTopicRef.value = { ...initialUpdateTopicState };
    };
    const openEditModal = (id: number) => {
        const topic = topics.value?.find(topic => topic.id === id);
        if (!topic) return;
        updateTopicRef.value = {
            title: topic.title,
            description: topic.description,
            status: topic.status,
            subject_id: topic.subject.id,
            professor_id: topic.professor.userId,
            student_user_id: topic.student ? topic.student.userId : 0
        };
    }
    const { data: topics, isLoading: isLoadingTopics } = useQuery({
        queryKey: ['topics', searchValue],
        queryFn: () => getTopicsAsync(searchValue.value)
    });
    const { data: subjects } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => getSubjectsAsync()
    });
    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsersAsync()
    });
    const { data: reportedTopics, isLoading: isLoadingReportedTopics } = useQuery({
        queryKey: ['reportedTopics'],
        queryFn: () => getReportedTopicsAsync()
    });
    const { data: professorTopics, isLoading: isLoadingProfessorTopics } = useQuery({
        queryKey: ['professorTopics'],
        queryFn: () => getTopicsByProfessorAsync(currentUser.id)
    });
    const { mutate: createTopic, isPending: isSubmitLoading } = useMutation({
        mutationFn: async () => {
            if (!createTopicRef.value.title || !createTopicRef.value.description || !createTopicRef.value.subject_id) {
                throw new Error("Поља форме су празна");
            }
            await createTopicAsync({
                title: createTopicRef.value.title.trim(),
                description: createTopicRef.value.description.trim(),
                subject_id: createTopicRef.value.subject_id,
                professor_id: createTopicRef.value.professor_id,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['topics'] });
            queryClient.invalidateQueries({ queryKey: ['reportedTopics'] });
            queryClient.invalidateQueries({ queryKey: ['professorTopics'] });
            handleClear();
            successMessage("Успешно додата тема");
        }, onError: (error) => {
            errorMessage(error.message);
        },
    });
    const { mutate: importTopics } = useMutation({
        mutationFn: async () => {
            const file = fileInput.value?.files?.[0];
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                return await importTopicsAsync(formData);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['topics'] })
            successMessage("Успешно си увезао теме");
        }, onError: (error) => {
            errorMessage(error.message);
        },
    });
    const { mutate: updateTopicStatus, isPending: isLoadingTopicStatus } = useMutation({
        mutationFn: async ({ id, status }: { id: number, status: TopicStatusEnum }) => {
            await updateTopicStatusAsync(id, status);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['topics'] });
            queryClient.invalidateQueries({ queryKey: ['reportedTopics'] });
            queryClient.invalidateQueries({ queryKey: ['professorTopics'] });
            successMessage("Успешно си ажурирао статус теме");
        }, onError: (error) => {
            errorMessage(error.message);
        }
    });
    const { mutate: updateTopic } = useMutation({
        mutationFn: async (id: number) => {
            await updateTopicAsync(id, {
                title: updateTopicRef.value.title.trim(),
                description: updateTopicRef.value.description.trim(),
                subject_id: updateTopicRef.value.subject_id,
                status: Number(updateTopicRef.value.status),
                professor_id: updateTopicRef.value.professor_id,
                student_user_id: updateTopicRef.value.student_user_id,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['topics'] });
            queryClient.invalidateQueries({ queryKey: ['reportedTopics'] });
            queryClient.invalidateQueries({ queryKey: ['professorTopics'] });
            successMessage("Успешно си ажурирао тему");
        }, onError: (error) => {
            errorMessage(error.message);
        },
    });
    const { mutate: deleteTopic } = useMutation({
        mutationFn: deleteTopicAsync,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['topics'] });
            queryClient.invalidateQueries({ queryKey: ['reportedTopics'] });
            queryClient.invalidateQueries({ queryKey: ['professorTopics'] });
            successMessage("Успешно си обрисао тему");
        }, onError: (error) => {
            errorMessage(error.message);
        },
    });
    return {
        topics,
        reportedTopics,
        professorTopics,
        subjects,
        users,
        createTopicRef,
        updateTopicRef,
        isLoadingTopics,
        isLoadingTopicStatus,
        isLoadingReportedTopics,
        isLoadingProfessorTopics,
        isSubmitLoading,
        fileInput,
        searchValue,
        openEditModal,
        createTopic,
        handleClear,
        deleteTopic,
        updateTopicStatus,
        updateTopic,
        importTopics
    }
}