import styled from "styled-components";

export const RegisterTitle = styled.h1`
    font-size: 20px;
    font-weight: 700;
    margin: 16px 0 48px;
    text-align: center;
`;

export const RegisterElementBox = styled.div`
    margin-bottom: 32px;
`;

export const RegisterSubTitle = styled.h2`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
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
