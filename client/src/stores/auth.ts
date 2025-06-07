import { defineStore } from 'pinia';
import { getAuthUserAsync, loginAsync, logoutAsync } from '../api/requests/auth';
import { AuthState, ILoginRequest } from '../types/interface';
import { User } from '../types';
import { RoleEnum } from '../utils/enums';
export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: undefined,
        token: undefined,
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
        },
        currentToken(state): string | undefined {
            if (!state.token) {
                throw new Error('Token does not exist');
            }
            return state.token;
        }
    },
    actions: {
        setUser(user: User): void {
            this.user = user;
        },
        setToken(token: string): void {
            this.token = token;
        },
        async login(creds: ILoginRequest): Promise<void> {
            try {
                const { user, token } = await loginAsync(creds);
                this.user = user;
                this.token = token;
            } catch (error) {
                this.user = undefined;
                this.token = undefined;
                console.error('Failed to fetch current user:', error);
                throw new Error('Failed to login');
            }
        },
        async getAuthUser(): Promise<void> {
            try {
                this.user = await getAuthUserAsync();
            } catch (error) {
                this.user = undefined;
                this.token = undefined;
                console.error('Failed to fetch current user:', error);
                throw new Error('Failed to fetch current user');
            }
        },
        async logout(): Promise<void> {
            await logoutAsync();
            this.user = undefined;
            this.token = undefined;
        }
    },
    persist: true,
});