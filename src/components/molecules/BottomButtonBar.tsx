import styled from "styled-components";
import { Button, ButtonProps } from "@/components/atoms/Button";

const StyledBottomBar = styled.div`
    width: 100%;
    max-width: 375px;
    height: 76px;
    padding: 8px 20px 16px;
    position: fixed;
    bottom: 0;
    background-color: white;
    box-sizing: border-box;
`;

type BottomBarProps = ButtonProps & {
    buttonText?: string;
};

export default function BottomButtonBar({ buttonText = "버튼", ...buttonProps }: BottomBarProps) {
    return (
        <StyledBottomBar>
            <Button {...buttonProps}>{buttonText}</Button>
        </StyledBottomBar>
    );
}
