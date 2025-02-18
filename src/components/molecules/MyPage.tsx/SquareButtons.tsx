import styled from "styled-components";
import bag from "@/assets/icons/coloredShoppingBag.svg?react";
import shop from "@/assets/icons/coloredShop.svg?react";
import favorite from "@/assets/icons/Favorite.svg?react";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

const StyledSquareButtonList = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 40px;
`;

export const SquareButtonList = () => {
    return (
        <StyledSquareButtonList>
            <SquareButton text="구매 내역" />
            <SquareButton text="판매 내역" />
            <SquareButton text="나의 찜" />
        </StyledSquareButtonList>
    );
};

const StyledSquareButton = styled.button`
    width: 105px;
    height: 105px;
    border: 1px solid #ebebeb;
    background-color: var(--color-black-8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border-radius: 24px;
    cursor: pointer;

    & img {
        width: 36px;
        height: 36px;
    }

    & div {
        color: var(--color-black-3);
        font-size: 14px;
    }
`;

const SquareButton = ({ text }: { text: string }) => {
    const navigate = useNavigate();
    let IconImage: FunctionComponent<React.SVGProps<SVGSVGElement>>;
    let url: string;
    switch (text) {
        case "구매 내역":
            IconImage = bag;
            url = "purchase-list";
            break;
        case "판매 내역":
            IconImage = shop;
            url = "sale-list";
            break;
        case "나의 찜":
            IconImage = favorite;
            url = "favorite-list";
            break;
        default:
            IconImage = bag;
            break;
    }
    return (
        <StyledSquareButton onClick={() => navigate(url)}>
            <IconImage />
            <div>{text}</div>
        </StyledSquareButton>
    );
};

export default SquareButtonList;
