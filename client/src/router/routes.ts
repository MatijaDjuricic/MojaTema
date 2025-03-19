import { type RouteRecordRaw } from 'vue-router';
import { RoleEnum } from '../utils/enums';
export const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: '/chat/:receiverId',
        name: 'Chat',
        component: () => import('../views/Chat.vue'),
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: '/topics',
        meta: {
            requiredAuth: true,
        },
        children: [
            {
                path: '',
                name: 'Topics',
                component: () => import('../views/Topics.vue'),
                meta: {
                    requiredRole: [RoleEnum.UCENIK],
                },
            },
            {
                path: 'reported',
                name: 'ReportedTopics',
                component: () => import('../views/ReportedTopics.vue'),
                meta: {
                    requiredRole: [RoleEnum.PROFESOR],
                }
            },
            {
                path: 'create',
                name: 'CreateTopic',
                component: () => import('../views/CreateTopic.vue'),
                meta: {
                    requiredRole: [RoleEnum.PROFESOR],
                }
            },
        ]
    },
    {
        path: '/admin',
        meta: {
            requiredAuth: true,
            requiredRole: [RoleEnum.ADMINISTRATOR, RoleEnum.SUPER_ADMINISTRATOR],
        },
        children: [
            {
                path: 'users',
                name: 'Users',
                component: () => import('../views/Users.vue'),
            },
            {
                path: 'topics',
                name: 'AllTopics',
                component: () => import('../views/AllTopics.vue'),
            },
            {
                path: 'subjects',
                name: 'Subjects',
                component: () => import('../views/Subjects.vue'),
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue'),
    },
];