import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * 사용법: apiService.메서드<리스폰스 데이터 타입>('/주소', 전송데이터)
 * formData 전송시 apiService.메서드<리스폰스 데이터 타입>('/주소', 전송데이터, "multipart/form-data")
 */
export default class ApiService {
    axiosInstance: AxiosInstance;

    constructor() {
        const config: AxiosRequestConfig = {
            baseURL: `http://211.188.62.82:8080`,
        };

        this.axiosInstance = axios.create(config);
    }

    // ... (getCsrfToken method remains the same)

    get<T>(path: string, parameters: unknown, header?: string): Promise<T> {
        console.log("🟣 get ", path, parameters);
        return this.makeRequest<T>("get", path, parameters, header);
    }

    post<T>(path: string, parameters: unknown, header?: string): Promise<T> {
        console.log("🟣 post ", path, parameters);
        return this.makeRequest<T>("post", path, parameters, header);
    }

    put<T>(path: string, parameters: unknown, header?: string): Promise<T> {
        console.log("🟣 put ", path, parameters);
        return this.makeRequest<T>("put", path, parameters, header);
    }

    patch<T>(path: string, parameters: unknown, header?: string): Promise<T> {
        console.log("🟣 patch ", path, parameters);
        return this.makeRequest<T>("patch", path, parameters, header);
    }

    delete<T>(path: string, parameters: unknown, header?: string): Promise<T> {
        console.log("🟣 delete ", path, parameters);
        return this.makeRequest<T>("delete", path, parameters, header);
    }

    private makeRequest<T>(
        method: "get" | "post" | "put" | "patch" | "delete",
        path: string,
        parameters: unknown,
        header?: string,
    ): Promise<T> {
        const { promise, resolve, reject } = Promise.withResolvers<T>();

        const config: AxiosRequestConfig = {
            headers: {
                "Content-Type": header ? header : "application/json",
            },
        };
        if (method === "get" || method === "delete") {
            config.params = parameters;
        }

        (path.startsWith("http") ? axios : this.axiosInstance)
            [method](path, method === "get" || method === "delete" ? config : parameters, config)
            .then((response: AxiosResponse) => {
                console.log(`🟢 ${method} `, path, parameters, response);
                resolve(response.data);
            })
            .catch((error: AxiosError) => {
                console.log(`🔴 ${method} `, path, parameters, error);
                reject(error);
            });

        return promise;
    }
}
