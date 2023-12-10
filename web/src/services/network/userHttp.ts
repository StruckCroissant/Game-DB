import axios from "axios";

// TODO update with actual return type
export async function getAllUsers(): Promise<Array<any>> {
  const res = await axios.get("http://localhost:9191/api/v1/user/", {
    auth: {
      username: "user",
      password: "password",
    },
  });
  return res.data;
}
