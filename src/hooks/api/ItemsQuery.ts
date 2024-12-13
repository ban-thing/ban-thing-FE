import { useQuery } from "@tanstack/react-query";
import ApiService from "@/utils/ApiService";
import { ItemSearch } from "@/types/Item";
import { ItemsList } from "@/types/User";

const apiService = new ApiService();

//TODO: 반환값 any 수정
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
            return await apiService.get<any>("items", {
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
            return await apiService.get<any>(`items/${itemId}`, {});
        },
        retry: false,
    });
};
