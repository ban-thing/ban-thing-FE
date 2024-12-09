import ItemViewBottomBar from "@/components/molecules/ItemView/ItemViewBottomBar";
import { ReactNode } from "react";

type ItemViewLayout = {
    children: ReactNode;
    type: string;
    price: number;
};

const ItemViewLayout = ({ children, type, price }: ItemViewLayout) => {
    return (
        // 스켈레톤은 아니지만 로딩상태 반영
        <>
            {children}
            {true ? <ItemViewBottomBar type={type} price={price} /> : <></>}
        </>
    );
};

export default ItemViewLayout;
