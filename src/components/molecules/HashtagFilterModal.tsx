import styled from "styled-components";
import HashTagButtonList from "@/components/molecules/ItemRegister/HashTagButtonWithCloseList";
import Character from "@/assets/characterWhite.svg?react";
import HashTagIcon from "@/assets/icons/hashtag.svg?react";
import ResetIcon from "@/assets/icons/reset.svg?react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from "react";
import { useSearchHashListStore } from "@/store/SearchHashList";
import { useHashtagFilterModalStore } from "@/store/ModalStore";
import BackIcon from "@/assets/icons/back.svg?react";

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

    const onClickReset = () => {
        setTempHashList([]);
    };

    useEffect(() => {
        if (searchHashList) {
            setTempHashList(searchHashList.filter((tag) => tag.trim() !== ""));
        }
    }, [searchHashList]);

    return (
        <HashTagPageWrap>
            <HashTagPageLayout>
                <TitleWrap>
                    <BackButton onClick={hideHashtagFilterModal}>
                        <BackIcon />
                    </BackButton>
                    <Title>태그 등록</Title>
                </TitleWrap>
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
                        onClick={onClickReset}
                        variant="outlined"
                        size="small"
                        style={{
                            border: "1px solid var(--color-black-6)",
                            backgroundColor: "white",
                            color: "var(--color-black-5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "9px",
                        }}
                    >
                        <ResetIcon />
                        초기화
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
            </HashTagPageLayout>
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
    min-height: 100%;
    background-color: #c6d8ff;
`;

const HashTagPageLayout = styled.div`
    width: 375px;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
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
    margin-left: 23px;
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 142px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 375px;
    height: 76px;
    box-sizing: border-box;
    gap: 15px;
    background: white;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
`;

const TitleWrap = styled.div`
    width: 375px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: white;
`;

const BackButton = styled.div`
    position: absolute;
    left: 0;
    cursor: pointer;
    margin-left: 15px;
    padding: 0 5px;

    & > * {
        display: flex;
    }
`;

const Title = styled.h1`
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    text-align: center;
`;