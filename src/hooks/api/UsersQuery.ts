import { useMutation, useQuery } from "@tanstack/react-query";
import ApiService from "@/utils/ApiService";
import { Address, UserProfile } from "@/types/User";
import { useNavigate } from "react-router-dom";
import { ItemsList } from "@/types/User";

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
interface DeleteUserParams {
    reason: string;
    memo: string;
}

export const useFetchDeleteUser = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async ({ reason, memo }: DeleteUserParams) => {
            console.log("🔍 회원 탈퇴 API 호출:", { reason, memo });
            return await apiService.post<string>(`my/delete`, { memo, reason }, "", true);
        },
        onError: (error, variables, context) => {
            console.log("🔴 회원 탈퇴 에러:", error, variables, context);
        },
        onSuccess: () => {
            navigate("/login");
        },
    });
};

// 찜 목록 조회
export const useFetchWishlist = () => {
    return useQuery({
        queryKey: ["wishlist"],
        queryFn: async () => {
            return await apiService.get<{ status: string; data: ItemsList[]; message: null }>(
                "my/wishlist",
                {},
                "",
                true,
            );
        },
        retry: false,
    });
};

// 찜 추가
export const useAddWishlist = () => {
    return useMutation({
        mutationFn: async (itemId: number) => {
            return await apiService.post<{ status: string; message: null }>(
                `items/${itemId}/wishlist`,
                {},
                "",
                true,
            );
        },
        onError: (error, variables, context) => {
            console.log(error, variables, context);
        },
    });
};

// 찜 삭제
export const useRemoveWishlist = () => {
    return useMutation({
        mutationFn: async (itemId: number) => {
            return await apiService.delete<{ status: string; message: null }>(
                `items/${itemId}/wishlist`,
                {},
                "",
                true,
            );
        },
        onError: (error, variables, context) => {
            console.log(error, variables, context);
        },
    });
};

// 작성자 신고
interface ReportUserParams {
    userId: string | number;
    reason: string;
    detailed_reason?: string;
}

export const useFetchUserReport = () => {
    return useMutation({
        mutationFn: async ({ userId, reason, detailed_reason }: ReportUserParams) => {
            console.log("🔍 API 호출 파라미터:", { userId, reason, detailed_reason });

            const params = new URLSearchParams();
            params.append("reason", reason);
            if (detailed_reason && detailed_reason.trim() !== "") {
                params.append("detailed_reason", detailed_reason);
            }

            const url = `user-report/${userId}?${params.toString()}`;
            console.log("🔍 최종 API URL:", url);

            return await apiService.post(url, {});
        },
        onError: (error, variables, context) => {
            console.log("🔴 useFetchUserReport 에러:", error, variables, context);
        },
    });
};
