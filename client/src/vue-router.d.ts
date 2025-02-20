import type { RoleEnum } from './src/utils/enums';
declare module 'vue-router' {
    interface RouteMeta {
        requiredAuth?: boolean;
        requiredRole?: RoleEnum[];
    }
}