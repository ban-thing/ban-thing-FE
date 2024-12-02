import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// 사용법: apiService.메서드<리스폰스 데이터 타입>('/주소', 전송데이터)
export default class ApiService {
    axiosInstance: AxiosInstance;

    constructor() {
        const config: AxiosRequestConfig = {
            baseURL: `/baseURL`, // TODO: 수정
            headers: { "Content-Type": "application/json" }, //TODO: 헤더설정 추가
        };

        this.axiosInstance = axios.create(config);
    }

    // ... (getCsrfToken method remains the same)

    get<T>(path: string, parameters: unknown): Promise<T> {
        console.log("🟣 get ", path, parameters);
        return this.makeRequest<T>("get", path, parameters);
    }

    post<T>(path: string, parameters: unknown): Promise<T> {
        console.log("🟣 post ", path, parameters);
        return this.makeRequest<T>("post", path, parameters);
    }

    put<T>(path: string, parameters: unknown): Promise<T> {
        console.log("🟣 put ", path, parameters);
        return this.makeRequest<T>("put", path, parameters);
    }

    patch<T>(path: string, parameters: unknown): Promise<T> {
        console.log("🟣 patch ", path, parameters);
        return this.makeRequest<T>("patch", path, parameters);
    }

    delete<T>(path: string, parameters: unknown): Promise<T> {
        console.log("🟣 delete ", path, parameters);
        return this.makeRequest<T>("delete", path, parameters);
    }

    private makeRequest<T>(
        method: "get" | "post" | "put" | "patch" | "delete",
        path: string,
        parameters: unknown,
    ): Promise<T> {
        const { promise, resolve, reject } = Promise.withResolvers<T>();

        const config: AxiosRequestConfig = {};
        if (method === "get" || method === "delete") {
            config.params = parameters;
        }

        this.axiosInstance[method](
            path,
            method === "get" || method === "delete" ? config : parameters,
            config,
        )
            .then((response: AxiosResponse) => {
                if (response.data.head.status !== "success") {
                    console.log(`🔴 ${method} `, path, parameters, response);
                    const message = response.data.head.message ?? "";
                    reject({
                        message: response.data.head.status === "empty" ? "no data" : message,
                    });
                    return;
                }
                console.log(`🟢 ${method} `, path, parameters, response);
                resolve(response.data?.body);
            })
            .catch((error: AxiosError) => {
                console.log(`🔴 ${method} `, path, parameters, error);
                reject(error);
            });

        return promise;
    }
}
