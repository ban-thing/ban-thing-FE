import styled from "styled-components";
import { useState } from "react";
import HomeIcon from "../../assets/icons/home.svg?react";
import HomeActiveIcon from "../../assets/icons/homeActive.svg?react";
import SearchIcon from "../../assets/icons/search.svg?react";
import SearchActiveIcon from "../../assets/icons/searchActive.svg?react";
import ChatIcon from "../../assets/icons/check0.svg?react";
import ChatActiveIcon from "../../assets/icons/check0Active.svg?react";
import PetsIcon from "../../assets/icons/footPrint.svg?react";
import PetsActiveIcon from "../../assets/icons/footPrintActive.svg?react";

interface NavButtonProps {
    $activeTab: boolean;
}
export default function NavigationBar() {
    const [$activeTab, set$activeTab] = useState("home");

    return (
        <NavContainer>
            <NavButton $activeTab={$activeTab === "home"} onClick={() => set$activeTab("home")}>
                {$activeTab === "home" ? <HomeActiveIcon /> : <HomeIcon />}
                <span>홈</span>
            </NavButton>
            <NavButton $activeTab={$activeTab === "search"} onClick={() => set$activeTab("search")}>
                {$activeTab === "search" ? <SearchActiveIcon /> : <SearchIcon />}
                <span>검색</span>
            </NavButton>
            <NavButton $activeTab={$activeTab === "chat"} onClick={() => set$activeTab("chat")}>
                {$activeTab === "chat" ? <ChatActiveIcon /> : <ChatIcon />}
                <span>채팅</span>
            </NavButton>
            <NavButton $activeTab={$activeTab === "my"} onClick={() => set$activeTab("my")}>
                {$activeTab === "my" ? <PetsActiveIcon /> : <PetsIcon />}
                <span>마이</span>
            </NavButton>
        </NavContainer>
    );
}

const NavContainer = styled.div`
    width: 375px;
    height: 60px;
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #eee;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
`;

const NavButton = styled.button<NavButtonProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;

    span {
        font-size: 12px;
        color: ${(props) => (props.$activeTab ? "#343434" : "var(--color-black-6)")};
    }
`;
