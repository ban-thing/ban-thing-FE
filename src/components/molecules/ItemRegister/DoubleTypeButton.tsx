import { TypeButton } from "@/components/atoms/Button";
import { useEffect, useState } from "react";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import styled from "styled-components";

const TypeButtonWrap = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
`;

interface DoubleTypeButtonProps {
    setValue: UseFormSetValue<FieldValues>;
    watch: UseFormWatch<FieldValues>;
}

const DoubleTypeButton = ({ setValue, watch }: DoubleTypeButtonProps) => {
    const [isSell, setIsSell] = useState(true);

    useEffect(() => {
        if (watch("type") === "판매") {
            setIsSell(true);
        }
        if (watch("type") === "나눔") {
            setIsSell(false);
        }
    }, []);

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
