import ItemViewBottomBar from "@/components/molecules/ItemView/ItemViewBottomBar";
import { ReactNode } from "react";

type ItemViewLayout = {
    children: ReactNode;
    type: string;
    price: number;
    sellerId: number;
    itemId: number;
    myId: number;
};

const ItemViewLayout = ({ children, type, price, sellerId, itemId, myId }: ItemViewLayout) => {
    return (
        <>
            {children}
            <ItemViewBottomBar
                type={type}
                price={price}
                sellerId={sellerId}
                itemId={itemId}
                myId={myId}
            />
        </>
    );
};

export default ItemViewLayout;
