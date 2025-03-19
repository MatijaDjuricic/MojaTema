import { defineStore } from 'pinia';
import { getAuthUserAsync } from '../api/requests/auth';
import { AuthState } from '../types/interface';
import { User } from '../types';
import { RoleEnum } from '../utils/enums';
export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: undefined,
    }),
    getters: {
        checkAuth(state): User | undefined {
            return state.user;
        },
        currentUser(state): User {
            if (!state.user) {
                throw new Error('User does not exist');
            }
            return state.user;
        },
        userRole(state): RoleEnum {
            if (!state.user) {
                throw new Error('User does not exist');
            }
            return state.user.role;
        }
    },
    actions: {
        setUser(user: User): void {
            this.user = user;
        },
        logout(): void {
            this.user = undefined;
        },
        async getAuthUser(): Promise<void> {
            try {
                this.user = await getAuthUserAsync();
            } catch (error) {
                this.user = undefined;
                console.error('Failed to fetch current user:', error);
            }
        }
    }
});