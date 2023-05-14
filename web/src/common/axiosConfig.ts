import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:9191/api/v1"
});

export function updateAxiosIntercept(token: string) {
    axiosInstance.defaults.headers.common['authorization'] = token;
}