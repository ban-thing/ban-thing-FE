import styled from "styled-components";

export const Input = styled.input`
    width: 301px;
    height: 50px;
    border: 1px solid var(--color-black-6);
    border-radius: 8px;
    padding: 0 16px;
    font-size: 15px;
    color: var(--color-black-1);

    &:focus {
        outline: 1px solid var(--color-black-1);
    }
`;
