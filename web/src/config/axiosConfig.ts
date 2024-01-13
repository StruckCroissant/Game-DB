import axios from "axios";
import configs from "../configs";
import type { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: configs.network.baseUrl,
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export function updateAxiosAuthorization(token: string): void {
  axiosInstance.defaults.headers.common["authorization"] = token;
}

export function clearAxiosAuthorization(): void {
  delete axiosInstance.defaults.headers.common["authorization"];
}
