import {
    ItemBox,
    ItemPhoto,
    ItemPropertiesBox,
    ItemTitle,
    ItemProp,
    ItemPropDot,
    ItemPrice,
    ItemBoxRight,
    ItemEditButton,
} from "@/components/atoms/ItemInList";
import timeAgo from "@/utils/TimeAgo";
import { useNavigate } from "react-router-dom";
import notFound from "@/assets/noPhotoImage.svg";
import { ItemSearchList } from "@/types/Item";
import EditBtn from "@/assets/icons/meatballIcon.svg?react";
import { MouseEvent, useState } from "react";
import EditModal from "./MyPage.tsx/EditModal";
import Gps from "@/assets/icons/gps.svg?react";

type ItemInListProps = ItemSearchList & {
    viewEditButton?: boolean;
};

export default function ItemInList({
    itemId,
    title,
    address,
    updatedAt,
    type,
    price,
    images,
    viewEditButton = false,
}: ItemInListProps) {
    const [topPosition, setTopPosition] = useState<number | null>(null);
    const cutOffTitle = title.length > 24 ? title.slice(0, 24) + "..." : title;
    const navigate = useNavigate();
    const onClickBox = (id: number) => {
        navigate(`/item-view/${id}`);
    };
    const onClickEdit = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const buttonRect = event.currentTarget.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const modalHeight = 108;
        const offset = 5;

        const topPosition =
            buttonRect.bottom + offset + modalHeight > viewportHeight
                ? buttonRect.top - modalHeight - offset
                : buttonRect.bottom + offset;

        setTopPosition(topPosition);
    };
    return (
        <>
            <ItemBox onClick={() => onClickBox(itemId || 0)}>
                <ItemPhoto src={images || notFound} />
                <ItemBoxRight $maxWidth={viewEditButton ? "155px" : ""}>
                    <ItemTitle>{cutOffTitle}</ItemTitle>
                    <ItemPropertiesBox>
                        <ItemProp>
                            <Gps /> {address}
                        </ItemProp>
                        <ItemPropDot />
                        <ItemProp>{timeAgo(updatedAt)}</ItemProp>
                        <ItemPropDot />
                        <ItemProp>{type}</ItemProp>
                    </ItemPropertiesBox>
                    <ItemPrice>
                        {type === "판매" ? `${price.toLocaleString("en-US")}원` : "나눔"}
                    </ItemPrice>
                </ItemBoxRight>
                {viewEditButton && (
                    <ItemEditButton onClick={onClickEdit}>
                        <EditBtn />
                    </ItemEditButton>
                )}
            </ItemBox>
            {topPosition && (
                <EditModal
                    setTopPosition={setTopPosition}
                    topPosition={topPosition}
                    itemId={itemId || 0}
                />
            )}
        </>
    );
}
