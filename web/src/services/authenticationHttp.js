import axios from "axios";
// TODO update with login auth return type
export async function postLogin(request) {
    let res = await axios.post("http://localhost:9191/api/v1/login", request);
    return res.data;
}
export function login(username, password) {
    const request = {
        username: username,
        password: password
    };
    postLogin(request).then((res) => console.log(res));
}
