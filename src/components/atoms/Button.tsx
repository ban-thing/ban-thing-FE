import styled from "styled-components";
import { ButtonHTMLAttributes } from "react";
import Plus from "@/assets/icons/plusBold.svg?react";
import Snack from "@/assets/icons/snackWhite.svg?react";
import FilterIcon from "@/assets/icons/filter.svg?react";
import ResetIcon from "@/assets/icons/reset.svg?react";
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
            return "var(--color-yellow)";
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

    &.disabled {
        cursor: default;
        background-color: var(--color-black-6);
        color: white;

        &:hover {
            opacity: 1;
        }
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
export const CloseButton = styled.button<ButtonProps>`
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

    ${(props) =>
        props.variant === "outlined" &&
        `
        width: 18px;
        height: 18px;
        background-color: var(--color-black-8);
        border: 1px solid #A4C1FC;
        color: var(--color-main-1);
    `}
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
    top: -4px;
    right: 0;
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

interface TypeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    $text?: string;
    $enable?: boolean;
    width?: string;
}

const StyledTypeButton = styled.button<TypeButtonProps>`
    width: ${({ width }) => (width ? width : "80px")};
    height: 40px;
    padding: 10px 16px;
    border: 1px solid ${({ $enable }) => ($enable ? "var(--color-main-1)" : "var(--color-black-5)")};
    color: ${({ $enable }) => ($enable ? "var(--color-main-1)" : "var(--color-black-5)")};
    background-color: ${({ $enable }) => ($enable ? "rgba(198, 216, 255, 0.1)" : "white")};
    font-size: 14px;
    border-radius: 24px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
`;

export const TypeButton = ({ $text = "버튼", $enable = false, ...props }: TypeButtonProps) => {
    return (
        <StyledTypeButton $enable={$enable} type="button" {...props}>
            {$text}
        </StyledTypeButton>
    );
};

export interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    $enable?: boolean;
}

// 모달 버튼
export const ModalButton = styled.button<ModalButtonProps>`
    width: 100%;
    height: 58px;
    border: none;
    border-radius: 0 0 24px 24px;
    background-color: ${(props) =>
        props.$enable === true ? "var(--color-yellow)" : "var(--color-black-7)"};
    color: "black";
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

// 필터 버튼
const FilterButton = styled.button`
    width: 52px;
    height: 52px;
    border-radius: 8px;
    background-color: var(--color-black-8);
    display: flex;
    align-items: center;
    justify-content: center;
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

const StyledMySellButton = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
    width: 128px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 15px 13px;
    border-radius: 32px;
    background-color: var(--color-main-1);
    position: absolute;
    bottom: 70px;
    right: 0;
    font-size: 14px;
    box-sizing: border-box;
    box-shadow: 0 10px 15px 0 rgba(53, 101, 199, 0.2);
    transition: all 0.25s;
    white-space: nowrap;
    &.small {
        width: 50px;
        border-radius: 50%;
    }

    & > * {
        color: white;
        font-weight: 700;
    }
`;

type MySellButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    showPlus?: boolean;
};

interface PlusButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    width?: string;
    height?: string;
}

const PlusButton = styled.button<PlusButtonProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: var(--color-main-1);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
`;

export const MySellButton = ({ showPlus = false, ...props }: MySellButtonProps) => {
    return (
        <StyledMySellButton {...props}>
            {showPlus ? (
                <Plus stroke="white" />
            ) : (
                <>
                    <Snack />
                    <div>내 물건 팔기</div>
                </>
            )}
        </StyledMySellButton>
    );
};

export const ItemFilterButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <FilterButton {...props}>
            <FilterIcon />
        </FilterButton>
    );
};

export const ItemPlusButton = ({ width, height, ...props }: PlusButtonProps) => {
    return (
        <PlusButton width={width} height={height} {...props}>
            <Plus stroke="white" width="13px" height="13px" />
        </PlusButton>
    );
};

export const FilterResetButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <ResetButton {...props}>
            <ResetIcon />
            초기화
        </ResetButton>
    );
};
