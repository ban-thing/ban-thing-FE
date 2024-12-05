import { useState } from "react";
import styled from "styled-components";

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

    const handleButtonClick = (tab: string): void => {
        setActiveTab(tab);
        handleTabClick(tab);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
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
        </div>
    );
}

const ButtonGroup = styled.div`
    display: flex;
    height: auto;
    width: 375px;
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
