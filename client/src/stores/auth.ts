import { defineStore } from 'pinia';
import {
    fetchCsrfTokenAsync,
    getAuthUserAsync,
    loginAsync,
    logoutAsync
} from '../api/requests/auth';
import type {
    AuthState,
    ILoginRequest,
    ILoginResponse
} from '../types/interface';
import type { User } from '../types';
import type { RoleEnum } from '../utils/enums';
export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: undefined,
        isAuthenticated: false
    }),
    getters: {
        isLoggedIn(state): boolean {
            return state.isAuthenticated;
        },
        currentUser(state): User {
            if (state.user === undefined) {
                throw new Error('User does not exist');
            }
            return state.user;
        },
        userRole(state): RoleEnum {
            if (state.user === undefined) {
                throw new Error('User does not exist');
            }
            return state.user.role;
        }
    },
    actions: {
        async getAuthUser(): Promise<void> {
            try {
                this.user = await getAuthUserAsync();
                this.isAuthenticated = true;
            } catch (error) {
                this.isAuthenticated = false;
                this.user = undefined;
            }
        },
        async login(credentials: ILoginRequest): Promise<ILoginResponse | undefined> {
            try {
                await fetchCsrfTokenAsync();
                const response = await loginAsync(credentials);
                this.user = response.user as User;
                this.isAuthenticated = true;
                return response;
            } catch (error) {
                console.error('Login error:', error);
                this.isAuthenticated = false;
                this.user = undefined;
            }
        },
        async logout(): Promise<void> {
            try {
                await logoutAsync();
                this.user = undefined;
                this.isAuthenticated = false;
            } catch (error) {
                console.error('Logout error:', error);
            }
        }
    }
});