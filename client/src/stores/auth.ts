import { defineStore } from 'pinia';
import {
    fetchCsrfTokenAsync,
    getAuthUserAsync,
    loginAsync,
    logoutAsync
} from '../services/auth';
import type { User } from '../types';
import type { AuthState } from '../types/interface';
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
        async getAuthUser() {
            try {
                this.user = await getAuthUserAsync();
                this.isAuthenticated = true;
            } catch (error) {
                console.error('Failed to fetch current user:', error);
                this.isAuthenticated = false;
                this.user = undefined;
            }
        },
        async login(credentials: { email: string; password: string }) {
            try {
                await fetchCsrfTokenAsync();
                const response = await loginAsync(credentials);
                this.user = response.user as User;
                this.isAuthenticated = true;
            } catch (error) {
                console.error('Login error:', error);
                this.isAuthenticated = false;
                this.user = undefined;
            }
        },
        async logout() {
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