import styled from "styled-components";
import Heart from "@/assets/icons/heart.svg?react";
import HeartActive from "@/assets/icons/heartActive.svg?react";
import { Button } from "@/components/atoms/Button";
import { useCreateChatRoomMutation } from "@/hooks/api/ChatsQuery";
import { getCookie } from "@/utils/Cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAddWishlist, useRemoveWishlist } from "@/hooks/api/UsersQuery";

type ItemViewLayout = {
    type: string;
    price: number;
    sellerId: number;
    itemId: number;
    myId: number;
    status?: string;
    wishlisted?: boolean;
    wishlistCount?: number;
};

export default function ItemViewBottomBar({
    type,
    price,
    sellerId,
    itemId,
    myId,
    status,
    wishlisted = false,
}: ItemViewLayout) {
    const navigate = useNavigate();
    const { mutate: createChatRoom } = useCreateChatRoomMutation();
    const { mutate: addWishlist } = useAddWishlist();
    const { mutate: removeWishlist } = useRemoveWishlist();
    const [isLiked, setIsLiked] = useState(wishlisted);

    useEffect(() => {
        setIsLiked(wishlisted);
    }, [wishlisted]);

    const handleChatButtonClick = async (status: string) => {
        if (status === "판매완료") return;
        const authCookie = getCookie("Authorization_banthing");
        if (!authCookie) return navigate("/login");
        createChatRoom(
            { sellerId, itemId },
            {
                onSuccess: (res) => {
                    const chatRoomId = res.data.chatRoomId;
                    navigate(`/chats/${chatRoomId}`);
                },
            },
        );
    };

    const handleLikeClick = () => {
        const authCookie = getCookie("Authorization_banthing");
        if (!authCookie) return navigate("/login");

        if (isLiked) {
            removeWishlist(itemId, {
                onSuccess: () => {
                    setIsLiked(false);
                },
            });
        } else {
            addWishlist(itemId, {
                onSuccess: () => {
                    setIsLiked(true);
                },
            });
        }
    };

    return (
        <StyledItemViewBottomBar>
            <PriceWrap>
                <HeartButton onClick={handleLikeClick}>
                    {isLiked ? <HeartActive /> : <Heart />}
                </HeartButton>
                <Price>
                    <PriceNumber>
                        {type === "판매" ? price.toLocaleString("en-US") : "나눔"}
                    </PriceNumber>
                    <PriceText>{type === "판매" ? "원" : ""}</PriceText>
                </Price>
            </PriceWrap>
            {myId !== sellerId && (
                <Button
                    size="small"
                    onClick={() => handleChatButtonClick(status || "판매중")}
                    className={status === "판매완료" ? "disabled" : ""}
                >
                    채팅하기
                </Button>
            )}
        </StyledItemViewBottomBar>
    );
}

const StyledItemViewBottomBar = styled.div`
    width: 100%;
    max-width: 375px;
    height: 64px;
    display: flex;
    justify-content: space-between;
    padding: 8px 20px;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    /* border-top: 1px solid #d7d7d7; */
    background-color: #fff;
    z-index: 5;
`;

const PriceWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    height: 48px;

    & > * {
        font-size: 24px;
        color: var(--color-black-1);
    }
`;

const Price = styled.div`
    display: flex;
`;

const PriceNumber = styled.div`
    font-weight: 700;
`;

const PriceText = styled.div``;

const HeartButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;