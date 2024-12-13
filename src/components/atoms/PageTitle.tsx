import styled from "styled-components";
import BackIcon from "@/assets/icons/back.svg?react";
import { useNavigate } from "react-router-dom";

export const PageTitle = styled.h1<{ $margin?: string }>`
    font-size: 20px;
    font-weight: 700;
    margin: ${({ $margin }) => ($margin ? $margin : "16px 0 48px")};
    text-align: center;
`;

const TitleWrap = styled.div<{ $margin?: string }>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: ${({ $margin }) => ($margin ? $margin : "16px 0 48px")};
`;

const BackButton = styled.div`
    position: absolute;
    left: 0;
    cursor: pointer;
    margin-left: 15px;
    padding: 0 5px;

    & > * {
        display: flex;
    }
`;

type Props = {
    text: string;
    $margin?: string;
};

export const PageTitleWithBackButton = ({ text, $margin }: Props) => {
    const navigate = useNavigate();

    return (
        <TitleWrap $margin={$margin}>
            <BackButton onClick={() => navigate(-1)}>
                <BackIcon />
            </BackButton>
            <PageTitle $margin={"0"}>{text}</PageTitle>
        </TitleWrap>
    );
};
