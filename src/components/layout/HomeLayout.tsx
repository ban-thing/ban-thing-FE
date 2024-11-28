import HomeHeader from "@/components/atoms/HomeHeader";
import NavigationBar from "@/components/atoms/NavigationBar";
import { ReactNode } from "react";
import { ItemPlusButton } from "@/components/atoms/Button";

type HomeLayoutProps = {
    children: ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
    return (
        <>
            <HomeHeader />
            {children}

            <ItemPlusButton />
            <NavigationBar />
        </>
    );
};

export default HomeLayout;
