import axios from "axios";
import type { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.API_DOMAIN}:${import.meta.env.API_PORT}/api/v1`,
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
