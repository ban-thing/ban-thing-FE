import {
    ItemBox,
    ItemPhoto,
    ItemPropertiesBox,
    ItemTitle,
    ItemProp,
    ItemPropDot,
    ItemPrice,
    ItemBoxRight,
} from "@/components/atoms/ItemInList";
import timeAgo from "@/utils/TimeAgo";
import { useNavigate } from "react-router-dom";

type ItemInListProps = {
    itemId: number;
    title: string;
    location: string;
    updatedAt: Date; //Date로 수정
    type: string;
    price: number;
};

export default function ItemInList({
    itemId,
    title,
    location,
    updatedAt,
    type,
    price,
}: ItemInListProps) {
    const cutOffTitle = title.length > 24 ? title.slice(0, 24) + "..." : title;
    const navigate = useNavigate();
    const onClickBox = (itemId: number) => {
        navigate(`item-view/${itemId}`);
    };
    return (
        <ItemBox onClick={() => onClickBox(itemId)}>
            <ItemPhoto />
            <ItemBoxRight>
                <ItemTitle>{cutOffTitle}</ItemTitle>
                <ItemPropertiesBox>
                    <ItemProp>{location}</ItemProp>
                    <ItemPropDot />
                    <ItemProp>{timeAgo(updatedAt)}</ItemProp>
                    <ItemPropDot />
                    <ItemProp>{type}</ItemProp>
                </ItemPropertiesBox>
                <ItemPrice>{price.toLocaleString("en-US")}원</ItemPrice>
            </ItemBoxRight>
        </ItemBox>
    );
}
