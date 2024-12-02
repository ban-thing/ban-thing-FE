import styled from "styled-components";
import Diary from "@/assets/icons/dairy.svg?react";

export const CleanCheckTitleWrap = styled.h2`
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

type CleanCheckTitleProps = {
    titleWeight?: number;
};

const CleanCheckTitle = ({ titleWeight = 500 }: CleanCheckTitleProps) => {
    return (
        <CleanCheckTitleWrap>
            <Diary width="18px" height="18px" />
            <div style={{ fontWeight: titleWeight }}>클린 체크리스트</div>
        </CleanCheckTitleWrap>
    );
};

export default CleanCheckTitle;
