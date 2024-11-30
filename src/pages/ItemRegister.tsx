import { styled } from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    RegisterElementBox,
    RegisterSubTitle,
    RegisterTitle,
} from "@/components/atoms/ItemRegisterElement";
import ItemRegisterPhotoList from "@/components/molecules/ItemRegisterPhotoList";
import BottomButtonBar from "@/components/molecules/BottomButtonBar";

const ItemRegisterBox = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    box-sizing: border-box;
`;

const ItemRegister = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit: SubmitHandler<any> = (data) => {
        console.log(data, "제출데이터");
    };

    return (
        <>
            <ItemRegisterBox>
                <RegisterTitle>내 물건 팔기</RegisterTitle>
                <RegisterElementBox>
                    <RegisterSubTitle>상품 사진</RegisterSubTitle>
                    <ItemRegisterPhotoList register={register} />
                </RegisterElementBox>
                <RegisterElementBox>
                    <RegisterSubTitle>제목</RegisterSubTitle>
                </RegisterElementBox>
            </ItemRegisterBox>
            <BottomButtonBar
                variant="gray"
                buttonText="작성 완료"
                type="submit"
                onClick={handleSubmit(onSubmit)}
            />
        </>
    );
};

export default ItemRegister;
