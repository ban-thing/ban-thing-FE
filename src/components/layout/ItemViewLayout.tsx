import ItemViewBottomBar from "@/components/molecules/ItemView/ItemViewBottomBar";
import { ReactNode } from "react";

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
    onWishlistClick,
}: ItemViewLayoutProps) => {
    return (
        <>
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
