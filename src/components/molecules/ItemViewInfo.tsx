import styled from "styled-components";
import { HashtagButton } from "@/components/atoms/Button";

const ItemViewInfoBox = styled.div`
    width: 100%;
    padding: 24px 20px 16px;
    box-sizing: border-box;
`;

const TitleWrap = styled.div`
    width: 100%;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ItemViewTitle = styled.h3`
    font-size: 20px;
    font-weight: 700;
`;

const ItemViewTime = styled.div`
    font-size: 14px;
    color: #949494;
`;

const HashtagWrap = styled.div`
    display: flex;
    gap: 4px;
`;

export default function ItemViewInfo() {
    return (
        <ItemViewInfoBox>
            <TitleWrap>
                <ItemViewTitle>상품 제목 들어오는 곳</ItemViewTitle>
                <ItemViewTime>4분 전</ItemViewTime>
            </TitleWrap>
            <HashtagWrap>
                <HashtagButton>고양이</HashtagButton>
                <HashtagButton>장난감</HashtagButton>
            </HashtagWrap>
        </ItemViewInfoBox>
    );
}
