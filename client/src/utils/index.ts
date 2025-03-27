import { daysCyrillic, monthsCyrillic } from './constants';
import { RoleEnum } from './enums';
import { Topic } from '../types';
export const formatDate = (dateTime: Date): string => {
    return `${daysCyrillic[dateTime.getDay()]}, ${dateTime.getDate()}. ${monthsCyrillic[dateTime.getMonth()]} ${dateTime.getFullYear()}.`;
}
export const formatTime = (dateTime: Date): string => {
    const hours = dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : dateTime.getHours();
    const minutes = dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes();
    return `${hours}:${minutes}`;
}
export const checkRoles = (role: RoleEnum, requiredRoles: RoleEnum[] | undefined) => {
    if (!requiredRoles || requiredRoles.length === 0) return true;
    return requiredRoles.includes(role);
};
export const isReportedTopicBySelf = (topics: Topic[] | undefined, userId: number) => {
    if (!topics) return false;
    for (const topic of topics) {
        if (topic.student != null && topic.student.userId == userId) {
            return true;
        }
    }
    return false;
}