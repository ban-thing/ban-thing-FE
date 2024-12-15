import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiService from "@/utils/ApiService";
import { CreateItem, ItemSearch, ItemView } from "@/types/Item";
import { ItemsList } from "@/types/User";
import { useNavigate } from "react-router-dom";

const apiService = new ApiService();

// 아이템 목록
export const useFetchItemsList = ({
    keyword,
    hashtags,
    minPrice,
    maxPrice,
    address,
}: ItemSearch) => {
    return useQuery({
        queryKey: ["items", keyword],
        queryFn: async () => {
            return await apiService.get<{ data: { items: ItemsList[] } }>("items", {
                keyword,
                hashtags,
                minPrice,
                maxPrice,
                address,
            });
        },
        retry: false,
    });
};

// 아이템 단건 조회
export const useFetchItem = (itemId: number) => {
    return useQuery({
        queryKey: ["item", itemId],
        queryFn: async () => {
            return await apiService.get<{ data: ItemView }>(`items/${itemId}`, {});
        },
        enabled: !!itemId,
        retry: false,
    });
};

// 마이페이지 구매 목록
export const useFetchMyPurchases = () => {
    return useQuery({
        queryKey: ["myPurchases"],
        queryFn: async () => {
            return await apiService.get<Record<string, any>>("/my/purchases", {});
        },
        retry: false,
    });
};

// 마이페이지 판매 목록
export const useFetchMySales = () => {
    return useQuery({
        queryKey: ["mySales"],
        queryFn: async () => {
            return await apiService.get<Record<string, any>>("/my/sales", {});
        },
        retry: false,
    });
};

// 등록
export const useFetchItemCreate = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (data: any) => {
            const formData = new FormData();
            (Object.keys(data) as Array<keyof CreateItem>).forEach((key) => {
                if (key !== "photos" && key !== "itemImgs") {
                    const value = data[key];
                    if (value !== undefined && value !== null) {
                        formData.append(key, String(value));
                    }
                }
            });

            if (data.photos && data.photos.length > 0) {
                data.photos.forEach((photo: any) => {
                    formData.append("images", photo);
                });
            }

            if (!formData.has("hashtags")) {
                formData.append("hashtags", JSON.stringify([]));
            }

            return await apiService.post<Record<string, any>>(
                "items",
                formData,
                "multipart/form-data",
            );
        },
        onError: (error, variables, context) => {
            console.log(error, variables, context);
        },
        onSuccess: (data) => {
            navigate(`/item-view/${data.data.itemId}`);
        },
    });
};

// 수정
export const useFetchItemUpdate = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (data: any) => {
            const formData = new FormData();
            (Object.keys(data) as Array<keyof CreateItem>).forEach((key) => {
                if (key !== "photos" && key !== "itemImgs") {
                    const value = data[key];
                    if (value !== undefined && value !== null) {
                        formData.append(key, String(value));
                    }
                }
            });
            if (data.photos && data.photos.length > 0) {
                data.photos.forEach((photo: any) => {
                    formData.append("images", photo);
                });
            }
            return await apiService.patch<Record<string, any>>(
                "items/",
                formData,
                "multipart/form-data",
            );
        },
        onError: (error, variables, context) => {
            console.log(error, variables, context);
        },
        onSuccess: (data) => {
            navigate(`/item-view/${data.data.itemId}`);
        },
    });
};

// 판매완료
export const useFetchItemSold = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number | string) => {
            return await apiService.patch(`items/sell/${id}`, {});
        },
        onError: (error, variables, context) => {
            console.log(error, variables, context);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mySales"] });
        },
    });
};

// 삭제
export const useFetchItemDelete = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string | number) => {
            return await apiService.delete(`items/${id}`, {});
        },
        onError: (error, variables, context) => {
            console.log(error, variables, context);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mySales"] });
        },
    });
};
