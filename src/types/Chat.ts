// 채팅 목록 조회
export type ChatList = {
    chatRoomId: number;
    itemId: string;
    address: string;
    itemImg: string;
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
    seller: string;
    buyer: string;
    itemImage: string[] | string;
    messages: {
        senderId: number;
        message: string;
        time: Date;
        imgUrl?: string; // 이미지 URL 필드 추가
    }[];
    hasNext: boolean;
};
