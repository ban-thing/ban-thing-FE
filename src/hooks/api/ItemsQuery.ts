import { useQuery } from "@tanstack/react-query";
import ApiService from "@/utils/ApiService";

const apiService = new ApiService();

export const useFetchItems = (keywords: any) => {
    return useQuery({
        queryKey: ["items", keywords], // 쿼리 키에 keywords 추가
        queryFn: async () => {
            return await apiService.get<any>("items", { keywords });
        },
    });
};

// const { data, error, isLoading } = useFetchItems("search keyword");
