import styled from "styled-components";
import { UserProfile } from "../../types/User";

interface ChatListItemProps {
    user: UserProfile;
    message: string;
    timeAgo: number;
    unreadCount: number;
}

export default function ChatList({ user, message, timeAgo, unreadCount }: ChatListItemProps) {
    return (
        <ChatItemContainer>
            <ProfileImage src={user.profileImgUrl} />
            <ChatInfo>
                <UserDetails>
                    <UserName>{user.nickname}</UserName>
                    <UserLocation>{user.address1}</UserLocation>
                    <TimeAgo>{timeAgo}일 전</TimeAgo>
                </UserDetails>
                <Message>{message}</Message>
            </ChatInfo>
            {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
        </ChatItemContainer>
    );
}

const ChatItemContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #eee;
    background-color: #f9f9f9;
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
    gap: 5px;
`;

const UserName = styled.div`
    font-weight: bold;
    font-size: 16px;
`;

const UserLocation = styled.div`
    color: gray;
    font-size: 12px;
`;

const TimeAgo = styled.div`
    color: gray;
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
