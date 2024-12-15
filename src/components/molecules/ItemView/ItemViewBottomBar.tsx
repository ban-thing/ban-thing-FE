import styled from "styled-components";
import { Button } from "@/components/atoms/Button";
import Tag from "@/assets/icons/priceTagBlue.svg?react";
import { useCreateChatRoomMutation } from "@/hooks/api/ChatsQuery";
import { getCookie } from "@/utils/Cookie";
import { useNavigate } from "react-router-dom";

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

type ItemViewLayout = {
    type: string;
    price: number;
    sellerId: number;
    itemId: number;
    myId: number;
};

export default function ItemViewBottomBar({ type, price, sellerId, itemId, myId }: ItemViewLayout) {
    const navigate = useNavigate();
    const { mutate } = useCreateChatRoomMutation();

    const handleChatButtonClick = async () => {
        const authCookie = getCookie("Authorization");
        if (!authCookie) return navigate("/login");
        mutate(
            { sellerId, itemId },
            {
                onSuccess: (res) => {
                    const chatRoomId = res.data.chatRoomId;
                    navigate(`/chats/${chatRoomId}`);
                },
            },
        );
    };

    return (
        <StyledItemViewBottomBar>
            <PriceWrap>
                <Tag />
                <Price>
                    <PriceNumber>
                        {type === "판매" ? price.toLocaleString("en-US") : "나눔"}
                    </PriceNumber>
                    <PriceText>{type === "판매" ? "원" : ""}</PriceText>
                </Price>
            </PriceWrap>
            {myId !== sellerId && (
                <Button size="small" onClick={handleChatButtonClick}>
                    채팅하기
                </Button>
            )}
        </StyledItemViewBottomBar>
    );
}
