import { ModalBase } from "@/components/atoms/ModalBackground";
import HomeLayout from "@/components/layout/HomeLayout";
import ItemList from "@/components/layout/ItemList";
import { useFetchItemsList } from "@/hooks/api/ItemsQuery";
import { useDropdownModalStore } from "@/store/ModalStore";
import { getCookie } from "@/utils/Cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchMyProfile } from "@/hooks/api/UsersQuery";
import { useSelectedAddressStore } from "@/store/SelectedAddressStore";
import { ClipLoader } from "react-spinners";

const Home = () => {
    const navigate = useNavigate();
    const { isDropdownOpen } = useDropdownModalStore();
    const { data: profileData, isLoading: isProfileLoading } = useFetchMyProfile();
    const { selectedAddress } = useSelectedAddressStore();

    const {
        data: { data } = {},
        isLoading: isItemsLoading,
        refetch,
    } = useFetchItemsList({
        keyword: "",
        hashtags: "",
        minPrice: 0,
        maxPrice: 5000000000,
        address: selectedAddress || profileData?.data?.address1 || "",
    });

    const isLoading = isProfileLoading || isItemsLoading || !selectedAddress;

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

    useEffect(() => {
        if (selectedAddress) {
            refetch();
        }
    }, [selectedAddress, refetch]);

    return (
        <>
            {!isLoading ? (
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
            ) : (
                <div
                    style={{
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ClipLoader size={48} color="#d7d7d7" />
                </div>
            )}
        </>
    );
};

export default Home;
