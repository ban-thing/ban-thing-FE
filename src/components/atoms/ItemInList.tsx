import styled from "styled-components";

const ItemBox = styled.figure`
    width: 335px;
    height: 168px;
    padding: 24px;
    display: grid;
`;

const ItemPhoto = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 24px;
`;

const ItemTitle = styled.h3`
    font-size: 18px;
`;

const ItemProp = styled.div`
    font-size: 12px;
    color: var(--color-black-5);
`;

const ItemPropDot = styled.div``;

const ItmePrice = styled.div`
    font-size: 18px;
    font-weight: 700;
`;

function ItemProperties(params) {
    // param으로 위치/등록시간/타입(나눔/판매) 텍스트를 받아서 중간에 가운뎃점 표시
}

export default function ItemInList() {
    return <div>ItemInList</div>;
}
