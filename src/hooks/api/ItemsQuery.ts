import { useQuery } from "@tanstack/react-query";
import ApiService from "@/utils/ApiService";
import { ItemSearch, ItemView } from "@/types/Item";
import { ItemsList } from "@/types/User";

const apiService = new ApiService();

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

export const useFetchItem = (itemId: number) => {
    return useQuery({
        queryKey: ["item", itemId],
        queryFn: async () => {
            return await apiService.get<{ data: ItemView }>(`items/${itemId}`, {});
        },
        retry: false,
    });
};

export const useFetchMyPurchases = () => {
    return useQuery({
        queryKey: ["myPurchases"],
        queryFn: async () => {
            return await apiService.get<Record<string, any>>("/my/purchases", {});
        },
        retry: false,
    });
};

export const useFetchMySales = () => {
    return useQuery({
        queryKey: ["mySales"],
        queryFn: async () => {
            return await apiService.get<Record<string, any>>("/my/sales", {});
        },
        retry: false,
    });
};
