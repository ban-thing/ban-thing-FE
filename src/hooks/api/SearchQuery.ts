import { useQuery } from "@tanstack/react-query";
import ApiService from "@/utils/ApiService";
import { ItemSearchList } from "@/types/Item";

const apiService = new ApiService();

export const useItemSearchQuery = (searchParams: {
    keyword: string;
    hashtags: string[];
    minPrice?: number;
    maxPrice?: number;
    address?: string;
}) => {
    return useQuery({
        queryKey: ["items", searchParams.keyword],
        queryFn: async () => {
            const response = await apiService.get<{ data: { items: ItemSearchList[] } }>("items", {
                params: searchParams,
            });
            return response.data.items;
        },
        enabled: !!searchParams.keyword,
    });
};
