import { MouseEventHandler } from "react";
import styled from "styled-components";

type ItemBoxProps = {
    onClick: MouseEventHandler<HTMLElement>;
};

export const ItemBox = styled.figure<ItemBoxProps>`
    position: relative;
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

export const ItemBoxRight = styled.div<{ $maxWidth?: string }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    max-width: ${({ $maxWidth }) => ($maxWidth ? $maxWidth : null)};

    & h3 {
        max-width: 155px;
    }
`;

export const ItemPhotoWrap = styled.div`
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 24px;
`;

export const ItemPhoto = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 24px;
    object-fit: cover;
`;

export const ItemSoldOut = styled.div`
    position: absolute;
    top: 9px;
    left: 7px;
    width: 58px;
    height: 26px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 24px;
    color: white;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    display: flex;
    align-items: center;
    gap: 4px;
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

export const ItemEditButton = styled.div`
    position: absolute;
    cursor: pointer;
    width: 24px;
    height: 24px;
    top: 32px;
    right: 0;
    margin: 3px;
`;
