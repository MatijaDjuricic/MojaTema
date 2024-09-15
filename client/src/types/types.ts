export interface TokenData {
    id: number,
    first_name: string,
    last_name: string,
    topic_id: number,
    subject_id?: number,
    role_status: string,
    iat: number,
    exp: number,
}
export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    createdAt: Date,
    editedAt: Date,
    roleStatus: string
}
export interface Student {
    Id: number,
    userId: number,
    classId: number,
    departmentId: number,
    status: string,
    gradeMandatory?: number,
    gradeOptional?: number,
    gradeGraduation?: number
}
export interface Professor {
    id: number,
    firstName: string,
    lastName: string,
    subjectId: number
}
export interface Message {
    id: number,
    receiveUsername: string,
    content: string,
    createdAt: Date
}
export interface Topic {
    id: number,
    title: string,
    description: string,
    status: string,
    subjectTitle: string,
    subjectId: number,
    userId?: number,
    studentUserId?: number
    professorId: number,
    professorUsername: string
    studentUsername?: string
}
export interface ReceiverUser {
    receiverId: number,
    firstName: string,
    lastName: string,
    email: string,
    roleStatus: number
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
export interface Chats {
    id: number
    firstName: string,
    lastName: string,
    email: string,
    roleStatus: number
}
export interface MessagesState {
    messages: Message[],
    chats: Chats[],
    receiverUser: ReceiverUser | undefined
}
export interface TopicsState {
    topics: Topic[],
    subjects: Topic[][],
    registeredStudent: boolean
}