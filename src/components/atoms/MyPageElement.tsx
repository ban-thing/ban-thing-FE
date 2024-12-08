import styled from "styled-components";

export const TermsSubTitle = styled.h2<{ $marginBottom?: string }>`
    font-size: 16px;
    font-weight: 700;
    color: var(--color-black-2);
    margin-bottom: ${({ $marginBottom }) => ($marginBottom ? $marginBottom : "24px")};
`;

export const TermsDesc = styled.div<{ $marginBottom?: string }>`
    font-size: 14px;
    color: var(--color-black-4);
    margin-bottom: ${({ $marginBottom }) => ($marginBottom ? $marginBottom : 0)};
`;

export const TermDescList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-left: 20px;
    margin: 0 0 40px 6px;
    font-size: 14px;

    & > li {
        list-style: decimal;
        color: var(--color-black-4);
    }
`;
