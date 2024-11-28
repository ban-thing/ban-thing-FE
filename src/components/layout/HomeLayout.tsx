import HomeHeader from "@/components/atoms/HomeHeader";
import NavigationBar from "@/components/atoms/NavigationBar";
import { ReactNode } from "react";

type HomeLayoutProps = {
    children: ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
    return (
        <>
            <HomeHeader />
            {children}
            <NavigationBar />
        </>
    );
};

export default HomeLayout;
