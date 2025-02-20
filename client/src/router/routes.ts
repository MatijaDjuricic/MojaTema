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
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/topics',
        name: 'Topics',
        component: Topics,
        meta: {
            requiredAuth: true,
            requiredRole: [RoleEnum.UCENIK]
        }
    },
    {
        path: '/topics/reported',
        name: 'ReportedTopics',
        component: ReportedTopics,
        meta: {
            requiredAuth: true,
            requiredRole: [RoleEnum.PROFESOR]
        }
    },
    {
        path: '/topics/create',
        name: 'CreateTopic',
        component: CreateTopic,
        meta: {
            requiredAuth: true,
            requiredRole: [RoleEnum.PROFESOR]
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