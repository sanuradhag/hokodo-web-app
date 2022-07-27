import { request } from "./request";

export const api = {
    get: <T> (url: string) => request<T>(url)
}