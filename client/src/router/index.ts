import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { routes } from './routes';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
router.beforeEach(async (to, _, next) => {
    const auth = useAuthStore();
    if (to.meta.requiredAuth) {
        try {
            await auth.getAuthUser();
            if (auth.isAuthenticated && auth.currentUser) {
                if (to.meta.requiredRole && !to.meta.requiredRole.includes(auth.userRole)) {
                    next('/login');
                } else next();
            } else next('/login');
        } catch (err) {
            next('/login');
            throw new Error(`Error during authentication check: ${err}`);
        }
    } else next();
});
export default router;