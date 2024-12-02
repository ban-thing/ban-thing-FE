import { MouseEventHandler } from "react";
import styled from "styled-components";

type ItemBoxProps = {
    onClick: MouseEventHandler<HTMLElement>;
};

export const ItemBox = styled.figure<ItemBoxProps>`
    width: 335px;
    height: 166px;
    padding: 22px 0;
    display: grid;
    grid-template-columns: 120px 180px;
    column-gap: 16px;
    box-sizing: border-box;
    border-bottom: 1px solid #f7f7f7;
    justify-content: center;
    cursor: pointer;

    & > * {
        box-sizing: border-box;
    }
`;

export const ItemBoxRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
`;

export const ItemPhoto = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 24px;
    background-color: saddlebrown;
`;

export const ItemPropertiesBox = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

export const ItemTitle = styled.h3`
    font-size: 18px;
    box-sizing: border-box;
`;

export const ItemProp = styled.div`
    font-size: 12px;
    color: var(--color-black-5);
`;

export const ItemPropDot = styled.div`
    width: 4px;
    height: 4px;
    background-color: #dfdfdf;
`;

export const ItemPrice = styled.div`
    grid-area: itemPrice;
    font-size: 18px;
    font-weight: 700;
`;
