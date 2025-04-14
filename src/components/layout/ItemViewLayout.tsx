import ItemViewBottomBar from "@/components/molecules/ItemView/ItemViewBottomBar";
import { ReactNode } from "react";
import styled from "styled-components";
import BackIcon from "@/assets/icons/back.svg?react";
import HomeIcon from "@/assets/icons/home.svg?react";
import SearchIcon from "@/assets/icons/search.svg?react";

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
    onWishlistClick?: () => void;
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
    onWishlistClick,
}: ItemViewLayoutProps) => {
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
                onWishlistClick={onWishlistClick}
            />
        </>
    );
};

export default ItemViewLayout;

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