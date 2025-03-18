import { ref } from "vue";
import { ICreateTopicRequest, IUpdateTopicRequest } from "../../types/interface";
import { Topic } from "../../types";
const initialCreateTopicState: ICreateTopicRequest = {
    title: "",
    description: "",
    subject_id: 0,
    professor_id: 0
};
const initialUpdateTopicState: IUpdateTopicRequest = {
    title: "",
    description: "",
    status: 0,
    subject_id: 0,
    professor_id: 0,
    student_user_id: 0
};
export const useTopicForm = () => {
    const createTopicRef = ref<ICreateTopicRequest>(initialCreateTopicState);
    const updateTopicRef = ref<IUpdateTopicRequest>(initialUpdateTopicState);
    const handleClear = () => {
        createTopicRef.value = {
            title: "",
            description: "",
            subject_id: 0,
            professor_id: 0
        };
        updateTopicRef.value = {
            title: "",
            description: "",
            status: 0,
            subject_id: 0,
            professor_id: 0,
            student_user_id: 0
        };
    }
    const openEditModal = (id: number, topics: Topic[] | undefined) => {
        if (!topics) return;
        const topic = topics.find(topic => topic.id === id);
        if (!topic) return;
        updateTopicRef.value = {
            title: topic.title,
            description: topic.description,
            status: topic.status,
            subject_id: topic.subject.id,
            professor_id: topic.professor.userId,
            student_user_id: topic.student ? topic.student.userId : 0
        };
    }
    return { createTopicRef, updateTopicRef, handleClear, openEditModal };
}