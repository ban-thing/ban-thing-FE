import HomeHeader from "@/components/atoms/HomeHeader";
import NavigationBar from "@/components/atoms/NavigationBar";
import { ReactNode } from "react";
import { MySellButton } from "@/components/molecules/MySellButton";

type HomeLayoutProps = {
    children: ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
    return (
        <>
            <HomeHeader />
            {children}
            <NavigationBar children={<MySellButton />} />
        </>
    );
};

export default HomeLayout;
