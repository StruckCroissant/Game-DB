import axios from "axios";
// TODO update with actual return type
export async function getAllUsers() {
    let res = await axios.get("http://localhost:9191/api/v1/user/", {
        auth: {
            username: "user",
            password: "password"
        }
    });
    return res.data;
}
//# sourceMappingURL=userHttp.js.map