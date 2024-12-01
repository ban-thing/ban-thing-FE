import { styled } from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    CenterLine,
    RegisterElementBox,
    RegisterElementSubBox,
    RegisterElementBox3,
    RegisterSubTitle,
    RegisterSubTitle2,
    TagSelect,
} from "@/components/atoms/ItemRegisterElement";
import ItemRegisterPhotoList from "@/components/molecules/ItemRegister/ItemRegisterPhotoList";
import BottomButtonBar from "@/components/molecules/BottomButtonBar";
import { Input, NumberInput, TextArea } from "@/components/atoms/Input";
import DoubleTypeButton from "@/components/molecules/ItemRegister/DoubleTypeButton";
import { useNavigate } from "react-router-dom";
import Diary from "@/assets/icons/dairy.svg?react";
import CleanCheckList from "@/components/molecules/ItemRegister/CleanCheckList";
import { PageTitle } from "@/components/atoms/PageTitle";
import { useItemRegisterHashListStore } from "@/store/ItemRegisterHashList";
import HashTagButtonList from "@/components/molecules/ItemRegister/HashTagButtonWithCloseList";
import { useEffect } from "react";

const ItemRegisterBox = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px 96px 18px;
    box-sizing: border-box;
`;

const ItemRegister = () => {
    const { itemRegisterHashList, deleteItemAtIndex, resetItemRegisterHashList } =
        useItemRegisterHashListStore();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        reset,
        formState: { isValid },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<any> = (data) => {
        resetItemRegisterHashList();
        // TODO: required 빨간색 수정. photos에 required 추가
        const submitData = { ...data };
        if (data.type === "나눔") {
            submitData.price = 0;
        }
        console.log(submitData, "제출데이터");
    };

    const type = watch("type");
    useEffect(() => {
        reset({
            // title: "임시 제목",
            // content: "내용",
            type: "판매",
            // price: "500",
            clnPollution: "없음",
            clnTimeUsed: "없음",
            clnCleaned: "새 상품",
            clnPurchaseDate: "모름",
            clnExprice: "모름",
            isDirect: false,
            // directLocation: "강남역 1번 출구",
        });
    }, []);

    return (
        <>
            <ItemRegisterBox>
                <PageTitle>내 물건 팔기</PageTitle>
                <RegisterElementBox style={{ width: "375px", overflow: "hidden" }}>
                    {/* TODO: 이미지 선택순으로 들어가게 수정 */}
                    <RegisterSubTitle>상품 사진</RegisterSubTitle>
                    <ItemRegisterPhotoList register={register} setValue={setValue} />
                </RegisterElementBox>
                <RegisterElementBox>
                    <RegisterSubTitle>제목</RegisterSubTitle>
                    <Input
                        placeholder="제목을 입력하세요."
                        {...register("title", { required: true })}
                        required
                    />
                </RegisterElementBox>
                <RegisterElementBox>
                    <RegisterSubTitle>거래 방식</RegisterSubTitle>
                    <DoubleTypeButton setValue={setValue} watch={watch} />
                    <NumberInput
                        control={control}
                        name="price"
                        placeholder="가격을 입력하세요."
                        sellType={type}
                    />
                </RegisterElementBox>
                <RegisterElementBox>
                    <RegisterSubTitle>자세한 설명</RegisterSubTitle>
                    <TextArea
                        placeholder="신뢰도 있는 거래를 위해 상품의 내용을 자세히 작성 해주세요."
                        register={register}
                        required
                    />
                </RegisterElementBox>
                <RegisterElementBox>
                    <RegisterElementSubBox>
                        <RegisterSubTitle>태그 설정</RegisterSubTitle>
                        <TagSelect text="선택사항" onClick={() => navigate("hashtag")} />
                    </RegisterElementSubBox>
                    <HashTagButtonList
                        hashList={itemRegisterHashList}
                        deleteItem={deleteItemAtIndex}
                        margin="0"
                    />
                </RegisterElementBox>
                <CenterLine />
                <RegisterElementBox3>
                    <RegisterSubTitle2>
                        <Diary width="18px" height="18px" />
                        <div>클린 체크리스트</div>
                    </RegisterSubTitle2>
                    <CleanCheckList setValue={setValue} register={register} watch={watch} />
                </RegisterElementBox3>
            </ItemRegisterBox>
            <BottomButtonBar
                variant={isValid ? "filled" : "gray"}
                buttonText="작성 완료"
                type="submit"
                onClick={handleSubmit(onSubmit)}
            />
        </>
    );
};

export default ItemRegister;
