export interface User {
    id: number,
    first_name: string,
    last_name: string,
    theme_id: number,
    subject_id?: number,
    role_status: string
}
export interface Student {
    id: number,
    first_name: string,
    last_name: string,
    theme_id: number
}
export interface Professor {
    id: number,
    first_name: string,
    last_name: string,
    subject_id: number
}
export interface Message {
    id: string,
    content: string,
    user: string
}
export interface Topic {
    id: number,
    title: string,
    info: string,
    status: number,
    subject_title: string,
    user_id: number,
    student_username: string,
    professor_username: string
    reportedTopicUsers: [{
        user_id: number | undefined,
        student_username: string | undefined,
    }]
}
export interface UsersState {
    users: User[],
    loggedIn: User | TokenData | undefined
}
export interface StudentsState {
    students: Student[]
}
export interface ProfessorsState {
    professors: Professor[]
}
export interface MessagesState {
    messages: Message[]
}
export interface TopicsState {
    topics: Topic[],
    subjects: Topic[][],
    reported_topics: {
        current_number: number,
        limit: number,
    }
}
export type TokenData = {
    id: number,
    first_name: string,
    last_name: string,
    topic_id: number,
    subject_id?: number,
    role_status: string,
    iat: number,
    exp: number,
}