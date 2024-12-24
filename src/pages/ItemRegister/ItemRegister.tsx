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
import { ToastContainer, toast, Slide } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { useFetchItem, useFetchItemCreate, useFetchItemUpdate } from "@/hooks/api/ItemsQuery";
import { base64ToFile } from "@/utils/SetImageUrl";
import { useFetchMyProfile } from "@/hooks/api/UsersQuery";

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

const StyledToastContainer = styled(ToastContainer)`
    bottom: 70px;
    .Toastify__toast {
        background-color: rgba(0, 0, 0, 0.7);
        width: 170px;
        height: 48px;
        margin: 10px auto;
        padding: 0;
    }
    .Toastify__toast-body {
        margin: 0;
        padding: 0;
    }
    & * {
        font-size: 16px;
        font-weight: 700;
        color: white;
        text-align: center;
    }
`;

const ItemRegister = () => {
    const [searchParams] = useSearchParams();
    const edit = searchParams.get("edit");
    const { data: profileData } = useFetchMyProfile();
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
    const { data } = useFetchItem(Number(edit));
    const { mutate: createMutate } = useFetchItemCreate();
    const { mutate: updateMutate } = useFetchItemUpdate();

    useEffect(() => {
        // 등록페이지일 경우
        reset({
            title: "",
            content: "",
            type: "판매",
            price: "0",
            clnPollution: "없음",
            clnTimeUsed: "없음",
            clnCleaned: "새 상품",
            clnPurchasedDate: "모름",
            clnExpire: "모름",
            isDirect: false,
            directLocation: "",
        });
    }, []);

    useEffect(() => {
        // 수정페이지일 경우
        if (edit && data) {
            const expire = data?.data.cleaningDetail.expire?.slice(2).replace(/-/g, ".");
            // const files = data?.data.itemImgs.map(async (img) => await getFileFromUrl(edit, img));
            const files = data?.data.itemImgs.map((value) => base64ToFile(value));

            reset({
                title: data?.data.title,
                content: data?.data.content,
                photos: files,
                type: data?.data.type,
                hashtags: data?.data.hashtags,
                clnPollution: data?.data.cleaningDetail.pollution,
                clnTimeUsed: data?.data.cleaningDetail.timeUsed,
                clnCleaned: data?.data.cleaningDetail.cleaned,
                clnPurchasedDate: data?.data.cleaningDetail.purchasedDate,
                clnExpire: expire,
                isDirect: data?.data.direct,
                directLocation: data?.data.directLocation,
            });
        }
    }, [edit, data]);

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

    // console.log(errors, "errors");

    const onSubmit: SubmitHandler<any> = (data) => {
        if (data.type === "나눔") {
            data.price = 0;
        }
        if (data.clnExpire === "OO.OO.OO") {
            setError("clnExpire", { message: "유통기한을 입력해요." });
        }
        if (data.hashtags && data.hashtags?.some((item: any) => item.id)) {
            data.hashtags = data.hashtags.map((item: any) =>
                typeof item === "object" ? item.hashtag : item,
            );
        }
        if (!data.isDirect) {
            data.address = profileData?.data.address1;
        }

        if (edit) return updateMutate(data);
        createMutate(data);
    };

    useEffect(() => {
        if (errors.photos) {
            toast("상품 사진을 등록해요.");
        }
    }, [errors.photos]);

    const type = watch("type");

    // console.log(watch("photos"), "사진목록");

    return (
        <ItemRegisterWrap>
            <ItemRegisterContentBox>
                <PageTitle>내 물건 팔기</PageTitle>
                <RegisterElementBox style={{ width: "375px", overflow: "hidden" }}>
                    <RegisterSubTitle>상품 사진</RegisterSubTitle>
                    <ItemRegisterPhotoList
                        setValue={setValue}
                        Controller={Controller}
                        control={control}
                    />
                    <StyledToastContainer
                        position="bottom-center"
                        autoClose={3000}
                        hideProgressBar={true}
                        closeButton={false}
                        closeOnClick
                        transition={Slide}
                    />
                </RegisterElementBox>
                <RegisterElementBox>
                    <RegisterSubTitle>제목</RegisterSubTitle>
                    <Input
                        placeholder="제목을 입력해요."
                        {...register("title", { required: "제목을 입력해요." })}
                        className={errors.title ? "error" : ""}
                    />
                </RegisterElementBox>
                <RegisterElementBox>
                    <RegisterSubTitle>거래 방식</RegisterSubTitle>
                    <DoubleTypeButton setValue={setValue} watch={watch} />
                    <NumberInput
                        control={control}
                        name="price"
                        placeholder="가격을 입력해요."
                        sellType={type}
                        className={type === "판매" && errors.price ? "error" : ""}
                    />
                </RegisterElementBox>
                <RegisterElementBox>
                    <RegisterSubTitle>자세한 설명</RegisterSubTitle>
                    <TextArea
                        placeholder="신뢰도 있는 거래를 위해 상품의 내용을 자세히 작성 해주세요."
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
                className={isValid ? "" : "disabled"}
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
