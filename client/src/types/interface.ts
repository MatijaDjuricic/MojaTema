import type { User, Topic, Subject, Message } from ".";
export interface AuthState {
    user: User | undefined,
    isAuthenticated: boolean
}export interface UserState {
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
    subjectId: number
}
export interface IUpdateTopicStatusRequest {
    status: number,
    studentId: number
}