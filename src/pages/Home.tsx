import { ModalBase } from "@/components/atoms/ModalBackground";
import HomeLayout from "@/components/layout/HomeLayout";
import ItemList from "@/components/layout/ItemList";
import { useDropdownModalStore } from "@/store/ModalStore";

const Home = () => {
    const { isDropdownOpen } = useDropdownModalStore();
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
                <ItemList />
            </HomeLayout>
        </>
    );
};

export default Home;
