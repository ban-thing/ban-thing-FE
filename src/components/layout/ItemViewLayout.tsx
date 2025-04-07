import ItemViewBottomBar from "@/components/molecules/ItemView/ItemViewBottomBar";
import { ReactNode } from "react";

type ItemViewLayout = {
    children: ReactNode;
    type: string;
    price: number;
    sellerId: number;
    itemId: number;
    myId: number;
    status: string;
    wishlisted?: boolean;
    wishlistCount?: number;
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
}: ItemViewLayout) => {
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
            />
        </>
    );
};

export default ItemViewLayout;
