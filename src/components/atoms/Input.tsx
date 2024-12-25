import styled from "styled-components";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import HashTag from "@/assets/icons/hashtag.svg?react";

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

    &.blank {
        border-color: var(--color-red-1);
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
    const formatNumber = (value: string | number) => {
        const valueAsString = typeof value === "number" ? `${value}` : value;
        const numberOnly = valueAsString.replace(/[^\d]/g, "");
        return numberOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: sellType === "판매" ? "가격을 입력하세요." : false,
                validate: (value) =>
                    sellType === "판매" && (value === "0" || value === 0)
                        ? "가격은 0이 될 수 없습니다."
                        : true,
            }}
            render={({ field: { onChange, value, ref } }) => (
                <Input
                    type="tel"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={8}
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

const HashInputWrap = styled.div`
    position: relative;
`;

const HashIconWrap = styled.div`
    position: absolute;
    width: 24px;
    height: 24px;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
`;

export function InputWithHashIcon({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <HashInputWrap>
            <Input {...props} style={{ paddingLeft: "33px" }} />
            <HashIconWrap>
                <HashTag />
            </HashIconWrap>
        </HashInputWrap>
    );
}

export const StyledTextArea = styled.textarea<TextareaHTMLAttributes<HTMLTextAreaElement>>`
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
