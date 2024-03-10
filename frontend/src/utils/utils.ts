import { Topic } from "../types/types";
export const reportedTopicsCount = (topics: Topic[], user_id: number) => {
    const reportedTopicsNumber = topics.reduce((count, topic) => {
        const reportedTopics = topic.reportedTopicUsers.filter(reportedTopic => reportedTopic.user_id == user_id);
        return count + reportedTopics.length;
    }, 0);
    return reportedTopicsNumber;
}
export const isReportedTopic = (topic: Topic, user_id: number) => {
    return topic.reportedTopicUsers.length > 0 && topic.reportedTopicUsers.find(reported_topic => reported_topic.user_id == user_id ? true : false);
}
export const setSubjects = (topics: Topic[]) => {
    const subjectArray: Topic[][] = topics.reduce((result, topic) => {
        const subjectTitle: string = topic.subject_title;
        const index = result.findIndex((arr) => arr[0]?.subject_title == subjectTitle);
        if (index == -1) result.push([topic]);
        else result[index].push(topic);
        return result;
    }, [] as Topic[][]);
    return subjectArray;
}
export const hasNoSearchResults = (searchValue: string, topics: Topic[]) => {
    const searchResults = topics.every(item =>
        searchValue && !item.title.toLowerCase().includes(searchValue.trim()) &&
        !item.subject_title.toLowerCase().includes(searchValue.trim()) &&
        !item.professor_username.toLowerCase().includes(searchValue.trim())
    );
    return searchResults ? true : false;
};