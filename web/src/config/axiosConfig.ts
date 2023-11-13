import axios from "axios";
import type {AxiosInstance} from "axios";

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:9191/api/v1"
});
axiosInstance.interceptors.response.use((response) => response, (error) => {
    return Promise.reject(error);
});

export function updateAxiosIntercept(token: string): void {
    axiosInstance.defaults.headers.common['authorization'] = token;
}