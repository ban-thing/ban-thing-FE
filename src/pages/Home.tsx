import { ModalBase } from "@/components/atoms/ModalBackground";
import HomeLayout from "@/components/layout/HomeLayout";
import ItemList from "@/components/layout/ItemList";
import { useFetchItemsList } from "@/hooks/api/ItemsQuery";
import { useDropdownModalStore } from "@/store/ModalStore";
import { getCookie } from "@/utils/Cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const { isDropdownOpen } = useDropdownModalStore();
    const { data: { data } = {}, isLoading } = useFetchItemsList({
        keyword: "",
        hashtags: "",
        minPrice: 0,
        maxPrice: 5000000000,
        address: "논현동",
    });

    useEffect(() => {
        // 하루에 한번 로그인창으로 이동
        const lastChecked = localStorage.getItem("lastChecked");
        const currentTime = new Date().getTime();
        const oneDayInMs = 24 * 60 * 60 * 1000;

        if (!lastChecked || currentTime - Number(lastChecked) > oneDayInMs) {
            const authCookie = getCookie("Authorization_banthing");
            if (!authCookie) navigate("/login");
            localStorage.setItem("lastChecked", String(currentTime));
        }
    }, []);

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
