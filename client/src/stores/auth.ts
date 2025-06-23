import { defineStore } from 'pinia';
import { getAuthUserAsync, loginAsync, logoutAsync, refreshTokenAsync } from '../api/requests/auth';
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
                const { user, access_token } = await loginAsync(creds);
                this.user = user;
                this.token = access_token;
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
        async refreshToken(): Promise<void> {
            try {
                const { access_token } = await refreshTokenAsync();
                this.token = access_token;
            } catch (error) {
                this.user = undefined;
                this.token = undefined;
                console.error('Failed to refresh token:', error);
                throw new Error('Failed to refresh token');
            }
        },
        async logout(): Promise<void> {
            try {
                await logoutAsync();
            } catch (error) {
                console.error('Failed to logout:', error);
            }
            this.user = undefined;
            this.token = undefined;
        }
    },
    persist: true,
});