import { Topic, EnumObject } from '../types/types';
export const isReportedTopic = (topic: Topic, userId: number): boolean => topic.studentUserId == userId;
export const isReportedUser = (topics: Topic[], userId: number): boolean => {
    for (const topic of topics) {
        if (topic.studentUserId == userId) return true;
    }
    return false;
}
export const setSubjects = (topics: Topic[]): Topic[][] => topics.reduce((result, topic) => {
    const subjectTitle: string = topic.subjectTitle;
    const index = result.findIndex(item => item[0]?.subjectTitle == subjectTitle);
    if (index == -1) result.push([topic]);
    else result[index].push(topic);
    return result;
}, [] as Topic[][]);
export const hasNoSearchResults = (searchValue: string, topics: Topic[]): boolean => topics.every(item =>
    searchValue && !item.title.toLowerCase().includes(searchValue.trim()) &&
    !item.subjectTitle.toLowerCase().includes(searchValue.trim()) &&
    !item.professorUsername.toLowerCase().includes(searchValue.trim())
) ? true : false;
export const getCyrillicName = (enumObject: EnumObject, id: number): string | null => {
    for (const key in enumObject) {
        if (enumObject[key].id == id) {
            return enumObject[key].nameCyrillic;
        }
    }
    return null;
}