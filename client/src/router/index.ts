import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { useAuthStore } from '../stores/auth';
import { checkRoles } from '../utils';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
router.beforeEach((to, _, next) => {
    const auth = useAuthStore();
    if (to.matched.some(record => record.meta.requiredAuth) && !auth.token) {
        return next({ name: 'Login' });
    } else if (
        (to.matched.some(record => record.meta.requiredNoAuth) && auth.token) ||
        (auth.user && !checkRoles(auth.userRole, to.meta.requiredRole))) {
        return next({ name: 'Home' });
    }
    return next();
});
export default router;