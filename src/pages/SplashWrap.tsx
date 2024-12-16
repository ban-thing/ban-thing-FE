import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import MainLogo from "@/components/atoms/MainLogo";

const SplashBox = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-main-2);
`;

const SplashWrap = ({ children }: { children: React.ReactNode }) => {
    const [cookies, setCookie] = useCookies(["splashLastShown"]);
    const [showSplash, setShowSplash] = useState(false);

    useEffect(() => {
        // 일주일에 한번 스플래시 표시
        const lastShown = cookies.splashLastShown;
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        if (!lastShown || new Date(lastShown) < oneWeekAgo) {
            setShowSplash(true);
            setCookie("splashLastShown", new Date().toISOString(), { path: "/", maxAge: 604800 });

            setTimeout(() => {
                setShowSplash(false);
            }, 2000);
        }
    }, []);

    if (showSplash) {
        return (
            <SplashBox>
                <MainLogo />
            </SplashBox>
        );
    }

    return <>{children}</>;
};

export default SplashWrap;
