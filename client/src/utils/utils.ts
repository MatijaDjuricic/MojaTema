import { Topic } from "../types/types";
export const isReportedTopic = (topic: Topic, userId: number) => topic.studentUserId == userId;
export const isReportedUser = (topics: Topic[], userId: number) => {
    for (const topic of topics) {
        if (topic.studentUserId == userId) return true;
    }
    return false;
}
export const setSubjects = (topics: Topic[]) => topics.reduce((result, topic) => {
    const subjectTitle: string = topic.subjectTitle;
    const index = result.findIndex(item => item[0]?.subjectTitle == subjectTitle);
    if (index == -1) result.push([topic]);
    else result[index].push(topic);
    return result;
}, [] as Topic[][]);
export const hasNoSearchResults = (searchValue: string, topics: Topic[]) => topics.every(item =>
    searchValue && !item.title.toLowerCase().includes(searchValue.trim()) &&
    !item.subjectTitle.toLowerCase().includes(searchValue.trim()) &&
    !item.professorUsername.toLowerCase().includes(searchValue.trim())
) ? true : false;
export const formatDate = (dateTime: Date) => {
    const months_srp = ["Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"];
    const days_srp = ["Недеља", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"];
    return `${days_srp[dateTime.getDay()]}, ${dateTime.getDate()}. ${months_srp[dateTime.getMonth()]} ${dateTime.getFullYear()}.`;
}
export const formatTime = (dateTime: Date) => {
    const hours = dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : dateTime.getHours();
    const minutes = dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes();
    return `${hours}:${minutes}`;
}