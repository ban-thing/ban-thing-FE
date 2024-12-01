import CleanTypeButton from "./CleanTypeButton";
import { Input } from "@/components/atoms/Input";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import styled from "styled-components";
import RadioButtonsList from "./RadioButtonsList";
import { useState } from "react";

const RegisterSubTitle3 = styled.h3`
    color: var(--color-black-4);
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
`;

interface CleanCheckListProps {
    setValue: UseFormSetValue<FieldValues>;
}

const CleanCheckList = ({ setValue }: CleanCheckListProps) => {
    const [isChecked, setIsChecked] = useState([true, true, true]);

    const onChangeRadio = (index: number, boolean: boolean) => {
        setIsChecked((prev) => prev.map((value, i) => (i === index ? boolean : value)));
    };

    return (
        <>
            <div>
                <RegisterSubTitle3>오염</RegisterSubTitle3>
                <CleanTypeButton
                    text={["없음", "1~3개", "3개 초과"]}
                    setValueName="clnPollution"
                    setValue={setValue}
                />
            </div>
            <div>
                <RegisterSubTitle3>사용 횟수</RegisterSubTitle3>
                <CleanTypeButton
                    text={["없음", "5회 미만", "5회 이상"]}
                    setValueName="clnTimeUsed"
                    setValue={setValue}
                />
            </div>
            <div>
                <RegisterSubTitle3>세탁 유무</RegisterSubTitle3>
                <CleanTypeButton
                    text={["새 상품", "있음", "없음"]}
                    setValueName="clnCleaned"
                    setValue={setValue}
                />
            </div>
            <div>
                <RegisterSubTitle3>
                    <span>구매 시기</span>
                    <RadioButtonsList
                        name="clnPurchaseDate"
                        isChecked={isChecked[0]}
                        onChangeRadio={onChangeRadio}
                        index={0}
                    />
                </RegisterSubTitle3>
                {isChecked[0] && <Input placeholder="구매 시기를 입력하세요." />}
            </div>
            <div>
                <RegisterSubTitle3>
                    <span>유통 기한</span>
                    <RadioButtonsList
                        name="clnExprice"
                        isChecked={isChecked[1]}
                        onChangeRadio={onChangeRadio}
                        index={1}
                    />
                </RegisterSubTitle3>
                {isChecked[1] && <Input placeholder="00.00.00" />}
            </div>
            <div>
                <RegisterSubTitle3>
                    <span>직거래</span>
                    <RadioButtonsList
                        name="isDirect"
                        isChecked={isChecked[2]}
                        onChangeRadio={onChangeRadio}
                        text={["가능", "불가능"]}
                        index={2}
                    />
                </RegisterSubTitle3>
                {isChecked[2] && <Input placeholder="직거래 할 장소를 입력하세요." />}
            </div>
        </>
    );
};

export default CleanCheckList;
