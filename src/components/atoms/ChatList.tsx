import styled from "styled-components";
import PointIcon from "@/assets/icons/point.svg?react";
import type { ChatList as ChatListType } from "@/types/Chat";
import timeAgo from "@/utils/TimeAgo";
import notFound from "@/assets/noPhotoImage.svg";
import { setImgUrl } from "@/utils/SetImageUrl";

interface ChatListItemProps {
    chat: ChatListType;
    onClick: (chatRoomId: number) => void;
}

export default function ChatList({ chat, onClick }: ChatListItemProps) {
    return (
        <ChatItemContainer onClick={() => onClick(chat.chatRoomId)}>
            <ProfileImage
                src={
                    chat.itemImg
                        ? setImgUrl(
                              Number(chat.chatRoomId),
                              chat.itemImg?.split(".")[0],
                              chat.itemImg?.split(".")[1],
                          )
                        : notFound
                }
            />
            <ChatInfo>
                <UserDetails>
                    <UserName>{chat.nickname}</UserName>
                    <UserLocation>{chat.address.slice(-3)}</UserLocation>
                    <PointIcon />
                    {chat.latestMessageDateTime && (
                        <TimeAgo>{timeAgo(chat.latestMessageDateTime)}</TimeAgo>
                    )}
                </UserDetails>
                <Message>{chat.latestMessage}</Message>
            </ChatInfo>
            {chat.unreadMessageCount > 0 && <UnreadBadge>{chat.unreadMessageCount}</UnreadBadge>}
        </ChatItemContainer>
    );
}

const ChatItemContainer = styled.div`
    display: flex;
    align-items: center;
    height: 59px;
    padding: 20px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    cursor: pointer;
    &:last-child {
        border-bottom: none;
    }
`;

const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 8px;
    margin-right: 12px;
`;

const ChatInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const UserDetails = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

const UserName = styled.div`
    font-weight: bold;
    font-size: 16px;
`;

const UserLocation = styled.div`
    color: var(--color-black-5);
    font-size: 12px;
`;

const TimeAgo = styled.div`
    color: var(--color-black-5);
    font-size: 12px;
`;

const Message = styled.div`
    font-size: 14px;
    color: #333;
    margin-top: 4px;
`;

const UnreadBadge = styled.div`
    background-color: #007bff;
    color: white;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
`;
