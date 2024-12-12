import { useQuery } from "@tanstack/react-query";
import ApiService from "@/utils/ApiService";

const apiService = new ApiService();

export const useFetchKakaoLogin = (code: string) => {
    const KEY = import.meta.env.VITE_REST_API_KEY;
    const URI = import.meta.env.VITE_REDIRECT_URI;
    return useQuery({
        queryKey: ["kakaoLogin", code],
        queryFn: async () => {
            return await apiService.post<any>(
                "https://kauth.kakao.com/oauth/token",
                {
                    grant_type: "authorization_code",
                    client_id: KEY,
                    redirect_uri: URI,
                    code: code,
                },
                "application/x-www-form-urlencoded;charset=utf-8",
            );
        },
        // queryFn: () => {
        //     return new Promise((_, reject) => {
        //         reject(new Error("테스트를 위한 강제 에러"));
        //     });
        // },
        enabled: !!code,
        retry: false,
    });
};
