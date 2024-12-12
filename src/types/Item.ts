import { UserPurchasesList } from "./User";

// 상품 등록/수정
export type Item = {
    title: string;
    content: string;
    type: string;
    price: number;
    directLocation: string;
    address: string;
    itemImgs?: string[];
    hashtags: string[];
    clnPollution: string;
    clnTimeUsed: string;
    clnPurchasedDate?: string;
    clnCleaned: string;
    clnExpire: string;
    isDirect: boolean;
};
// 상품 검색
export type ItemSearch = {
    keyword: string;
    hashtags: string[];
    minPrice?: number;
    maxPrice?: number;
    address: string;
};
// 상품 검색 결과 조회
export type ItemSearchList = UserPurchasesList;
// 상품 단건 조회
export type ItemView = Item & {
    sellerImgUrl: string;
    sellerNickname: string;
    updatedAt: Date;
};
