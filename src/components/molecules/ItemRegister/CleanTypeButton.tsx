import { TypeButton } from "@/components/atoms/Button";
import { useEffect, useState } from "react";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import styled from "styled-components";

const TypeButtonWrap = styled.div`
    display: flex;
    gap: 8px;
`;

interface CleanTypeButtonProps {
    setValue: UseFormSetValue<FieldValues>;
    watch: UseFormWatch<FieldValues>;
    text: string[];
    setValueName: string;
}

const CleanTypeButton = ({ setValue, watch, text, setValueName }: CleanTypeButtonProps) => {
    const [isEnable, setIsEnable] = useState([true, false, false]);

    useEffect(() => {
        const resetValue = watch(setValueName);
        const index = text.findIndex((item) => item === resetValue);

        if (index !== -1) {
            setIsEnable((prev) => prev.map((_, i) => (i === index ? true : false)));
        }
    }, []);

    const onClick = (text: string, setValueName: string, index: number) => {
        if (isEnable[index]) return;
        setIsEnable((prev) => prev.map((value, i) => (i === index ? !value && true : false)));
        setValue(setValueName, text);
    };

    return (
        <TypeButtonWrap>
            {text.map((buttonText, index) => (
                <TypeButton
                    key={buttonText}
                    width="auto"
                    $text={buttonText}
                    $enable={isEnable[index]}
                    onClick={() => onClick(buttonText, setValueName, index)}
                />
            ))}
        </TypeButtonWrap>
    );
};

export default CleanTypeButton;
