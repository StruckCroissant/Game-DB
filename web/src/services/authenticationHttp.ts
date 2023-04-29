import axios from "axios";

// TODO update with login auth return type
export async function postLogin(request: LoginRequest): Promise<boolean> {
    let res = await axios.post("http://localhost:9191/api/v1/login", request);
    return res.data;
}

export function login(username: string, password: string): void {
    const request: LoginRequest = {
        username: username,
        password: password
    };
    postLogin(request).then(
        (res) => console.log(res)
    );
}

interface LoginRequest {
    username: string,
    password: string
}