import { useMutation, useQuery } from "@tanstack/react-query";
import ApiService from "@/utils/ApiService";
import { Address } from "@/types/User";

const apiService = new ApiService();

/**
 * 
 * export const useFetch = () => {
    return useQuery({
        queryKey: [""],
        queryFn: async () => {
            return await apiService.get("url", {})
        }
    })
}
 */

// 카카오 로그인
// export const useFetchKakaoLogin = (code: string) => {
//     const KEY = import.meta.env.VITE_REST_API_KEY;
//     const URI = import.meta.env.VITE_REDIRECT_URI;
//     return useQuery({
//         queryKey: ["kakaoLogin", code],
//         queryFn: async () => {
//             return await apiService.post<any>(
//                 "https://kauth.kakao.com/oauth/token",
//                 {
//                     grant_type: "authorization_code",
//                     client_id: KEY,
//                     redirect_uri: URI,
//                     code: code,
//                 },
//                 "application/x-www-form-urlencoded;charset=utf-8",
//             );
//         },
//         enabled: !!code,
//         retry: false,
//     });
// };
export const useFetchKakaoLogin = (code: string) => {
    // const KEY = import.meta.env.VITE_REST_API_KEY;
    // const URI = import.meta.env.VITE_REDIRECT_URI;
    return useQuery({
        queryKey: ["kakaoLogin", code],
        queryFn: async () => {
            return await apiService.get<any>(`user/kakao?token=${code}`, {});
        },
        enabled: !!code,
        retry: false,
    });
};

// 프로필 조회
export const useFetchMyProfile = () => {
    return useQuery({
        queryKey: ["myProfile"],
        queryFn: async () => {
            return await apiService.get("my/profile", {});
        },
    });
};

// 위치 등록 및 수정
export const useFetchAddress = ({ address1, address2, address3 }: Address) => {
    return useMutation({
        mutationFn: async () => {
            return await apiService.patch("my/address", { address1, address2, address3 });
        },
        onError: (error, variables, context) => {
            console.log(error, variables, context);
        },
    });
};
