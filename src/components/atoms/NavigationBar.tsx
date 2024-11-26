import styled from "styled-components";
// import { useState } from "react";
// import HomeIcon from "../../assets/icons/home.svg?react";
// import HomeActiveIcon from "../../assets/icons/homeActive.svg?react";
// import SearchIcon from "../../assets/icons/search.svg?react";
// import SearchActiveIcon from "../../assets/icons/searchActive.svg?react";
// import ChatIcon from "../../assets/icons/check0.svg?react";
// import ChatActiveIcon from "../../assets/icons/check0Active.svg?react";
// import PetsIcon from "../../assets/icons/footPrint.svg?react";
// import PetsActiveIcon from "../../assets/icons/footPrintActive.svg?react";

// const NavigationBar = () => {
//     const [activeTab, setActiveTab] = useState("home");

//     return (
//         <NavContainer>
//             <NavButton activeTab={activeTab === "home"} onClick={() => setActiveTab("home")}>
//                 {activeTab === "home" ? <HomeActiveIcon /> : <HomeIcon />}
//                 <span>홈</span>
//             </NavButton>
//             <NavButton activeTab={activeTab === "search"} onClick={() => setActiveTab("search")}>
//                 {activeTab === "search" ? <SearchActiveIcon /> : <SearchIcon />}
//                 <span>검색</span>
//             </NavButton>
//             <NavButton activeTab={activeTab === "chat"} onClick={() => setActiveTab("chat")}>
//                 {activeTab === "chat" ? <ChatActiveIcon /> : <ChatIcon />}
//                 <span>채팅</span>
//             </NavButton>
//             <NavButton activeTab={activeTab === "my"} onClick={() => setActiveTab("my")}>
//                 {activeTab === "my" ? <PetsActiveIcon /> : <PetsIcon />}
//                 <span>마이</span>
//             </NavButton>
//         </NavContainer>
//     );
// };

export const NavContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #eee;
`;

interface NavButtonProps {
    activeTab: boolean;
}

export const NavButton = styled.button<NavButtonProps>`
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
        color: ${(props) => (props.activeTab ? "var(--color-main-1)" : "var(--color-black-6)")};
    }
`;
