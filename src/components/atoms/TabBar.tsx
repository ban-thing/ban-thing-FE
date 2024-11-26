import { useState } from "react";
import styled from "styled-components";

const TABS = ["전체", "구매", "판매"] as const;
type TabBarProps = (typeof TABS)[number];

interface ButtonProps {
    active: boolean;
}

export default function TabBar() {
    const [activeTab, setActiveTab] = useState<TabBarProps>("전체");

    const handleButtonClick = (tab: TabBarProps): void => {
        setActiveTab(tab);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <ButtonGroup>
                {TABS.map((tab) => (
                    <Button
                        key={tab}
                        active={activeTab === tab}
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
`;

const Button = styled.button<ButtonProps>`
    padding: 10px 20px;
    width: 100%;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${({ active }) => (active ? "black" : "gray")};
    font-weight: ${({ active }) => (active ? "bold" : "normal")};
    border-bottom: 2px solid ${({ active }) => (active ? "black" : "transparent")};
`;
