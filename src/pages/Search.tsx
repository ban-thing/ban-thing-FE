import ItemList from "@/components/layout/ItemList";
import SearchLayout from "@/components/layout/SearchLayout";
import { useFetchItemsList } from "@/hooks/api/ItemsQuery";

export default function Search() {
    const { data: { data } = {}, isLoading } = useFetchItemsList({
        keyword: "",
        hashtags: "",
        minPrice: 0,
        maxPrice: 5000000000,
        address: "",
    });
    return (
        <SearchLayout>
            <ItemList data={data?.items} isLoading={isLoading} />
        </SearchLayout>
    );
}
