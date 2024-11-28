import { ModalBase } from "@/components/atoms/ModalBackground";
import HomeLayout from "@/components/layout/HomeLayout";
import { useDropdownModalStore } from "@/store/ModalStore";

const Home = () => {
    const { isDropdownOpen } = useDropdownModalStore();
    return (
        <>
            <HomeLayout>
                {isDropdownOpen && <ModalBase opacity={0.4} />}
                <div>HOME</div>
            </HomeLayout>
        </>
    );
};

export default Home;
