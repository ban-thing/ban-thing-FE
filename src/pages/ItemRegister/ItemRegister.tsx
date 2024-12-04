import { styled } from "styled-components";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
    CenterLine,
    RegisterElementBox,
    RegisterElementSubBox,
    RegisterElementBox3,
    RegisterSubTitle,
    TagSelect,
} from "@/components/atoms/ItemRegisterElement";
import ItemRegisterPhotoList from "@/components/molecules/ItemRegister/ItemRegisterPhotoList";
import BottomButtonBar from "@/components/molecules/BottomButtonBar";
import { Input, NumberInput } from "@/components/atoms/Input";
import DoubleTypeButton from "@/components/molecules/ItemRegister/DoubleTypeButton";
import CleanCheckList from "@/components/molecules/ItemRegister/CleanCheckList";
import { PageTitle } from "@/components/atoms/PageTitle";
import HashTagButtonList from "@/components/molecules/ItemRegister/HashTagButtonWithCloseList";
import { useEffect, useState } from "react";
import CleanCheckTitle from "@/components/molecules/CleanCheckTitle";
import ItemRegisterHashTag from "./HashTagModal";
import ItemRegisterDirectModal from "./ItemRegisterDirectModal";
import { TextArea } from "@/components/molecules/TextAreaWithCount";

const ItemRegisterWrap = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100vw;
`;

const ItemRegisterContentBox = styled.form`
    max-width: 375px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px 96px 18px;
    margin: 0 auto;
    box-sizing: border-box;
`;

const PhotosErrorMsg = styled.div`
    width: 334px;
    height: 51px;
    border: 1px solid var(--color-red-1);
    border-radius: 8px;
    padding: 13px 16px;
    font-size: 15px;
    color: red;
    background-color: rgba(255, 0, 0, 0.08);
    box-sizing: border-box;
`;

const ItemRegister = () => {
    const [showHashModal, setShowHashModal] = useState(false);
    const [showDirectModal, setShowDirectModal] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        reset,
        setError,
        formState: { isValid, errors },
    } = useForm();

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

    useEffect(() => {
        if (showHashModal || showDirectModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showHashModal, showDirectModal]);

    const onSubmit: SubmitHandler<any> = (data) => {
        if (data.type === "나눔") {
            data.price = 0;
        }
        if (data.clnExprice === "00.00.00") {
            setError("clnExprice", { message: "유통기한을 입력해주세요." });
        }
        console.log(errors, "errors");
        console.log(data, "제출데이터");
    };

    const type = watch("type");

    return (
        <ItemRegisterWrap>
            <ItemRegisterContentBox>
                <PageTitle>내 물건 팔기</PageTitle>
                <RegisterElementBox style={{ width: "375px", overflow: "hidden" }}>
                    {/* TODO: 이미지 선택순으로 들어가게 수정 */}
                    <RegisterSubTitle>상품 사진</RegisterSubTitle>
                    <ItemRegisterPhotoList
                        setValue={setValue}
                        Controller={Controller}
                        control={control}
                    />
                    {errors.photos && <PhotosErrorMsg>사진을 선택해주세요.</PhotosErrorMsg>}
                </RegisterElementBox>
                <RegisterElementBox>
                    <RegisterSubTitle>제목</RegisterSubTitle>
                    <Input
                        placeholder="제목을 입력하세요."
                        {...register("title", { required: "제목을 입력하세요." })}
                        className={errors.title ? "error" : ""}
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
                        className={type === "판매" && errors.price ? "error" : ""}
                    />
                </RegisterElementBox>
                <RegisterElementBox>
                    <RegisterSubTitle>자세한 설명</RegisterSubTitle>
                    <TextArea
                        placeholder="신뢰도 있는 거래를 위해 상품의 내용을 자세히 입력 하세요."
                        register={register}
                        required
                        className={errors.content ? "error" : ""}
                    />
                </RegisterElementBox>
                <RegisterElementBox>
                    <RegisterElementSubBox>
                        <RegisterSubTitle>태그 설정</RegisterSubTitle>
                        <TagSelect text="선택사항" onClick={() => setShowHashModal(true)} />
                    </RegisterElementSubBox>
                    <HashTagButtonList
                        hashList={watch("hashtags")}
                        margin="0"
                        setValue={setValue}
                    />
                </RegisterElementBox>
                <CenterLine />
                <RegisterElementBox3>
                    <CleanCheckTitle />
                    <CleanCheckList
                        control={control}
                        setValue={setValue}
                        register={register}
                        watch={watch}
                        errors={errors}
                        showDirectModal={showDirectModal}
                        setShowDirectModal={setShowDirectModal}
                    />
                </RegisterElementBox3>
            </ItemRegisterContentBox>
            <BottomButtonBar
                variant={isValid ? "filled" : "gray"}
                buttonText="작성 완료"
                type="submit"
                onClick={handleSubmit(onSubmit)}
            />
            {showHashModal && (
                <ItemRegisterHashTag
                    setShowModal={setShowHashModal}
                    setValue={setValue}
                    watch={watch}
                />
            )}
            {showDirectModal && (
                <ItemRegisterDirectModal
                    setShowModal={setShowDirectModal}
                    register={register}
                    setValue={setValue}
                    watch={watch}
                />
            )}
        </ItemRegisterWrap>
    );
};

export default ItemRegister;
