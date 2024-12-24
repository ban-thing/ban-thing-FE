import { useState } from "react";
import styled from "styled-components";
import BackIcon from "@/assets/icons/back.svg?react";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
    $active: boolean;
}

interface TabBarProps {
    tabsList: string[];
    initTab: string;
    handleTabClick: (tab: string) => void;
}

export default function TabBar({ tabsList, initTab, handleTabClick }: TabBarProps) {
    const [activeTab, setActiveTab] = useState<string>(initTab);
    const navigate = useNavigate();

    const handleButtonClick = (tab: string): void => {
        setActiveTab(tab);
        handleTabClick(tab);
    };

    return (
        <TabBarWrapper>
            <BackButton onClick={() => navigate("/my-page")}>
                <BackIcon />
            </BackButton>
            <ButtonGroup>
                {tabsList.map((tab) => (
                    <Button
                        key={tab}
                        $active={activeTab === tab}
                        onClick={() => handleButtonClick(tab)}
                    >
                        {tab}
                    </Button>
                ))}
            </ButtonGroup>
        </TabBarWrapper>
    );
}

const TabBarWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 375px;
    background: white;
`;

const BackButton = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-187.5px);
    cursor: pointer;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    background: white;
    z-index: 100;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex: 1;
    height: auto;
    background: white;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
`;

const Button = styled.button<ButtonProps>`
    padding: 19px 20px 14px;
    width: 100%;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 18px;
    color: ${({ $active }) => ($active ? "black" : "gray")};
    font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
    border-bottom: 2px solid ${({ $active }) => ($active ? "black" : "transparent")};
`;
