// 채팅 목록 조회
export type ChatList = {
    chatroomId: number;
    profileImgUrl: string;
    nickname: string;
    latestMessage: string;
    latestMessageDateTime: Date;
    unreadMessageCount: number;
    address: string;
    type: string; // 판매/구매
};
