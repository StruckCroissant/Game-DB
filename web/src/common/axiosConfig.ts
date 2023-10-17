import axios from "axios";
import type {AxiosInstance} from "axios";

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:9191/api/v1"
});

export function updateAxiosIntercept(token: string): void {
    axiosInstance.defaults.headers.common['authorization'] = token;
}