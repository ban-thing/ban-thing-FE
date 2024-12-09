import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatList from "@/components/atoms/ChatList";
import NavigationBar from "@/components/atoms/NavigationBar";
import TabBar from "@/components/atoms/TabBar";
import { dummyChatList } from "@/store/ChatListDummyData";
import styled from "styled-components";

const tabsList = ["전체", "판매", "구매"];

export default function ChattingList() {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState("전체");

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };

    const filteredChatList = dummyChatList.filter((chat) => {
        if (selectedTab === "전체") return true;
        return chat.type === selectedTab;
    });

    const onClickBox = (chatroomId: number) => {
        navigate(`/chatting/${chatroomId}`);
    };

    return (
        <ChattingListContainer>
            <FixedTabBar>
                <TabBar tabsList={tabsList} initTab={selectedTab} handleTabClick={handleTabClick} />
            </FixedTabBar>
            <ChatListContainer>
                {filteredChatList.map((chat) => (
                    <ChatList key={chat.chatroomId} chat={chat} onClick={onClickBox} />
                ))}
            </ChatListContainer>
            <FixedNavigationBar>
                <NavigationBar />
            </FixedNavigationBar>
        </ChattingListContainer>
    );
}

const ChattingListContainer = styled.div`
    padding-top: 62px;
    padding-bottom: 57px;
    min-height: 100vh;
`;

const FixedTabBar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: white;
`;

const ChatListContainer = styled.div`
    width: 100%;
`;

const FixedNavigationBar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1000;
    background: white;
`;
