// 채팅 목록 조회
export type ChatList = {
    chatRoomId: number;
    address: string;
    profileImg: string;
    nickname: string;
    latestMessage: string;
    latestMessageDateTime: Date;
    unreadMessageCount: number;
    type: string; // 판매/구매
};
// 채팅방 생성
export type ChatRoomCreate = {
    sellerId: number;
    itemId: number;
};
// 채팅 대화 내용, 아이템 정보 조회
export type ChatRoomView = {
    itemId: number;
    title: string;
    price: number;
    itemImage: string[];
    messages: {
        senderId: number;
        message: string;
        time: Date;
    }[];
    hasNext: boolean;
};
