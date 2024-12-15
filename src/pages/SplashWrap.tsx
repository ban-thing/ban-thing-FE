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
    const [loading, setLoading] = useState(true);
    const [showSplash, setShowSplash] = useState(false);

    useEffect(() => {
        const lastShown = cookies.splashLastShown;
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        if (!lastShown || new Date(lastShown) < oneWeekAgo) {
            setShowSplash(true);
            setCookie("splashLastShown", new Date().toISOString(), { path: "/", maxAge: 604800 }); // 7일간 유지

            setTimeout(() => {
                setShowSplash(false);
                setLoading(false);
            }, 2000);
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return null;
    }

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
