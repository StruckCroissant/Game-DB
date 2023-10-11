import { axiosInstance as axios } from "@/common/axiosConfig";
import { useAuthenticationStore } from "@/stores/authentication";
export async function postLogin(request) {
    return await axios.post("/login", request);
}
export async function postRegister(request) {
    return await axios.post("/register", request);
}
export async function postCreateUser(request) {
    // TODO implement user creation
}
export function login(username, password) {
    const authStore = useAuthenticationStore();
    const request = {
        username: username,
        password: password
    };
    postLogin(request).then((res) => {
        authStore.addBasicAuth(username, password);
    }).catch((err) => {
        console.log(err);
    });
}
export function register(username, password) {
    const request = {
        username: username,
        password: password
    };
    postRegister(request).then(res => console.log(res));
}
export function logout() {
    const authStore = useAuthenticationStore();
    authStore.removeAuthToken();
}
export function createNewUser(username, password) {
    // TODO implement
}
//# sourceMappingURL=authenticationHttp.js.map