import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatList from "@/components/atoms/ChatList";
import NavigationBar from "@/components/atoms/NavigationBar";
import TabBar from "@/components/atoms/TabBar";
import styled from "styled-components";
import NoItemInList from "@/components/molecules/ItemView/NoItemInList";
import ClipLoader from "react-spinners/ClipLoader";
import { useChatsListQuery } from "@/hooks/api/ChatsQuery";

const tabsList = ["전체", "판매", "구매"];

export default function ChattingList() {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState("전체");
    const { data, isLoading } = useChatsListQuery();

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };

    const filteredChatList = Array.isArray(data)
        ? data.filter((chat) => {
              if (selectedTab === "전체") return true;
              return chat.type === selectedTab;
          })
        : [];

    const onClickBox = (chatroomId: number) => {
        navigate(`/chats/${chatroomId}`);
    };

    return (
        <ChattingListContainer>
            <FixedTabBar>
                <TabBar tabsList={tabsList} initTab={selectedTab} handleTabClick={handleTabClick} />
            </FixedTabBar>
            <ChatListContainer $isLoading={isLoading} $isEmpty={filteredChatList.length === 0}>
                {!isLoading ? (
                    filteredChatList.length ? (
                        filteredChatList.map((chat) => (
                            <ChatList key={chat.chatRoomId} chat={chat} onClick={onClickBox} />
                        ))
                    ) : (
                        <NoItemInList text="앗! 채팅 내역이 없어요." />
                    )
                ) : (
                    <ClipLoader />
                )}
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
    width: 100%;
`;

const FixedTabBar = styled.div`
    position: fixed;
    width: 375px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    background: white;
`;

const ChatListContainer = styled.div<{ $isLoading: boolean; $isEmpty: boolean }>`
    height: 100%;
    width: 100%;
    ${({ $isLoading, $isEmpty }) =>
        $isLoading || $isEmpty
            ? `display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;`
            : ""}
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
