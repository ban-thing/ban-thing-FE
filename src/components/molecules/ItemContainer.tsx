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
import { imageUrl } from "@/utils/SetImageUrl";
import styled from "styled-components";
import CancelIcon from "@/assets/icons/cancel.svg?react";
import { useRemoveWishlist } from "@/hooks/api/UsersQuery";
import { useQueryClient } from "@tanstack/react-query";

type ItemInListProps = ItemSearchList & {
    viewEditButton?: boolean;
    status?: string;
    imgUrl?: string;
    imgUrls?: string[];
    isMyFavorite?: boolean;
};

const StyledItemContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    position: relative;
`;

// const StyledButton = styled(Button)`
//     margin-left: auto;
//     margin-right: 4px;
// `;

const CancelButton = styled.button`
    position: absolute;
    top: 13px;
    right: 0;
    background: none;
    border: none;
    padding: 5px;
    cursor: pointer;
    z-index: 2;
`;

export default function ItemInList({
    itemId,
    title,
    address,
    updatedAt,
    type,
    price,
    images,
    imgUrl,
    imgUrls,
    viewEditButton = false,
    status,
    isMyFavorite = false,
}: ItemInListProps) {
    const [topPosition, setTopPosition] = useState<number | null>(null);
    const cutOffTitle = title.length > 24 ? title.slice(0, 24) + "..." : title;
    const navigate = useNavigate();
    const { mutate: removeWishlist } = useRemoveWishlist();
    const queryClient = useQueryClient();

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

    const handleRemoveWishlist = (e: React.MouseEvent) => {
        e.stopPropagation(); // 아이템 클릭 이벤트 전파 방지
        
        if (itemId) {
            removeWishlist(itemId, {
                onSuccess: () => {
                    // 찜 목록 데이터 갱신
                    queryClient.invalidateQueries({ queryKey: ['wishlist'] });
                }
            });
        }
    };

    return (
        <StyledItemContainer>
            <ItemBox onClick={() => onClickBox(itemId || 0)}>
                <ItemPhotoWrap>
                    <ItemPhoto
                        src={
                            imgUrls && imgUrls.length > 0 ? `${imageUrl}/${imgUrls[0]}` :
                            imgUrl || images
                                ? `${imageUrl}/${imgUrl || images}`
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
            {isMyFavorite && (
                <CancelButton onClick={handleRemoveWishlist}>
                    <CancelIcon />
                </CancelButton>
            )}
            {topPosition && (
                <EditModal
                    isSold={status === "판매완료"}
                    setTopPosition={setTopPosition}
                    topPosition={topPosition}
                    itemId={itemId || 0}
                />
            )}
        </StyledItemContainer>
    );
}
