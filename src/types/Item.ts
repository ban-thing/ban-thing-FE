import { UserPurchasesList } from "./User";

// 상품 등록/수정
export type CreateItem = {
    title: string;
    content: string;
    type: string;
    price: number;
    directLocation: string;
    address: string;
    itemImgs?: string[];
    photos?: any[];
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
    hashtags: string[] | string;
    minPrice?: number;
    maxPrice?: number;
    address: string;
};
// 상품 검색 결과 조회
export type ItemSearchList = UserPurchasesList;

// 상품 단건 조회
export interface ItemView {
    title: string;
    content: string;
    sellerImgUrl: SellerImgUrl;
    sellerNickname: string;
    type: string;
    price: number;
    directLocation: string;
    address: string;
    itemImgs: any[];
    hashtags: Hashtag[];
    cleaningDetail: CleaningDetail;
    updateTime: string;
    direct: boolean;
    sellerId?: number;
}

interface CleaningDetail {
    pollution: string;
    timeUsed: string;
    purchasedDate: string;
    cleaned: string;
    expire: string;
}

interface Hashtag {
    id: number;
    hashtag: string;
}

interface SellerImgUrl {
    id: number;
    data: string;
    type: string;
}
