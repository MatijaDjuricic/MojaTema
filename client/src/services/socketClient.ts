import axios from "axios";
const socketClient = axios.create({
    baseURL: `${import.meta.env.VITE_SOCKET_API_URL}`,
    timeout: 60000,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
    },
});
export default socketClient;