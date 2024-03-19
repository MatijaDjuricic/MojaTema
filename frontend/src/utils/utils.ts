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