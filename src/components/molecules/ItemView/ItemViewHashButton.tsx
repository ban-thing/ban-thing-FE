import styled from "styled-components";
import { ButtonProps } from "@/components/atoms/Button";
import HashTagIcon from "@/assets/icons/hashtag.svg?react";

type StyledHashtagButtonProps = ButtonProps & {
    $hashIconColor?: string;
};

const StyledHashtagButton = styled.button<StyledHashtagButtonProps>`
    border-radius: 24px;
    border: none;
    padding: 4.5px 10px 4.5px 6px;
    height: 26px;

    font-weight: 500;
    background-color: rgba(98, 144, 236, 0.1);

    display: flex;
    align-items: center;
    box-sizing: border-box;

    & * {
        color: #1a5ee4;
        font-size: 12px;
        fill: ${({ $hashIconColor }) => ($hashIconColor ? $hashIconColor : "#111")};
    }
`;

const HashtagButton = ({ text = "버튼" }: { text?: string }) => {
    return (
        <StyledHashtagButton $hashIconColor="#1a5ee4">
            <HashTagIcon width="18px" height="18px" />
            <span>{text}</span>
        </StyledHashtagButton>
    );
};

export default HashtagButton;
