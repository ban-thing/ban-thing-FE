import ItemViewBottomBar from "@/components/molecules/ItemView/ItemViewBottomBar";
import { ReactNode } from "react";

type ItemViewLayout = {
    children: ReactNode;
    type: string;
    price: number;
};

const ItemViewLayout = ({ children, type, price }: ItemViewLayout) => {
    return (
        <>
            {/* TODO: 상단바 추가? */}
            {children}
            <ItemViewBottomBar type={type} price={price} />
        </>
    );
};

export default ItemViewLayout;
