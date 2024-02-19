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
    theme_id: number,
    subject_id: number
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
}
export interface UsersState {
    users: User[],
    loggedIn: TokenData | boolean,
    loading_status: boolean
}
export interface StudentsState {
    students: Student[],
}
export interface ProfessorsState {
    professors: Professor[],
}
export interface TopicsState {
    topics: Topic[],
    loading_status: boolean,
}
export type TokenData = {
    id: number,
    first_name: string,
    last_name: string,
    theme_id: number,
    subject_id?: number,
    iat: number,
    exp: number,
}