import { defineStore } from 'pinia';
import { getMessagesAsync, getMessagesByUserAsync } from '../services/message';
import type { MessageState } from '../types/interface';
import type { Message } from '../types';
export const useMessageStore = defineStore('subject', {
    state: (): MessageState => ({
        messages: [],
    }),
    actions: {
        addMessage(message: Message) {
            this.messages.push(message);
        },
        async getMessages(): Promise<void> {
            const messages = await getMessagesAsync();
            if (messages) this.messages = messages;
        },
        async getMessagesByUser(senderId: number, receiverId: number): Promise<void> {
            const messages = await getMessagesByUserAsync(senderId, receiverId);
            this.messages = messages ? messages : [];
        }
    }
});