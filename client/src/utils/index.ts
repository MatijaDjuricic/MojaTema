import { daysCyrillic, monthsCyrillic } from './constants';
export const formatDate = (dateTime: Date): string => {
    return `${daysCyrillic[dateTime.getDay()]}, ${dateTime.getDate()}. ${monthsCyrillic[dateTime.getMonth()]} ${dateTime.getFullYear()}.`;
}
export const formatTime = (dateTime: Date): string => {
    const hours = dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : dateTime.getHours();
    const minutes = dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes();
    return `${hours}:${minutes}`;
}