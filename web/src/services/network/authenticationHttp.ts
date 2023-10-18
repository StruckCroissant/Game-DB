import { axiosInstance as axios } from "@/common/axiosConfig";
import { useAuthenticationStore } from "@/stores/authentication";

export async function postLogin(request: AuthRequest): Promise<any> {
    return await axios.post("/login", request);
}

export async function postRegister(request: AuthRequest): Promise<any> {
    return await axios.post("/register", request);
}

export async function login(username: string, password: string): Promise<void> {
    const authStore = useAuthenticationStore();
    const request: AuthRequest = {
        username: username,
        password: password
    };

    await postLogin(request)
    authStore.addBasicAuth(username, password);
}

export async function register(username: string, password: string): Promise<void> {
    const request: AuthRequest = {
        username: username,
        password: password
    };

    const response = postRegister(request);
    console.log(response);
}

export function logout() {
    const authStore = useAuthenticationStore();
    authStore.removeAuthToken();
}

interface AuthRequest {
    username: string,
    password: string
}