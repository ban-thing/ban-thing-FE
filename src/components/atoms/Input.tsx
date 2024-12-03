import styled from "styled-components";
import { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes, useRef, useState } from "react";
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

    &.error {
        background-color: rgba(255, 0, 0, 0.08);
        border-color: var(--color-red-1);

        &::placeholder {
            color: red;
        }
        &:focus {
            outline: none;
        }
    }
`;

interface NumberInputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
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
    ...props
}: NumberInputProps<T>) {
    const formatNumber = (value: string) => {
        const numberOnly = value.replace(/[^\d]/g, "");
        return numberOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: sellType === "판매" ? "가격을 입력하세요." : false }}
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
                    {...props}
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
    overflow: hidden;
    font-size: 15px;

    &:focus {
        outline: 1px solid var(--color-black-1);
    }

    &.error {
        background-color: rgba(255, 0, 0, 0.08);
        border-color: var(--color-red-1);
        color: red;

        &::placeholder {
            color: red;
        }
        &:focus {
            outline: none;
        }
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
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTypingCount(e.target.value.length);
        handleResizeHeight();
    };
    const handleResizeHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    };

    const textarea = document.querySelector("textarea");
    textarea?.addEventListener("click", () => {
        if (textarea.classList.contains("error")) {
            textarea.classList.remove("error");
        }
    });

    return (
        <TextAreaWrap>
            <StyledTextArea
                {...(register && register("content", { required: "내용을 작성해주세요." }))}
                {...props}
                onChange={onChange}
                rows={1}
            />
            <TypingCount>{typingCount}/2000</TypingCount>
        </TextAreaWrap>
    );
}
