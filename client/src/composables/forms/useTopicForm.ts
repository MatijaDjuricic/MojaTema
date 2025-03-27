import { ref } from "vue";
import { ICreateTopicRequest, IUpdateTopicRequest } from "../../types/interface";
import { Topic } from "../../types";
const initialCreateTopicState: ICreateTopicRequest = {
    title: "",
    description: "",
    professor_subject_id: 0,
    student_user_id: null
};
const initialUpdateTopicState: IUpdateTopicRequest = {
    title: "",
    description: "",
    status: 0,
    professor_subject_id: 0,
    student_user_id: null
};
export const useTopicForm = () => {
    const createTopicRef = ref<ICreateTopicRequest>(initialCreateTopicState);
    const updateTopicRef = ref<IUpdateTopicRequest>(initialUpdateTopicState);
    const handleClear = () => {
        createTopicRef.value = {
            title: "",
            description: "",
            professor_subject_id: 0,
            student_user_id: null
        };
        updateTopicRef.value = {
            title: "",
            description: "",
            status: 0,
            professor_subject_id: 0,
            student_user_id: null
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
            professor_subject_id: topic.professor_subject_id,
            student_user_id: topic.student ? topic.student.userId : 0
        };
    }
    return { createTopicRef, updateTopicRef, handleClear, openEditModal };
}