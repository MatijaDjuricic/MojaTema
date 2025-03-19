import { RouteMeta } from 'vue-router';
import { RoleEnum } from './utils/enums';
declare module 'vue-router' {
    interface RouteMeta {
        requiredAuth?: boolean;
        requiredRole?: RoleEnum[];
    }
}