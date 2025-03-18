import { ref } from "vue";
import { IUpdateUserReqeust } from "../../types/interface";
import { User } from "../../types";
const initialCreateUserState: IUpdateUserReqeust = {
    first_name: "",
    last_name: "",
    email: "",
    role: 0,
}
const initialUpdateUserState: IUpdateUserReqeust = {
    first_name: "",
    last_name: "",
    email: "",
    role: 0,
}
export const useUserForm = () => {
    const createUserRef = ref<IUpdateUserReqeust>(initialCreateUserState);
    const updateUserRef = ref<IUpdateUserReqeust>(initialUpdateUserState);
    const handleClear = () => {
        createUserRef.value = {
            first_name: "",
            last_name: "",
            email: "",
            role: 0,
        };
    }
    const openEditModal = (id: number, users: User[] | undefined) => {
        if (!users) return;
        const user = users.find(user => user.id === id);
        if (!user) return;
        updateUserRef.value = {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            role: user.role,
        };
    }
    return { createUserRef, updateUserRef, handleClear, openEditModal };
}