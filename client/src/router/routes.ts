import { type RouteRecordRaw } from 'vue-router';
import { RoleEnum } from '../utils/enums';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';
import Chat from '../views/Chat.vue';
import CreateTopic from '../views/CreateTopic.vue';
import Topics from '../views/Topics.vue';
import AllTopics from '../views/AllTopics.vue';
import ReportedTopics from '../views/ReportedTopics.vue';
import Users from '../views/Users.vue';
import Subjects from '../views/Subjects.vue';
import NotFound from '../views/NotFound.vue';
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
        path: '/chat/:receiverId',
        name: 'Chat',
        component: Chat,
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
        path: '/admin',
        meta: {
            requiredAuth: true,
            requiredRole: [RoleEnum.ADMINISTRATOR, RoleEnum.SUPER_ADMINISTRATOR],
        },
        children: [
            {
                path: 'users',
                name: 'Users',
                component: Users,
            },
            {
                path: 'topics',
                name: 'AllTopics',
                component: AllTopics,
            },
            {
                path: 'subjects',
                name: 'Subjects',
                component: Subjects,
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
];