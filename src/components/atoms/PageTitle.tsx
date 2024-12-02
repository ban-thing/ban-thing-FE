import styled from "styled-components";

export const PageTitle = styled.h1<{ $margin?: string }>`
    font-size: 20px;
    font-weight: 700;
    margin: ${({ $margin }) => ($margin ? $margin : "16px 0 48px")};
    text-align: center;
`;
