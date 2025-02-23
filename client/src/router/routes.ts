import { type RouteRecordRaw } from 'vue-router';
import { RoleEnum } from '../utils/enums';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';
import Topics from '../views/Topics.vue';
import CreateTopic from '../views/CreateTopic.vue';
import NotFound from '../views/NotFound.vue';
import ReportedTopics from '../views/ReportedTopics.vue';
import Chat from '../views/Chat.vue';
export const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
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
                component: Topics,
                meta: {
                    requiredRole: [RoleEnum.UCENIK],
                },
            },
            {
                path: 'reported',
                name: 'ReportedTopics',
                component: ReportedTopics,
                meta: {
                    requiredRole: [RoleEnum.PROFESOR],
                }
            },
            {
                path: 'create',
                name: 'CreateTopic',
                component: CreateTopic,
                meta: {
                    requiredRole: [RoleEnum.PROFESOR],
                }
            },
        ]
    },
    {
        path: '/chat/:receiverId',
        name: 'Chat',
        component: Chat,
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
];