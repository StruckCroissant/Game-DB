import axios from "axios";
import errorHandler from "@/services/errorHandler";
import type {AxiosInstance} from "axios";

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:9191/api/v1"
});
axiosInstance.interceptors.response.use((response) => response, (error) => {
    errorHandler.handleError(error);
    // throw error;
});

export function updateAxiosIntercept(token: string): void {
    axiosInstance.defaults.headers.common['authorization'] = token;
}