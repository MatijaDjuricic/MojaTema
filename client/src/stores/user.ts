import { defineStore } from 'pinia';
import { getChatAvailableUsersAsync } from '../services/user';
import type { UserState } from '../types/interface';
import type { User } from '../types';
export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        users: [],
        chatAvailableUsers: []
    }),
    actions: {
        isUserChatAvailable(id: number): boolean {
            return this.chatAvailableUsers.some(user => user.id == id)
        },
        getUserChatAvailable(id: number): User | undefined {
            return this.chatAvailableUsers.find(user => user.id == id)
        },
        async getChatAvailableUsers(receiverId?: number): Promise<void> {
            const users = await getChatAvailableUsersAsync(receiverId);
            if (users) this.chatAvailableUsers = users;
        },
    }
});