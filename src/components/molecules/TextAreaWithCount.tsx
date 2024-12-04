import { ChangeEvent, TextareaHTMLAttributes, useRef, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { StyledTextArea } from "@/components/atoms/Input";

const TextAreaWrap = styled.div`
    position: relative;
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
    textarea?.addEventListener("input", () => {
        if (textarea.value && textarea.classList.contains("error")) {
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
