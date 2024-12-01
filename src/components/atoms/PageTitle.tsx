import styled from "styled-components";

export const PageTitle = styled.h1<{ $marginB?: string }>`
    font-size: 20px;
    font-weight: 700;
    margin: ${({ $marginB }) => ($marginB ? `16px 0 ${$marginB}` : "16px 0 48px")};
    text-align: center;
`;
