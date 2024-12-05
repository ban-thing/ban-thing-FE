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
import { MouseEvent } from "react";

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
    imgUrl,
    viewEditButton = false,
}: ItemInListProps) {
    const cutOffTitle = title.length > 24 ? title.slice(0, 24) + "..." : title;
    const navigate = useNavigate();
    const onClickBox = (itemId: number) => {
        navigate(`/item-view/${itemId}`);
    };
    const onClickEdit = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        console.log("수정삭제버튼");
    };
    return (
        <ItemBox onClick={() => onClickBox(itemId)}>
            <ItemPhoto src={imgUrl || notFound} />
            <ItemBoxRight $maxWidth={viewEditButton ? "155px" : ""}>
                <ItemTitle>{cutOffTitle}</ItemTitle>
                <ItemPropertiesBox>
                    <ItemProp>{address}</ItemProp>
                    <ItemPropDot />
                    <ItemProp>{timeAgo(updatedAt)}</ItemProp>
                    <ItemPropDot />
                    <ItemProp>{type}</ItemProp>
                </ItemPropertiesBox>
                <ItemPrice>{price.toLocaleString("en-US")}원</ItemPrice>
            </ItemBoxRight>
            {viewEditButton && (
                <ItemEditButton onClick={onClickEdit}>
                    <EditBtn />
                </ItemEditButton>
            )}
        </ItemBox>
    );
}
