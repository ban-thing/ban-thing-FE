import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie } from "./Cookie";

/**
 * 사용법: apiService.메서드<리스폰스 데이터 타입>('/주소', 전송데이터)
 * formData 전송시 apiService.메서드<리스폰스 데이터 타입>('/주소', 전송데이터, "multipart/form-data")
 */

export default class ApiService {
    axiosInstance: AxiosInstance;

    constructor() {
        const config: AxiosRequestConfig = {
            baseURL: `https://api.banthing.net`,
        };

        this.axiosInstance = axios.create(config);
    }

    // ... (getCsrfToken method remains the same)

    get<T>(
        path: string,
        parameters: unknown,
        header?: string,
        withCredentials?: boolean,
    ): Promise<T> {
        // console.log("🟣 get ", path, parameters);
        return this.makeRequest<T>("get", path, parameters, header, withCredentials);
    }

    post<T>(
        path: string,
        parameters: unknown,
        header?: string,
        withCredentials?: boolean,
    ): Promise<T> {
        // console.log("🟣 post ", path, parameters);
        return this.makeRequest<T>("post", path, parameters, header, withCredentials);
    }

    put<T>(
        path: string,
        parameters: unknown,
        header?: string,
        withCredentials?: boolean,
    ): Promise<T> {
        // console.log("🟣 put ", path, parameters);
        return this.makeRequest<T>("put", path, parameters, header, withCredentials);
    }

    patch<T>(
        path: string,
        parameters: unknown,
        header?: string,
        withCredentials?: boolean,
    ): Promise<T> {
        // console.log("🟣 patch ", path, parameters);
        return this.makeRequest<T>("patch", path, parameters, header, withCredentials);
    }

    delete<T>(
        path: string,
        parameters: unknown,
        header?: string,
        withCredentials?: boolean,
    ): Promise<T> {
        // console.log("🟣 delete ", path, parameters);
        return this.makeRequest<T>("delete", path, parameters, header, withCredentials);
    }

    private makeRequest<T>(
        method: "get" | "post" | "put" | "patch" | "delete",
        path: string,
        parameters: unknown,
        header?: string,
        withCredentials = false,
    ): Promise<T> {
        const authCookie = getCookie("Authorization_banthing");
        const { promise, resolve, reject } = Promise.withResolvers<T>();
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: authCookie || "",
                "Content-Type":
                    header === "multipart/form-data" ? "" : header ? header : "application/json",
            },
            withCredentials,
        };
        if (method === "get" || method === "delete") {
            config.params = parameters;
        }

        (path.startsWith("http") ? axios : this.axiosInstance)
            [method](path, method === "get" || method === "delete" ? config : parameters, config)
            .then((response: AxiosResponse) => {
                console.log(`🟢 ${method} `, path, parameters, response, header);
                resolve(response.data);
            })
            .catch((error: AxiosError) => {
                console.log(`🔴 ${method} `, path, parameters, error);
                reject(error);
            });

        return promise;
    }
}
