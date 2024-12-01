import styled from "styled-components";
import { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes, useState } from "react";
import { Control, Controller, FieldValues, Path, UseFormRegister } from "react-hook-form";

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

    &[type="number"]::-webkit-outer-spin-button,
    &[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

interface NumberInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    placeholder?: string;
    sellType?: string;
}

export function NumberInput<T extends FieldValues>({
    control,
    name,
    placeholder,
    sellType = "판매",
}: NumberInputProps<T>) {
    const formatNumber = (value: string) => {
        const numberOnly = value.replace(/[^\d]/g, "");
        return numberOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: sellType === "판매" }}
            render={({ field: { onChange, value, ref } }) => (
                <Input
                    type="tel"
                    inputMode="numeric"
                    pattern="\d*"
                    ref={ref}
                    value={sellType === "판매" ? formatNumber(value || "") : 0}
                    onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, "");
                        onChange(rawValue);
                    }}
                    placeholder={placeholder}
                    disabled={sellType === "나눔"}
                />
            )}
        />
    );
}

const TextAreaWrap = styled.div`
    position: relative;
`;

const StyledTextArea = styled.textarea<TextareaHTMLAttributes<HTMLTextAreaElement>>`
    width: 100%;
    max-width: 375px;
    min-height: 122px;
    border-radius: 8px;
    border: 1px solid #c0c0c0;
    background-color: #fff;
    padding: 16px;
    box-sizing: border-box;

    &:focus {
        outline: 1px solid var(--color-black-1);
    }
`;

const TypingCount = styled.span`
    position: absolute;
    right: 17px;
    bottom: 16px;
    font-size: 12px;
    color: #949494;
`;

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    register?: UseFormRegister<FieldValues>;
};

export function TextArea({ register, ...props }: TextAreaProps) {
    const [typingCount, setTypingCount] = useState(0);
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTypingCount(e.target.value.length);
    };
    return (
        <TextAreaWrap>
            <StyledTextArea
                {...(register && register("content", { required: true }))}
                {...props}
                onChange={onChange}
            />
            <TypingCount>{typingCount}/2000</TypingCount>
        </TextAreaWrap>
    );
}
