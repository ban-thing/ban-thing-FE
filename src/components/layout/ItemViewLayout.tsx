import ItemViewBottomBar from "@/components/molecules/ItemViewBottomBar";
import { ReactNode } from "react";

type ItemViewLayout = {
    children: ReactNode;
};

const ItemViewLayout = ({ children }: ItemViewLayout) => {
    return (
        <>
            {/* TODO: 상단바 추가? */}
            {children}
            <ItemViewBottomBar />
        </>
    );
};

export default ItemViewLayout;
