import HomeHeader from "@/components/atoms/HomeHeader";
import NavigationBar from "@/components/atoms/NavigationBar";
import { ReactNode } from "react";
import { MySellButton } from "@/components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

type HomeLayoutProps = {
    children: ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
    const navigate = useNavigate();
    const [showPlus, setShowPlus] = useState(false);
    const handleScroll = () => {
        // 현재 스크롤 위치가 최상단인지 확인
        const isTop = window.scrollY === 0;
        setShowPlus(!isTop);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const onClickSellButton = () => {
        navigate("/item-register");
    };

    return (
        <>
            <HomeHeader />
            {children}
            <NavigationBar
                children={
                    <MySellButton
                        onClick={onClickSellButton}
                        showPlus={showPlus}
                        className={showPlus ? "small" : ""}
                    />
                }
            />
        </>
    );
};

export default HomeLayout;
