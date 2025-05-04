import type { User, Message } from ".";
export interface AuthState {
    user: User | undefined,
    token: string | undefined
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
    professor_subject_id: number,
    student_user_id: number | null,
}
export interface IUpdateTopicRequest {
    title: string,
    description: string,
    status: number,
    professor_subject_id: number,
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
export interface ICreateProfessorSubjectRequest {
    user_id: number,
    subject_id: number
}
export interface IUpdateProfessorSubjectRequest {
    user_id: number,
    subject_id: number
}