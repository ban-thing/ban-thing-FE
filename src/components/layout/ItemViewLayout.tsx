import ItemViewBottomBar from "@/components/molecules/ItemView/ItemViewBottomBar";
import { ReactNode, useState } from "react";
import styled from "styled-components";
import { Toast } from "../atoms/Toast";
import BackIcon from "@/assets/icons/back.svg?react";
import HomeIcon from "@/assets/icons/home.svg?react";
import SearchIcon from "@/assets/icons/search.svg?react";
import HeartIcon from "@/components/atoms/HeartIcon";

const ItemViewHeader = styled.header`
    height: 50px;
    width: 100%;
    max-width: 375px;
    padding: 14px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    position: fixed;
    top: 0;
    z-index: 15;
`;

const HeaderButtonGroup = styled.div`
    display: flex;
    gap: 16px;
`;

const BackButton = styled.button`
    padding: 0;
`;

const HomeButton = styled.button`
    padding: 0;
`;

const SearchButton = styled.button`
    padding: 0;
`;

const LikeButton = styled.button`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 375px;
    height: 60px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-top: 1px solid #eee;
`;

const LikePrice = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #111;
`;

type ItemViewLayoutProps = {
    children: ReactNode;
    type: string;
    price: number;
    sellerId: number;
    itemId: number;
    myId: number;
    status: string;
    wishlisted?: boolean;
    wishlistCount?: number;
    onClickBack?: () => void;
    onClickHome?: () => void;
    onClickSearch?: () => void;
    onClickLike?: () => void;
    isLiked?: boolean;
};

const ItemViewLayout = ({
    children,
    type,
    price,
    sellerId,
    itemId,
    myId,
    status,
    wishlisted = false,
    wishlistCount = 0,
    onClickBack,
    onClickHome,
    onClickSearch,
    onClickLike,
    isLiked,
}: ItemViewLayoutProps) => {
    const [showToast, setShowToast] = useState(false);

    const handleLikeClick = () => {
        if (onClickLike) {
            onClickLike();
            if (!isLiked) {
                setShowToast(true);
            }
        }
    };

    return (
        <>
            <ItemViewHeader>
                <BackButton onClick={onClickBack}>
                    <BackIcon />
                </BackButton>
                <HeaderButtonGroup>
                    <HomeButton onClick={onClickHome}>
                        <HomeIcon />
                    </HomeButton>
                    <SearchButton onClick={onClickSearch}>
                        <SearchIcon />
                    </SearchButton>
                </HeaderButtonGroup>
            </ItemViewHeader>
            {children}
            <ItemViewBottomBar
                type={type}
                price={price}
                sellerId={sellerId}
                itemId={itemId}
                myId={myId}
                status={status}
                wishlisted={wishlisted}
                wishlistCount={wishlistCount}
                onWishlistClick={() => setShowToast(true)}
            />
            <LikeButton onClick={handleLikeClick}>
                <HeartIcon isLiked={isLiked} />
                <LikePrice>5,000원</LikePrice>
            </LikeButton>
            <Toast 
                message="나의 찜에 추가했어요"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </>
    );
};

export default ItemViewLayout;
