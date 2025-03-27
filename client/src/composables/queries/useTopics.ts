import { ref } from "vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useToastMessage } from "../../composables/utils/useToastMessage";
import { useAuthStore } from "../../stores/auth";
import {
    getTopicsAsync,
    createTopicAsync,
    importTopicsAsync,
    updateTopicAsync,
    deleteTopicAsync,
    getReportedTopicsAsync,
    updateTopicStatusAsync,
    getTopicsByProfessorAsync
} from "../../api/requests/topic";
import { queryStaleTime } from "../../utils/constants";
import { TopicStatusEnum } from "../../utils/enums";
import { ICreateTopicRequest, IUpdateTopicRequest } from "../../types/interface";
export const useTopics = () => {
    return useQuery({
        queryKey: ['topics'],
        queryFn: () => getTopicsAsync(),
        staleTime: queryStaleTime.topics
    });
};
export const useReportedTopics = () => {
    return useQuery({
        queryKey: ['reportedTopics'],
        queryFn: () => getReportedTopicsAsync(),
        staleTime: queryStaleTime.topics
    });
}
export const useProfessorTopics = () => {
    const currentUser = useAuthStore().currentUser;
    return useQuery({
        queryKey: ['professorTopics'],
        queryFn: () => getTopicsByProfessorAsync(currentUser.id),
        staleTime: queryStaleTime.topics
    });
}
export const useTopicsSearch = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (search: string) => {
            await getTopicsAsync(search);
        }, onSuccess: (_, param) => {
            queryClient.invalidateQueries({ queryKey: ['topics', param] });
        }
    });
};
export const useCreateTopic = () => {
    const queryClient = useQueryClient();
    const { successMessage, errorMessage } = useToastMessage();
    return useMutation({
        mutationFn: async (data: ICreateTopicRequest) => {
            if (!data.title || !data.description || !data.professor_subject_id) {
                throw new Error("Поља форме су празна");
            }
            await createTopicAsync(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['topics'] });
            queryClient.invalidateQueries({ queryKey: ['reportedTopics'] });
            queryClient.invalidateQueries({ queryKey: ['professorTopics'] });
            successMessage("Успешно додата тема");
        }, onError: (error) => {
            errorMessage(error.message);
        },
    });
}
export const useImportTopics = () => {
    const queryClient = useQueryClient();
    const { successMessage, errorMessage } = useToastMessage();
    const fileInput = ref<HTMLInputElement | null>(null)
    const { mutate: importTopics} = useMutation({
        mutationFn: async () => {
            const file = fileInput.value?.files?.[0];
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                return await importTopicsAsync(formData);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['topics'] });
            queryClient.invalidateQueries({ queryKey: ['reportedTopics'] });
            queryClient.invalidateQueries({ queryKey: ['professorTopics'] });
            successMessage("Успешно си увезао теме");
        }, onError: (error) => {
            errorMessage(error.message);
        },
    });
    return { importTopics, fileInput };
}
export const useUpdateTopicStatus = () => {
    const queryClient = useQueryClient();
    const { successMessage, errorMessage } = useToastMessage();
    return useMutation({
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
}
export const useUpdateTopic = () => {
    const queryClient = useQueryClient();
    const { successMessage, errorMessage } = useToastMessage();
    return useMutation({
        mutationFn: async ({ id, data }: {id: number, data: IUpdateTopicRequest }) => {
            await updateTopicAsync(id, data);
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
}
export const useDeleteTopic = () => {
    const queryClient = useQueryClient();
    const { successMessage, errorMessage } = useToastMessage();
    return useMutation({
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
}