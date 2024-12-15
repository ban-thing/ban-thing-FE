import styled from "styled-components";
import { ReactNode, useState } from "react";
import HomeIcon from "../../assets/icons/home.svg?react";
import HomeActiveIcon from "../../assets/icons/homeActive.svg?react";
import SearchIcon from "../../assets/icons/search.svg?react";
import SearchActiveIcon from "../../assets/icons/searchActive.svg?react";
import ChatIcon from "../../assets/icons/check0.svg?react";
import ChatActiveIcon from "../../assets/icons/check0Active.svg?react";
import PetsIcon from "../../assets/icons/footPrint.svg?react";
import PetsActiveIcon from "../../assets/icons/footPrintActive.svg?react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "@/utils/Cookie";

interface NavButtonProps {
    $activeTab: boolean;
}

interface NavigationBarProps {
    children?: ReactNode;
}
export default function NavigationBar({ children }: NavigationBarProps) {
    const location = useLocation();
    const initialTab = location.pathname.slice(1) || "home";
    const [$activeTab, set$activeTab] = useState(initialTab);
    const navigate = useNavigate();

    const handleNavigation = (tab: string) => {
        const authCookie = getCookie("Authorization");
        if (!authCookie && tab !== "home" && tab !== "search") return navigate("/login");
        set$activeTab(tab);
        navigate(`/${tab === "home" ? "" : tab}`);
    };

    return (
        <NavContainer>
            <div style={{ height: "100%" }}>
                <NavButton
                    $activeTab={$activeTab === "home"}
                    onClick={() => handleNavigation("home")}
                >
                    {$activeTab === "home" ? <HomeActiveIcon /> : <HomeIcon />}
                    <span>홈</span>
                </NavButton>
                <NavButton
                    $activeTab={$activeTab === "search"}
                    onClick={() => handleNavigation("search")}
                >
                    {$activeTab === "search" ? <SearchActiveIcon /> : <SearchIcon />}
                    <span>검색</span>
                </NavButton>
                <NavButton
                    $activeTab={location.pathname.includes("chatting")}
                    onClick={() => handleNavigation("chatting-list")}
                >
                    {location.pathname.includes("chatting") ? <ChatActiveIcon /> : <ChatIcon />}
                    <span>채팅</span>
                </NavButton>
                <NavButton
                    $activeTab={location.pathname.includes("my-page")}
                    onClick={() => handleNavigation("my-page")}
                >
                    {location.pathname.includes("my-page") ? <PetsActiveIcon /> : <PetsIcon />}
                    <span>마이</span>
                </NavButton>
                {children}
            </div>
        </NavContainer>
    );
}

const NavContainer = styled.nav`
    width: 375px;
    height: 56px;
    background: white;

    border-top: 1px solid #eee;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    & > div {
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
`;

const NavButton = styled.button<NavButtonProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 3px 8px 0 8px;

    span {
        font-size: 12px;
        color: ${(props) => (props.$activeTab ? "#343434" : "var(--color-black-6)")};
    }
`;
