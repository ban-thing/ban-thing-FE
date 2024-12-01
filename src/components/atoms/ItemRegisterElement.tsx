import styled from "styled-components";
import Arrow from "@/assets/icons/rightArrow.svg?react";
import { MouseEventHandler } from "react";

export const RegisterElementBox = styled.div`
    margin-bottom: 32px;
`;

export const RegisterElementSubBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const RegisterElementBox3 = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const RegisterSubTitle = styled.h2`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
`;

export const RegisterSubTitle2 = styled.h2`
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;

    & > * {
        color: var(--color-black-4);
    }

    & path,
    & rect {
        stroke: var(--color-black-4);
    }
`;

export const PhotosList = styled.div`
    display: flex;
    gap: 8px;
    height: 66px;
    align-items: flex-end;
    /* overflow-y: scroll; */
    /* TODO: 스크롤 CSS 설정 */
    &::-webkit-scrollbar {
        /* display: none; */
    }
`;

export const PhotoAddButton = styled.label<{ $enable: boolean }>`
    height: 60px;
    width: 60px;
    border-radius: 8px;
    border: 1px solid #c0c0c0;
    cursor: ${({ $enable }) => ($enable ? "pointer" : "default")};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > * {
        color: #949494;
        font-size: 12px;
    }

    & + input {
        display: none;
    }
`;

export const UploadedImage = styled.img`
    height: 60px;
    width: 60px;
    border-radius: 8px;
    object-fit: cover;
`;

export const UploadedImageWrap = styled.span`
    position: relative;
    display: flex;
    height: 100%;
    align-items: flex-end;
`;

export const PhotoCount = styled.span<{ $hasImg: boolean }>`
    color: ${({ $hasImg }) => ($hasImg ? "black" : "#949494")};
`;

const StyledTagSelect = styled.div`
    display: flex;
    justify-content: space-between;
    width: 72px;
    cursor: pointer;

    & > * {
        color: #949494;
        font-size: 14px;
    }
`;

type TagSelectProps = {
    text: string;
    onClick: MouseEventHandler<HTMLDivElement>;
};

export const TagSelect = ({ text, onClick }: TagSelectProps) => {
    return (
        <StyledTagSelect onClick={onClick}>
            <div>{text}</div>
            <Arrow />
        </StyledTagSelect>
    );
};

export const CenterLine = styled.div`
    width: 100%;
    max-width: 375px;
    height: 8px;
    background-color: #f3f3f3;
    margin-bottom: 32px;
`;
