import { defineStore } from 'pinia';
import {
    createTopicAsync,
    deleteTopicAsync,
    getTopicsAsync,
    getTopicsByProfessorAsync,
    updateTopicStatusByProfessorAsync,
    updateTopicStatusByStudentAsync
} from '../services/topic';
import { useAuthStore as auth } from './auth';
import type { ICreateTopicRequest, TopicState } from '../types/interface';
export const useTopicStore = defineStore('topic', {
    state: (): TopicState => ({
        topics: [],
    }),
    getters: {
        isReportedTopic(state): boolean {
            if (!state.topics) return false;
            for (const topic of state.topics) {
                if (topic.student != null && topic.student.userId == auth().currentUser.id) {
                    return true;
                }
            }
            return false;
        }
    },
    actions: {
        async getTopics(search?: string): Promise<void> {
            const topics = await getTopicsAsync(search);
            if (topics) this.topics = topics;
        },
        async getTopicsByProfessor(): Promise<void> {
            const topics = await getTopicsByProfessorAsync(auth().currentUser.id);
            if (topics) this.topics = topics;
        },
        async createTopic(data: ICreateTopicRequest): Promise<void> {
            const createdTopic = await createTopicAsync(data);
            if (createdTopic) this.topics.push(createdTopic);
        },
        async updateTopicStatusByStudent(id: number, status: number): Promise<void> {
            const updatedTopic = await updateTopicStatusByStudentAsync(id, status);
            if (updatedTopic && this.topics) {
                const topicIndex = this.topics.findIndex((topic) => topic.id == id);
                if (topicIndex != -1) {
                    this.topics[topicIndex] = updatedTopic;
                }
            }
        },
        async updateTopicStatusByProfessor(id: number, status: number): Promise<void> {
            const updatedTopic = await updateTopicStatusByProfessorAsync(id, status);
            if (updatedTopic && this.topics) {
                const topicIndex = this.topics.findIndex((topic) => topic.id == id);
                if (topicIndex != -1) {
                    this.topics[topicIndex] = updatedTopic;
                }
            }
        },
        async deleteTopic(id: number): Promise<void> {
            const response = await deleteTopicAsync(id);
            if (response.statusCode == 200) this.topics = this.topics.filter((topic) => topic.id != id);
        }
    }
});