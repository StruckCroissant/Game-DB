import { axiosInstance as axios } from "@/common/axiosConfig";
import type { AxiosError } from "axios";
import { useAuthenticationStore } from "@/stores/authentication";

export async function postLogin(request: AuthRequest): Promise<any> {
    return await axios.post("/login", request);
}

export async function postRegister(request: AuthRequest): Promise<any> {
    return await axios.post("/register", request);
}

export async function postLogout(): Promise<any> {
    return await axios.post("");
}

export function login(username: string, password: string): void {
    const authStore = useAuthenticationStore();
    const request: AuthRequest = {
        username: username,
        password: password
    };

    postLogin(request).then((res) => {
        authStore.addBasicAuth(username, password);
    }).catch((err: AxiosError) => {
        console.log(err);
    });
}

export function register(username: string, password: string): void {
    const request: AuthRequest = {
        username: username,
        password: password
    };

    postRegister(request).then(res => console.log(res));
}

export function logout() {
    const authStore = useAuthenticationStore();


    authStore.removeAuthToken();
}

interface AuthRequest {
    username: string,
    password: string
}