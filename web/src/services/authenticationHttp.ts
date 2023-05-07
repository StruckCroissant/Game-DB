import axios from "axios";

export async function postLogin(request: AuthRequest): Promise<boolean> {
    let res = await axios.post("http://localhost:9191/api/v1/login", request);
    return res.data;
}

export async function postRegister(request: AuthRequest): Promise<boolean> {
    let res = await axios.post("http://localhost:9191/api/v1/register", request);
    return res;
}

export async function login(username: string, password: string): void {
    const request: AuthRequest = {
        username: username,
        password: password
    };
    let res = await postLogin(request));

}

export async function register(username: string, password: string): void {
    const request: AuthRequest = {
        username: username,
        password: password
    };

    let res = await postRegister(username);
    postRegister(request).then(res => console.log(res));
}

interface AuthRequest {
    username: string,
    password: string
}