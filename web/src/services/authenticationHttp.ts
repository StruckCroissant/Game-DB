import axios from "axios";

// TODO update with login auth return type
async function postLogin(): any {
    let res = await axios.post("http://testurl.com", {
        data: "data"
    });
    return res.data;
}

export default {
    postLogin,
}