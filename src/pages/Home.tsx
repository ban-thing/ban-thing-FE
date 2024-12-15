import { ModalBase } from "@/components/atoms/ModalBackground";
import HomeLayout from "@/components/layout/HomeLayout";
import ItemList from "@/components/layout/ItemList";
import { useFetchItemsList } from "@/hooks/api/ItemsQuery";
import { useDropdownModalStore } from "@/store/ModalStore";

const Home = () => {
    const { isDropdownOpen } = useDropdownModalStore();
    const { data: { data } = {}, isLoading } = useFetchItemsList({
        keyword: "",
        hashtags: "",
        minPrice: 0,
        maxPrice: 5000000000,
        address: "",
    });

    return (
        <>
            <HomeLayout>
                {isDropdownOpen && (
                    <ModalBase
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ duration: 0.15 }}
                        $maxWidth="375px"
                    />
                )}
                <ItemList isHome={true} data={data?.items} isLoading={isLoading} />
            </HomeLayout>
        </>
    );
};

export default Home;
