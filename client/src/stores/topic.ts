import { defineStore } from 'pinia';
import {
    getTopicsAsync,
    getReportedTopicsAsync,
    getTopicsByProfessorAsync,
    createTopicAsync,
    updateTopicAsync,
    updateTopicStatusAsync,
    deleteTopicAsync
} from '../services/topic';
import { useAuthStore as auth } from './auth';
import type { ICreateTopicRequest, IUpdateTopicRequest, TopicState } from '../types/interface';
export const useTopicStore = defineStore('topic', {
    state: (): TopicState => ({
        topics: [],
        reported: []
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
        async getReportedTopics(): Promise<void> {
            const topics = await getReportedTopicsAsync();
            if (topics) this.reported = topics;
        },
        async getTopicsByProfessor(): Promise<void> {
            const topics = await getTopicsByProfessorAsync(auth().currentUser.id);
            if (topics) this.topics = topics;
        },
        async createTopic(data: ICreateTopicRequest): Promise<void> {
            const createdTopic = await createTopicAsync(data);
            if (createdTopic) this.topics.push(createdTopic);
        },
        async updateTopic(id: number, data: IUpdateTopicRequest): Promise<void> {
            const updatedTopic = await updateTopicAsync(id, data);
            if (!updatedTopic || !this.topics) return;
            const topicIndex = this.topics.findIndex((topic) => topic.id == id);
            if (topicIndex == -1) return;
            this.topics[topicIndex] = updatedTopic;
        },
        async updateTopicStatus(id: number, status: number): Promise<void> {
            const updatedTopic = await updateTopicStatusAsync(id, status);
            if (!updatedTopic || !this.topics) return;
            const topicIndex = this.topics.findIndex((topic) => topic.id == id);
            if (topicIndex == -1) return;
            this.topics[topicIndex] = updatedTopic;
            if (updatedTopic.student != null) this.reported.push(updatedTopic)
            else this.reported = this.reported.filter((topic) => topic.id != updatedTopic.id)
        },
        async deleteTopic(id: number): Promise<void> {
            const response = await deleteTopicAsync(id);
            if (response.statusCode == 200) this.topics = this.topics.filter((topic) => topic.id != id);
        }
    }
});