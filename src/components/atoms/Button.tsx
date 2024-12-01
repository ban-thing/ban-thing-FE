import styled from "styled-components";
import { ButtonHTMLAttributes } from "react";
import Plus from "@/assets/icons/plus.svg?react";
import Snack from "@/assets/icons/snackWhite.svg?react";

// TODO: $variant로 수정
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "filled" | "outlined" | "gray" | "yellow";
    size?: "large" | "small";
    checked?: boolean;
    $hoverAction?: boolean;
}
//Button
const getBackgroundColor = (variant?: string) => {
    switch (variant) {
        case "filled":
            return "var(--color-main-1)";
        case "gray":
            return "var(--color-black-6)";
        case "outlined":
            return "transparent";
        case "yellow":
            return "#f9e000";
        default:
            return "var(--color-main-1)";
    }
};

const getTextColor = (variant?: string) => {
    switch (variant) {
        case "outlined":
            return "var(--color-main-1)";
        case "yellow":
            return "black";
        default:
            return "white";
    }
};
// 기본 버튼
export const Button = styled.button<ButtonProps>`
    border-radius: 24px;
    border: ${(props) => (props.variant === "outlined" ? "1px solid var(--color-main-1)" : "none")};
    width: ${(props) => (props.size === "small" ? "160px" : "335px")};
    height: ${(props) => (props.size === "small" ? "48px" : "52px")};
    font-size: ${(props) => (props.size === "small" ? "16px" : "18px")};
    font-weight: 500;
    background-color: ${(props) => getBackgroundColor(props.variant)};
    color: ${(props) => getTextColor(props.variant)};
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.8;
        opacity: ${(props) => (props.$hoverAction === false ? 1 : 0.8)};
    }
`;
// 해시테크 버튼
export const HashtagButton = styled.button<ButtonProps>`
    border-radius: 24px;
    border: none;
    padding: 8px 16px;
    height: 36px;
    font-size: 14px;
    font-weight: 500;
    background-color: var(--color-main-1);
    color: white;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;

    ${(props) =>
        props.variant === "outlined" &&
        `
    background-color: transparent;
    border: 1px solid var(--color-main-1);
    color: var(--color-main-1);
  `}
`;
// X 버튼
export const CloseButton = styled.button`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid var(--color-main-1);
    background: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        opacity: 0.8;
    }
`;
export const GrayCloseButton = styled.button`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #b2b2b2;
    background: var(--color-black-6);
    color: white;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: -4px;
`;
// 체크 버튼
export const CheckButton = styled.button<ButtonProps>`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background-color: ${(props) =>
        props.checked ? "var(--color-main-1)" : "var(--color-black-6)"};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.8;
    }

    svg {
        width: 18px;
        height: 16px;
        color: white;
    }
`;
// 라디오 버튼
export const RadioButton = styled.button<ButtonProps>`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid ${(props) => (props.checked ? "var(--color-main-1)" : "var(--color-black-6)")};
    background-color: ${(props) => (props.checked ? "var(--color-main-1)" : "transparent")};
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;

    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: ${(props) => (props.checked ? "white" : "var(--color-black-6)")};
        transition: background-color 0.2s ease;
    }

    &:hover {
        opacity: 0.8;
    }
`;

export interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    enable?: boolean;
}

// 모달 버튼
export const ModalButton = styled.button<ModalButtonProps>`
    width: 100%;
    height: 58px;
    border: none;
    border-radius: 0 0 24px 24px;
    background-color: ${(props) =>
        props.enable === true ? "var(--color-black-4)" : "var(--color-black-7)"};
    color: ${(props) => (props.enable === true ? "white" : "black")};
    font-weight: 500;
`;

// 초기화 버튼
export const ResetButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 24px;
    border: 1px solid var(--color-black-5);
    width: 160px;
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    background-color: white;
    color: var(--color-black-5);
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.8;
    }
`;

export interface UnderlineTextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string;
    width?: string;
}

export const UnderlineTextButton = styled.button<UnderlineTextButtonProps>`
    color: ${(props) => (props ? props.color : "white")};
    text-decoration: underline;
    width: ${(props) => (props.width ? props.width : "auto")};
`;

const PlusButton = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
    width: 64px;
    height: 64px;
    background-color: var(--color-black-4);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    position: fixed;
    bottom: 90px;
`;

export const ItemPlusButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <PlusButton {...props}>
            <Plus stroke="white" />
        </PlusButton>
    );
};

const StyledMySellButton = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
    width: 128px;
    height: 50px;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 15px 14px;
    border-radius: 32px;
    background-color: var(--color-main-1);
    position: fixed;
    bottom: 90px;
    font-size: 15px;
    box-sizing: border-box;
    & > * {
        color: white;
    }
`;

export const MySellButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <StyledMySellButton {...props}>
            <Snack />
            <div>내 물건 팔기</div>
        </StyledMySellButton>
    );
};
