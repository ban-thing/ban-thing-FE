import { TypeButton } from "@/components/atoms/Button";
import { useState } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import styled from "styled-components";

const TypeButtonWrap = styled.div`
    display: flex;
    gap: 8px;
`;

interface CleanTypeButtonProps {
    setValue: UseFormSetValue<FieldValues>;
    text: string[];
    setValueName: string;
}

const CleanTypeButton = ({ setValue, text, setValueName }: CleanTypeButtonProps) => {
    const [isEnable, setIsEnable] = useState([false, false, false]);
    const onClick = (text: string, setValueName: string, index: number) => {
        if (isEnable[index]) return;
        setIsEnable((prev) => prev.map((value, i) => (i === index ? !value && true : false)));
        setValue(setValueName, text);
    };

    return (
        <TypeButtonWrap>
            <TypeButton
                width="auto"
                $text={text[0]}
                $enable={isEnable[0]}
                onClick={() => onClick(text[0], setValueName, 0)}
            />
            <TypeButton
                width="auto"
                $text={text[1]}
                $enable={isEnable[1]}
                onClick={() => onClick(text[1], setValueName, 1)}
            />
            <TypeButton
                width="auto"
                $text={text[2]}
                $enable={isEnable[2]}
                onClick={() => onClick(text[2], setValueName, 2)}
            />
        </TypeButtonWrap>
    );
};

export default CleanTypeButton;
