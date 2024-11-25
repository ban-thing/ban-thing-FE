// 프로필 조회
export type UserProfile = {
    userId: number;
    nickname: string;
    email: string;
    profileImgUrl: string;
    address1: string;
    address2: string;
    address3: string;
};
// 주소 등록/수정
export type Address = Pick<UserProfile, "address1" | "address2" | "address3">;

// 구매 목록 조회
export type UserPurchasesList = ItemsList & {
    type: string; // 나눔/판매
};
// 판매 목록 조회
export type UserSalesList = ItemsList & {
    status: string; // 판매여부
};

type ItemsList = {
    itemId: number;
    title: string;
    imgUrl: string;
    price: number;
    address: string;
    updatedAt: Date;
};
