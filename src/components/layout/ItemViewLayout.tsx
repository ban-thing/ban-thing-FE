import ItemViewBottomBar from "@/components/molecules/ItemView/ItemViewBottomBar";
import { ReactNode } from "react";
import styled from "styled-components";

type ItemViewLayoutProps = {
    children: ReactNode;
    type: string;
    price: number;
    sellerId: number;
    itemId: number;
    myId: number;
    status?: string;
    wishlisted?: boolean;
    wishlistCount?: number;
    onWishlistClick?: (isAdding: boolean) => void;
    onClickBack?: () => void;
    onClickHome?: () => void;
    onClickSearch?: () => void;
    onClickLike?: () => void;
    isLiked?: boolean;
};

const StyledItemViewLayout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`;

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
    onWishlistClick,
}: ItemViewLayoutProps) => {
    return (
        <StyledItemViewLayout>
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
        </StyledItemViewLayout>
    );
};

export default ItemViewLayout;
