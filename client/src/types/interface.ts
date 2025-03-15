import type { User, Topic, Subject, Message } from ".";
export interface AuthState {
    user: User | undefined,
    isAuthenticated: boolean
}
export interface UserState {
    users: User[],
    chatAvailableUsers: User[];
}
export interface TopicState {
    topics: Topic[],
    reported: Topic[]
}
export interface SubjectState {
    subjects: Subject[]
}
export interface MessageState {
    messages: Message[]
}
export interface ILoginRequest {
    email: string,
    password: string
}
export interface ILoginResponse {
    user: User,
    token: string
}
export interface IChangePasswordRequest {
    current_password: string,
    new_password: string,
    new_password_confirmation: string
}
export interface ICreateTopicRequest {
    title: string,
    description: string,
    subject_id: number,
    professor_id: number | null,
}
export interface IUpdateTopicRequest {
    title: string,
    description: string,
    status: number,
    subject_id: number,
    professor_id: number,
    student_user_id: number | null,
}
export interface IUpdateTopicStatusRequest {
    status: number,
    studentId: number
}
export interface IUpdateUserReqeust {
    first_name: string,
    last_name: string,
    email: string,
    role: number
}
export interface ICreateSubjectRequest {
    title: string,
    class_year_id: number
}
export interface IUpdateSubjectRequest {
    title: string,
    class_year_id: number
}