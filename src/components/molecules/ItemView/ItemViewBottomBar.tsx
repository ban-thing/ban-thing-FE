import styled from "styled-components";
import { Button } from "@/components/atoms/Button";
import Tag from "@/assets/icons/priceTagBlue.svg?react";
import { useCreateChatRoomMutation } from "@/hooks/api/ChatsQuery";

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
};

export default function ItemViewBottomBar({ type, price, sellerId, itemId }: ItemViewLayout) {
    const { mutate } = useCreateChatRoomMutation();

    const handleChatButtonClick = async () => {
        mutate({ sellerId, itemId }); //채팅방 이동은 useCreateChatRoomMutation 내부 onSuccess에서 실행
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
            <Button size="small" onClick={handleChatButtonClick}>
                채팅하기
            </Button>
        </StyledItemViewBottomBar>
    );
}
