// 채팅 목록 조회
export type ChatList = {
    chatRoomId: number;
    profileImg: string;
    nickname: string;
    latestMessage: string;
    latestMessageDateTime: Date;
    unreadMessageCount: number;
    address: string;
    type: string; // 판매/구매
};
