import apiClient from "./apiClient";
export const userLoginAsync = async ({ email, password }: { email: string, password: string }) => {
    try {
        const response = await apiClient.post('/user/login', {
            'email': email,
            'password': password
        });
        return await response.data;
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}