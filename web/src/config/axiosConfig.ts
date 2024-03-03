import axios from "axios";
import type { AxiosInstance } from "axios";

// TODO defaults should exist in Vite instead of here
const API_DOMAIN = import.meta.env.API_DOMAIN ?? "http://localhost";
const API_PORT = import.meta.env.API_PORT ?? "9191";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${API_DOMAIN}:${API_PORT}/api/v1`,
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
