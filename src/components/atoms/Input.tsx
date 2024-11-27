import styled from "styled-components";
import { InputHTMLAttributes } from "react";

export const Input = styled.input<InputHTMLAttributes<HTMLInputElement>>`
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
