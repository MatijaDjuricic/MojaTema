import { defineStore } from 'pinia';
import { deleteUserAsync, getChatAvailableUsersAsync, getUsersAsync, updateUserAsync } from '../services/user';
import type { IUpdateUserReqeust, UserState } from '../types/interface';
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
        async getUsers(): Promise<void> {
            const users = await getUsersAsync();
            if (users) this.users = users;
        },
        async getChatAvailableUsers(receiverId?: number): Promise<void> {
            const users = await getChatAvailableUsersAsync(receiverId);
            if (users) this.chatAvailableUsers = users;
        },
        async updateUser(id: number, data: IUpdateUserReqeust): Promise<void> {
            const updatedUser = await updateUserAsync(id, data);
            if (!updatedUser || !this.users) return;
            const userIndex = this.users.findIndex((user) => user.id == id);
            if (userIndex == -1) return;
            this.users[userIndex] = updatedUser;
        },
        async deleteUser(id: number): Promise<void> {
            const response = await deleteUserAsync(id);
            if (response.statusCode == 200) this.users = this.users.filter((user) => user.id != id);
        }
    }
});