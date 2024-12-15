import CleanTypeButton from "./CleanTypeButton";
import { Input } from "@/components/atoms/Input";
import {
    Control,
    FieldErrorsImpl,
    FieldValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";
import styled from "styled-components";
import RadioButtonsList from "./RadioButtonsList";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MaskedInput from "./MaskedInput";

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
    register: UseFormRegister<FieldValues>;
    watch: UseFormWatch<FieldValues>;
    errors: FieldErrorsImpl<FieldValues>;
    showDirectModal: boolean;
    setShowDirectModal: Dispatch<SetStateAction<boolean>>;
    control: Control<FieldValues, any>;
}

const CleanCheckList = ({
    setValue,
    register,
    watch,
    setShowDirectModal,
    errors,
    control,
}: CleanCheckListProps) => {
    const [isChecked, setIsChecked] = useState([true, true, true]);
    const fieldNames = ["clnPurchaseDate", "clnExprice", "isDirect"];
    useEffect(() => {
        fieldNames.map((name, index) => {
            if (watch(name) === "모름" || watch(name) === false) {
                setIsChecked((prev) => prev.map((item, i) => (i === index ? false : item)));
            } else {
                setIsChecked((prev) => prev.map((item, i) => (i === index ? true : item)));
            }
        });
    }, [watch("clnPurchaseDate"), watch("clnExprice"), watch("isDirect")]);

    const onChangeRadio = (index: number, checked: boolean) => {
        setIsChecked((prev) => prev.map((value, i) => (i === index ? checked : value)));
        if (!checked && index !== 2) {
            setValue(fieldNames[index], "모름");
        }
        if (!checked && index === 2) {
            setValue(fieldNames[index], false);
        }
        if (checked && index !== 2) {
            setValue(fieldNames[index], "");
        }
        if (checked && index === 2) {
            setValue(fieldNames[index], true);
        }
    };

    return (
        <>
            <div>
                <RegisterSubTitle3>오염</RegisterSubTitle3>
                <CleanTypeButton
                    text={["없음", "1~3개", "3개 초과"]}
                    setValueName="clnPollution"
                    setValue={setValue}
                    watch={watch}
                />
            </div>
            <div>
                <RegisterSubTitle3>사용 횟수</RegisterSubTitle3>
                <CleanTypeButton
                    text={["없음", "5회 미만", "5회 이상"]}
                    setValueName="clnTimeUsed"
                    setValue={setValue}
                    watch={watch}
                />
            </div>
            <div>
                <RegisterSubTitle3>세탁 유무</RegisterSubTitle3>
                <CleanTypeButton
                    text={["새 상품", "있음", "없음"]}
                    setValueName="clnCleaned"
                    setValue={setValue}
                    watch={watch}
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
                {isChecked[0] && (
                    <Input
                        value={
                            watch("clnPurchaseDate") === "모름"
                                ? ""
                                : watch("clnPurchaseDate") || ""
                        }
                        placeholder="구매 시기를 입력해요."
                        {...(register && register("clnPurchaseDate", { required: isChecked[0] }))}
                        className={errors.clnPurchaseDate ? "error" : ""}
                    />
                )}
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

                {isChecked[1] && (
                    <MaskedInput
                        control={control}
                        errors={errors}
                        name="clnExprice"
                        watch={watch}
                        isChecked={isChecked[1]}
                    />
                )}
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
                {isChecked[2] && (
                    <Input
                        placeholder="거래 희망 장소를 입력해요."
                        {...(register && register("directLocation", { required: isChecked[2] }))}
                        onClick={() => setShowDirectModal(true)}
                        style={{ caretColor: "transparent" }}
                        className={errors.directLocation ? "error" : ""}
                    />
                )}
            </div>
        </>
    );
};

export default CleanCheckList;
