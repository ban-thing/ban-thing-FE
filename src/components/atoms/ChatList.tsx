import styled from "styled-components";
import PointIcon from "@/assets/icons/point.svg?react";
import type { ChatList as ChatListType } from "@/types/Chat";
import timeAgo from "@/utils/TimeAgo";
import notFound from "@/assets/noPhotoImage.svg";
import { setImgUrl } from "@/utils/SetImageUrl";
import { useEffect } from "react";

interface ChatListItemProps {
    chat: ChatListType;
    onClick: (chatRoomId: number) => void;
}

export default function ChatList({ chat, onClick }: ChatListItemProps) {
    useEffect(() => {
        console.log(chat.itemImg);
    }, [chat.itemImg]);

    const formatDate = (dateString: Date) => {
        // UTC+9 시간 추가 (9시간을 밀리초로 변환)
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
        const koreanDate = new Date(dateString.getTime() + KR_TIME_DIFF);

        const hours = koreanDate.getHours();
        const minutes = koreanDate.getMinutes();

        // 12시간제로 변환
        const ampm = hours >= 12 ? "오후" : "오전";
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${ampm} ${formattedHours}:${formattedMinutes}`;
    };
    return (
        <ChatItemContainer onClick={() => onClick(chat.chatRoomId)}>
            <ProfileImage
                src={
                    Array.isArray(chat.itemImg)
                        ? setImgUrl(
                              chat.chatRoomId,
                              chat.itemImg[0]?.split(".")[0],
                              chat.itemImg[0]?.split(".")[1],
                          )
                        : setImgUrl(
                              chat.chatRoomId,
                              chat.itemImg[0]?.split(".")[0],
                              chat.itemImg[0]?.split(".")[1],
                          )
                }
            />
            <ChatInfo>
                <UserDetails>
                    <UserName>{chat.nickname}</UserName>
                    <UserLocation>{chat.address.slice(-3)}</UserLocation>
                    <PointIcon />
                    {chat.latestMessageDateTime && (
                        <TimeAgo>{formatDate(chat.latestMessageDateTime)}</TimeAgo>
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
