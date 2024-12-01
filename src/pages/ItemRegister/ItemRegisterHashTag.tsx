import styled from "styled-components";
import { Input } from "@/components/atoms/Input";
import { PageTitle } from "@/components/atoms/PageTitle";
import BottomButtonBar from "@/components/molecules/BottomButtonBar";
import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from "react";
import { useItemRegisterHashListStore } from "@/store/ItemRegisterHashList";
import { useNavigate } from "react-router-dom";
import HashTagButtonList from "@/components/molecules/ItemRegister/HashTagButtonWithCloseList";

const HashTagPageWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
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
`;

const ItemRegisterHashTag = () => {
    const { itemRegisterHashList, setItemRegisterHashList } = useItemRegisterHashListStore();
    const [inputValue, setInputValue] = useState("");
    const [hashList, setHashList] = useState([""]);
    const navigate = useNavigate();

    useEffect(() => {
        if (itemRegisterHashList) {
            setHashList(itemRegisterHashList);
        }
    }, []);

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.value.trim() === "") return;
        setInputValue(e.target.value);
    };
    const onEnterDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.keyCode === 13 || e.key === "Enter") {
            // TODO: 모바일에서 작동하는지 확인
            if (inputValue.trim() === "") {
                // TODO: 공백값 주의문구 추가
                // 중복값 입력시 주의문구 띄울지 등록할 때 알아서 거를지?
                return console.log("공백");
            }
            setHashList((prev) => [...prev, inputValue]);
            setInputValue("");
        }
    };

    const onClickComplete = () => {
        setItemRegisterHashList(hashList);
        navigate("/item-register");
    };

    return (
        <HashTagPageWrap>
            <PageTitle $marginB="56px">태그 등록</PageTitle>
            {/* TODO: input에 해시태그 아이콘 추가 */}
            <Input
                placeholder={
                    hashList.length > 5 ? "태그는 최대 5개까지 입력 가능합니다." : "태그 입력"
                }
                onChange={onInputChange}
                onKeyDown={onEnterDown}
                value={inputValue}
                disabled={hashList.length > 5}
            />
            <HashTagButtonList hashList={hashList} setHashList={setHashList} />
            <DescriptionWrap>
                <div>내 상품을 다양한 태그로 표현해요 (최대 5개)</div>
                <div>태그를 등록해두면 많은 사람들이 내 상품을 볼 수 있어요!</div>
                <div>상품에 관련없는 태그를 입력할 경우, 판매에 제재를 받을 수 있어요</div>
            </DescriptionWrap>
            <TagExample>#강아지 #멍멍이 #댕댕이 #장난감 #바잇미</TagExample>
            <BottomButtonBar buttonText="완료" onClick={onClickComplete} />
        </HashTagPageWrap>
    );
};

export default ItemRegisterHashTag;
