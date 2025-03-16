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
    ItemPhotoWrap,
    ItemSoldOut,
} from "@/components/atoms/ItemInList";
import timeAgo from "@/utils/TimeAgo";
import { useNavigate } from "react-router-dom";
import notFound from "@/assets/noPhotoImage.svg?url";
import { ItemSearchList } from "@/types/Item";
import EditBtn from "@/assets/icons/meatballIcon.svg?react";
import { MouseEvent, useState } from "react";
import EditModal from "./MyPage.tsx/EditModal";
import Gps from "@/assets/icons/gps.svg?react";
import { setImgUrl } from "@/utils/SetImageUrl";

type ItemInListProps = ItemSearchList & {
    viewEditButton?: boolean;
    status?: string;
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
    status,
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
                <ItemPhotoWrap>
                    <ItemPhoto
                        src={
                            images
                                ? setImgUrl(
                                      Number(itemId),
                                      images?.split(".")[0],
                                      images?.split(".")[1],
                                  )
                                : notFound
                        }
                    />
                    {status === "판매완료" && <ItemSoldOut>거래완료</ItemSoldOut>}
                </ItemPhotoWrap>
                <ItemBoxRight $maxWidth={viewEditButton ? "170px" : ""}>
                    <ItemTitle>{cutOffTitle}</ItemTitle>
                    <ItemPropertiesBox>
                        <ItemProp>
                            <Gps /> {address ? address.slice(-3) : ""}
                        </ItemProp>
                        <ItemPropDot />
                        <ItemProp>{timeAgo(updatedAt)}</ItemProp>
                        {type && (
                            <>
                                <ItemPropDot />
                                <ItemProp>{type}</ItemProp>
                            </>
                        )}
                    </ItemPropertiesBox>
                    <ItemPrice>
                        {price === 0 || type === "나눔"
                            ? "나눔"
                            : type === "판매" || status === "판매중" || status === "판매완료"
                              ? `${price.toLocaleString("en-US")}원`
                              : "-"}
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
                    isSold={status === "판매완료"}
                    setTopPosition={setTopPosition}
                    topPosition={topPosition}
                    itemId={itemId || 0}
                />
            )}
        </>
    );
}
