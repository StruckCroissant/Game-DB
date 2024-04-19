import { User } from "@/types/user";
import axios from "axios";

export async function getAllUsers(): Promise<Array<User>> {
  const res = await axios.get("http://localhost:9191/api/v1/user/", {
    auth: {
      username: "user",
      password: "password",
    },
  });
  return res.data;
}
