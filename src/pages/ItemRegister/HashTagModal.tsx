import styled from "styled-components";
import { InputWithHashIcon } from "@/components/atoms/Input";
import {
    ChangeEventHandler,
    Dispatch,
    KeyboardEventHandler,
    SetStateAction,
    useState,
} from "react";
import HashTagButtonList from "@/components/molecules/ItemRegister/HashTagButtonWithCloseList";
import ItemRegisterModalLayout from "@/components/layout/ItemRegisterModalLayout";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";

const DescriptionWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    padding: 30px 0 32px 12px;
    box-sizing: border-box;

    & > * {
        font-size: 12px;
        color: var(--color-black-4);
        position: relative;
    }

    & > *::before {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -12px;
        content: "";
        display: block;
        width: 4px;
        height: 4px;
        background-color: var(--color-black-5);
        border-radius: 50%;
    }
`;

const TagExample = styled.div`
    width: 100%;
    font-size: 12px;
    color: var(--color-black-5);
`;

type HashTagModalProps = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    setValue: UseFormSetValue<FieldValues>;
    watch: UseFormWatch<FieldValues>;
};

const ItemRegisterHashTagModal = ({ setShowModal, setValue, watch }: HashTagModalProps) => {
    const [inputValue, setInputValue] = useState("");
    const formDataHashList = watch("hashtags") || [""];
    const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.target.value);
    };
    const onEnterDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.keyCode === 13 || e.key === "Enter") {
            const targetInput = e.target as HTMLInputElement;

            // TODO: 모바일에서 작동하는지 확인
            if (inputValue.trim() === "") {
                targetInput.placeholder = "공백은 입력할 수 없습니다.";
                targetInput.classList.add("blank");
                return console.log("공백");
            } else if (targetInput.classList.contains("blank")) {
                targetInput.placeholder = "태그는 최대 5개까지 입력 가능합니다.";
                targetInput.classList.remove("blank");
            }

            if (formDataHashList) {
                setValue("hashtags", [
                    ...formDataHashList.filter((item: string) => item),
                    inputValue,
                ]);
            }
            setInputValue("");
        }
    };

    const blankInput = document.querySelector("input.blank");
    blankInput?.addEventListener("click", () => {
        blankInput.classList.remove("blank");
    });

    return (
        <ItemRegisterModalLayout
            titleText="태그 등록"
            onClickComplete={() => setShowModal(false)}
            setShowModal={setShowModal}
        >
            <InputWithHashIcon
                placeholder={
                    formDataHashList.length > 5
                        ? "태그는 최대 5개까지 입력 가능합니다."
                        : "태그 입력"
                }
                onChange={onInputChange}
                onKeyDown={onEnterDown}
                value={inputValue}
                disabled={formDataHashList?.length > 5}
            />
            <HashTagButtonList hashList={formDataHashList || [""]} setValue={setValue} />
            <DescriptionWrap>
                <div>내 상품을 다양한 태그로 표현해요 (최대 5개)</div>
                <div>태그를 등록해두면 많은 사람들이 내 상품을 볼 수 있어요!</div>
                <div>상품에 관련없는 태그를 입력할 경우, 판매에 제재를 받을 수 있어요</div>
            </DescriptionWrap>
            <TagExample>#강아지 #소형견 #베이지 #장난감 #산책</TagExample>
        </ItemRegisterModalLayout>
    );
};

export default ItemRegisterHashTagModal;
