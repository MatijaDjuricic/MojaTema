export type User = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: number,
    createdAt: Date,
    updatedAt: Date
}
export type Student = {
    id: number,
    userId: number,
    firstName: string,
    lastName: string,
}
export type Topic = {
    id: number,
    title: string,
    description: string,
    status: number,
    subject: {
        id: number,
        title: string,
    }
    professor: {
        userId: number,
        firstName: string,
        lastName: string,
    }
    student: Student | null,
    createdAt: Date,
    updatedAt: Date
}
export type Subject = {
    id: number,
    title: string,
    class_year_id: number,
    updatedAt: Date,
    createdAt: Date
}
export type ProfessorSubject = {
    id: number,
    user_id: number,
    subject_id: number,
    professor: User,
    subject: Subject,
    createdAt: Date,
    updatedAt: Date
}
export type Message = {
    senderId: number,
    receiverId: number,
    content: string,
    timestamp: number,
}