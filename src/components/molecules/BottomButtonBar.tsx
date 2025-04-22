import styled from "styled-components";
import { Button, ButtonProps } from "@/components/atoms/Button";

const StyledBottomBar = styled.div`
    width: 100%;
    max-width: 375px;
    display: flex;
    justify-content: center;
    height: 76px;
    padding: 8px 20px 16px;
    margin: 0 auto;
    position: fixed;
    bottom: 0;
    background-color: white;
    box-sizing: border-box;
    z-index: 15;
    &::before {
        content: '';
        position: absolute;
        top: -11px;
        left: 0;
        right: 0;
        height: 11px;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.02), transparent);
    }
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
