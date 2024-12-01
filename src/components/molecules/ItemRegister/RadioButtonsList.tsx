import { RadioButton } from "@/components/atoms/Button";
import styled from "styled-components";

const RadiosWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`;

const RadioWrap = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #111;
    cursor: pointer;

    & > * {
        font-size: 14px;
        color: #111;
    }

    & label {
        margin-left: 4px;
        cursor: pointer;
    }
`;

interface RadioButtonsProps {
    name: string;
    text?: string[];
    isChecked: boolean;
    index: number;
    onChangeRadio: (...args: any[]) => void;
}

const RadioButtonsList = ({ name, text, isChecked, index, onChangeRadio }: RadioButtonsProps) => {
    return (
        <RadiosWrap>
            <RadioWrap onClick={() => onChangeRadio(index, true)}>
                <RadioButton type="button" id={`${name}1`} name={name} checked={isChecked} />
                <label htmlFor={`${name}1`}>{text ? text[0] : "작성하기"}</label>
            </RadioWrap>
            <RadioWrap onClick={() => onChangeRadio(index, false)}>
                <RadioButton type="button" id={`${name}2`} name={name} checked={!isChecked} />
                <label htmlFor={`${name}2`}>{text ? text[1] : "모름"}</label>
            </RadioWrap>
        </RadiosWrap>
    );
};

export default RadioButtonsList;
