import { TypeButton } from "@/components/atoms/Button";
import { useState } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import styled from "styled-components";

const TypeButtonWrap = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
`;

interface DoubleTypeButtonProps {
    setValue: UseFormSetValue<FieldValues>;
}

const DoubleTypeButton = ({ setValue }: DoubleTypeButtonProps) => {
    const [isSell, setIsSell] = useState(true);
    const onClickSell = () => {
        setValue("type", "판매");
        setIsSell(true);
    };
    const onClickFree = () => {
        setValue("type", "나눔");
        setIsSell(false);
    };

    return (
        <TypeButtonWrap>
            <TypeButton $text="판매하기" onClick={onClickSell} $enable={isSell} />
            <TypeButton $text="나눔하기" onClick={onClickFree} $enable={!isSell} />
        </TypeButtonWrap>
    );
};

export default DoubleTypeButton;
