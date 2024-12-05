import styled from "styled-components";

export const LayoutBox = styled.main<{ $nullMaxWidth?: boolean }>`
    max-width: ${(props) => (props.$nullMaxWidth ? "100vw" : "375px")};
    min-height: 100vh;
    margin: 0 auto;
    overflow-x: hidden;
    /* background-color: #ddd; */
`;
