import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { routes } from './routes';
import { checkRoles } from '../utils';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
router.beforeEach(async (to, _, next) => {
    const auth = useAuthStore();
    if (Object.keys(to.query).length == 0) {
        await auth.getAuthUser();
    }
    switch (true) {
        case (to.meta.requiredNoAuth):
            if (auth.checkAuth) {
                return next('/');
            }
            return next();
        case (to.meta.requiredAuth):
            if (!auth.checkAuth || !checkRoles(auth.userRole, to.meta.requiredRole)) {
                return next('/login');
            }
            return next();
        default:
            return next();
    }
});
export default router;