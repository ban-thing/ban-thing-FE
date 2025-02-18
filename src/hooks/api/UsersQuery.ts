import { useMutation, useQuery } from "@tanstack/react-query";
import ApiService from "@/utils/ApiService";
import { Address, UserProfile } from "@/types/User";
import { useNavigate } from "react-router-dom";

const apiService = new ApiService();

// 카카오 로그인
export const useFetchKakaoLogin = (code: string) => {
    const KEY = import.meta.env.VITE_REST_API_KEY;
    const URI = window.location.href.includes("localhost")
        ? import.meta.env.VITE_REDIRECT_URI_LOCAL
        : import.meta.env.VITE_REDIRECT_URI;
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
        enabled: !!code,
        retry: false,
    });
};

export const useFetchKakaoLogin_token = (token: string, code: string) => {
    return useQuery({
        queryKey: ["kakaoLogin_token", token, code],
        queryFn: async () => {
            return await apiService.get<any>(`user/kakao?token=${token}`, {});
        },
        enabled: !!token && !!code,
        retry: false,
    });
};

// 프로필 조회
export const useFetchMyProfile = () => {
    return useQuery({
        queryKey: ["myProfile"],
        queryFn: async () => {
            return await apiService.get<Record<string, any>>("my/profile", {}, "", true);
        },
        retry: false,
    });
};

// 프로필 수정
export const useFetchMyProfileEdit = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async ({
            nickname,
            profileImg,
        }: Pick<UserProfile, "nickname" | "profileImg">) => {
            const formData = new FormData();
            formData.append("nickname", nickname);
            formData.append("profileImg", profileImg);

            return await apiService.patch<any>("my/profile", formData, "multipart/form-data");
        },
        onError: (error, variables, context) => {
            console.log(error, variables, context);
        },
        onSuccess: () => {
            navigate("/my-page");
        },
    });
};

// 위치 등록 및 수정
export const useFetchAddress = ({ address1, address2, address3 }: Address) => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async () => {
            return await apiService.patch<Record<string, string>>("my/address", {
                address1,
                address2,
                address3,
            });
        },
        onError: (error, variables, context) => {
            console.log(error, variables, context);
        },
        onSuccess: () => {
            navigate("/");
        },
    });
};

// 회원 탈퇴
export const useFetchDeleteUser = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (reason: string) => {
            return await apiService.delete<any>(
                "my/delete",
                {
                    reason: reason,
                },
                "",
                true,
            );
        },
        onError: (error, variables, context) => {
            console.log(error, variables, context);
        },
        onSuccess: () => {
            navigate("/login");
        },
    });
};
