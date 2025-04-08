import styled from "styled-components";
import HashTagButtonList from "@/components/molecules/ItemRegister/HashTagButtonWithCloseList";
import Character from "@/assets/characterWhite.svg?react";
import HashTagIcon from "@/assets/icons/hashtag.svg?react";
import ResetIcon from "@/assets/icons/reset.svg?react";
import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from "react";
import { useSearchHashListStore } from "@/store/SearchHashList";
import { useHashtagFilterModalStore } from "@/store/ModalStore";
import BackIcon from "@/assets/icons/back.svg?react";

const TitleWrap = styled.div<{ $margin?: string }>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: ${({ $margin }) => ($margin ? $margin : "16px 0 30px")};
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
                <TitleWrap $margin="16px 0 20px">
                    <BackButton onClick={hideHashtagFilterModal}>
                        <BackIcon />
                    </BackButton>
                    <Title>태그 등록</Title>
                </TitleWrap>
                <CharacterWrap>
                    <Character />
                </CharacterWrap>
                <TagInputWrapper>
                    <HashTagIcon />
                    <TagInput
                        placeholder={
                            tempHashList.length === 5
                                ? "태그는 최대 5개까지 입력 가능합니다."
                                : "태그입력"
                        }
                        onChange={onInputChange}
                        onKeyPress={onEnterDown}
                        value={inputValue}
                    />
                </TagInputWrapper>

                <HashTagButtonList
                    hashList={tempHashList}
                    setValue={handleSetValue}
                    margin="16px 0 0 0"
                />

                <DescriptionWrap>
                    <div>원하는 상품을 다양한 태그로 표현해요 (최대 5개)</div>
                    <div>태그로 검색하면 원하는 조건의 상품을 쉽게 볼 수 있어요!</div>
                </DescriptionWrap>
                <TagExample>#강아지 #소형견 #베이지 #장난감 #파란색</TagExample>
                <ButtonContainer>
                    <ResetButton onClick={onClickReset}>
                        <ResetIcon />
                        초기화
                    </ResetButton>
                    <CompleteButton
                        onClick={onClickComplete}
                        disabled={tempHashList.length === 0}
                    >
                        완료
                    </CompleteButton>
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    align-items: center;
    height: 100%;
    background-color: var(--color-main-2);
`;

const HashTagPageLayout = styled.div`
    width: 100%;
    max-width: 375px;
    height: 100%;
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
    padding: 30px 0 16px 12px;
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
    font-size: 14px;
    color: var(--color-black-5);
    margin-bottom: 30px;
`;

const TagInputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 120px;
    z-index: 12;
    background: white;
    border-radius: 30px;
    padding: 15px;
    box-sizing: border-box;

    svg {
        margin-right: 8px;
        width: 20px;
        height: 20px;
        color: #999;
    }
`;

const TagInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    &::placeholder {
        color: #b0b0b0;
    }
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: absolute;
    bottom: 20px;
    padding: 0 20px;
    box-sizing: border-box;
`;

const ResetButton = styled.button`
    flex: 1;
    height: 48px;
    background: white;
    border: 1px solid #d7d7d7;
    border-radius: 8px;
    color: var(--color-black-5);
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;

const CompleteButton = styled.button<{ disabled: boolean }>`
    flex: 1;
    height: 48px;
    background: ${props => props.disabled ? 'var(--color-black-6)' : '#6290ec'};
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 16px;
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
`;
