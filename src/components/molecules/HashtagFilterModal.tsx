import styled from "styled-components";
import HashTagButtonList from "@/components/molecules/ItemRegister/HashTagButtonWithCloseList";
import Character from "@/assets/characterWhite.svg?react";
import HashTagIcon from "@/assets/icons/hashtag.svg?react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from "react";
import { useSearchHashListStore } from "@/store/SearchHashList";
import { useHashtagFilterModalStore } from "@/store/ModalStore";

export default function HashTagFilterModal() {
    const { searchHashList, setSearchHashList } = useSearchHashListStore();
    const { hideHashtagFilterModal } = useHashtagFilterModalStore();
    const [inputValue, setInputValue] = useState("");
    const [hashList, setHashList] = useState<string[]>([]);

    useEffect(() => {
        if (searchHashList) {
            setHashList(searchHashList.filter((tag) => tag.trim() !== ""));
        }
    }, [searchHashList]);

    const handleSetValue = (name: string, value: string[]) => {
        setHashList(value);
    };

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.target.value);
    };

    const onEnterDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            const trimmedValue = inputValue.trim();
            if (trimmedValue === "") {
                return alert("태그를 입력해주세요.");
            }
            if (hashList.length >= 5) {
                return;
            }
            if (hashList.includes(trimmedValue)) {
                return alert("이미 입력된 태그입니다."), setInputValue("");
            }
            setHashList((prev) => [...prev, trimmedValue]);
            setInputValue("");
        }
    };

    const onClickComplete = () => {
        setSearchHashList(hashList);
        hideHashtagFilterModal();
    };
    return (
        <HashTagPageWrap>
            <CharacterWrap>
                <Character />
            </CharacterWrap>
            <InputWrapper>
                <HashTagIcon />
                <Input
                    placeholder={
                        hashList.length === 5 ? "태그는 최대 5개까지 입력 가능합니다." : "태그 입력"
                    }
                    onChange={onInputChange}
                    onKeyPress={onEnterDown}
                    value={inputValue}
                />
            </InputWrapper>

            <HashTagButtonList hashList={hashList} setValue={handleSetValue} margin="10px 0 0 0" />

            <DescriptionWrap>
                <div>내 상품을 다양한 태그로 표현해요 (최대 5개)</div>
                <div>태그를 등록해두면 많은 사람들이 내 상품을 볼 수 있어요!</div>
            </DescriptionWrap>
            <TagExample>#강아지 #멍멍이 #댕댕이 #장난감 #바잇미</TagExample>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "16px",
                }}
            >
                <Button
                    onClick={onClickComplete}
                    disabled={hashList.length === 0}
                    style={{
                        backgroundColor:
                            hashList.length === 0 ? "var(--color-black-6)" : "var(--color-main-1)",
                        cursor: hashList.length === 0 ? "default" : "pointer",
                    }}
                >
                    완료
                </Button>
            </div>
        </HashTagPageWrap>
    );
}

const CharacterWrap = styled.div`
    position: absolute;
    top: 128px;
    right: 25px;
    z-index: 1;
`;

const HashTagPageWrap = styled.div`
    display: flex;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    min-height: 100vh;
    width: 100%;
    max-width: 375px;
    background-color: #c6d8ff;
    box-sizing: border-box;
`;

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
    flex: 1;
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 197px;
    z-index: 12;

    svg {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        color: #999;
    }

    input {
        padding-left: 30px;
    }
`;
