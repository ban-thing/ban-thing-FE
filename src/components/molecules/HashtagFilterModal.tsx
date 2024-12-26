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
    const [tempHashList, setTempHashList] = useState<string[]>([]);

    const handleSetValue = (name: string, value: string[]) => {
        name.trim();
        setTempHashList(value);
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
            if (tempHashList.length >= 5) {
                return;
            }
            if (tempHashList.includes(trimmedValue)) {
                return alert("이미 입력된 태그입니다."), setInputValue("");
            }
            setTempHashList((prev) => [...prev, trimmedValue]);
            setInputValue("");
        }
    };

    const onClickComplete = () => {
        setSearchHashList(tempHashList);
        hideHashtagFilterModal();
    };

    const onClickCancel = () => {
        setTempHashList(searchHashList);
        hideHashtagFilterModal();
    };

    useEffect(() => {
        if (searchHashList) {
            setTempHashList(searchHashList.filter((tag) => tag.trim() !== ""));
        }
    }, [searchHashList]);

    return (
        <HashTagPageWrap>
            <CharacterWrap>
                <Character />
            </CharacterWrap>
            <InputWrapper>
                <HashTagIcon />
                <Input
                    placeholder={
                        tempHashList.length === 5
                            ? "태그는 최대 5개까지 입력 가능합니다."
                            : "태그 입력"
                    }
                    onChange={onInputChange}
                    onKeyPress={onEnterDown}
                    value={inputValue}
                />
            </InputWrapper>

            <HashTagButtonList
                hashList={tempHashList}
                setValue={handleSetValue}
                margin="10px 0 0 0"
            />

            <DescriptionWrap>
                <div>원하는 상품을 다양한 태그로 표현해요 (최대 5개)</div>
                <div>태그로 검색하면 원하는 조건의 상품을 쉽게 볼 수 있어요!</div>
            </DescriptionWrap>
            <TagExample>#강아지 #소형견 #베이지 #장난감 #산책</TagExample>
            <ButtonContainer>
                <Button
                    onClick={onClickCancel}
                    variant="outlined"
                    size="small"
                    style={{
                        gap: "8px",
                        border: "1px solid var(--color-black-6)",
                        backgroundColor: "var(--color-white)",
                        color: "var(--color-black-6)",
                    }}
                >
                    취소
                </Button>
                <Button
                    onClick={onClickComplete}
                    size="small"
                    disabled={tempHashList.length === 0}
                    style={{
                        backgroundColor:
                            tempHashList.length === 0
                                ? "var(--color-black-6)"
                                : "var(--color-main-1)",
                        cursor: tempHashList.length === 0 ? "default" : "pointer",
                    }}
                >
                    완료
                </Button>
            </ButtonContainer>
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

const ButtonContainer = styled.div`
    width: 100%;
    max-width: 375px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 76px;
    padding: 8px 20px 16px;
    margin: 0 auto;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
`;
