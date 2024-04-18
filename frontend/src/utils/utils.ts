import { Topic } from "../types/types";
export const reportedTopicsCount = (topics: Topic[], user_id: number) => topics.reduce((count, topic) => {
    const reportedTopics = topic.reportedTopicUsers.filter(reportedTopic => reportedTopic.user_id == user_id);
    return count + reportedTopics.length;
}, 0);
export const isReportedTopic = (topic: Topic, user_id: number) => topic.reportedTopicUsers.length > 0 && topic.reportedTopicUsers.find(reported_topic => reported_topic.user_id == user_id ? true : false);
export const setSubjects = (topics: Topic[]) => topics.reduce((result, topic) => {
    const subjectTitle: string = topic.subject_title;
    const index = result.findIndex(item => item[0]?.subject_title == subjectTitle);
    if (index == -1) result.push([topic]);
    else result[index].push(topic);
    return result;
}, [] as Topic[][]);
export const hasNoSearchResults = (searchValue: string, topics: Topic[]) => topics.every(item =>
    searchValue && !item.title.toLowerCase().includes(searchValue.trim()) &&
    !item.subject_title.toLowerCase().includes(searchValue.trim()) &&
    !item.professor_username.toLowerCase().includes(searchValue.trim())
) ? true : false;
export const formatDateTime = (string: string) => {
    var date = new Date(string);
    const months_numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    //const months_eng = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //const days_eng = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //const days_short_eng = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    //const months_srp = ["Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"];
    const days_srp = ["Недеља", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"];
    //const days_short_srp = ["Нед", "Пон", "Уто", "Сре", "Чет", "Пет", "Суб"];
    return `${date.getHours()}:${date.getMinutes()} - ${days_srp[date.getDay()]} ${date.getDate()}.${months_numbers[date.getMonth()]}.${date.getFullYear()}.`;
}