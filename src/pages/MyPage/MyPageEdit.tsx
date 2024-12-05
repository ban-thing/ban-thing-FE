import styled from "styled-components";
// import { useProfilePhotoUpload } from "@/hooks/usePhotoUpload";
import { PageTitle } from "@/components/atoms/PageTitle";
import BottomButtonBar from "@/components/molecules/BottomButtonBar";
import { Input } from "@/components/atoms/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import Camera from "@/assets/icons/camera.svg?react";
import photo from "@/assets/tempProfile.png";

const ProfileEditWrap = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PhotoEditWrap = styled.label`
    position: relative;
    width: 100px;
    height: 100px;
    margin-bottom: 32px;
    cursor: pointer;

    & input {
        display: none;
    }
`;

const PhotoWrap = styled.div`
    border-radius: 50%;

    & img {
        width: 100px;
        height: 100px;
    }
`;

const EditButton = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid rgba(192, 192, 192, 0.6);
    background-color: rgba(255, 255, 255, 0.6);

    & * {
        width: 20px;
        height: 20px;
        fill: black;
    }
`;

const MyPageEdit = () => {
    // const { photoPreview, photoFile, onChangeFile } = useProfilePhotoUpload(photo);
    const { register, handleSubmit } = useForm();

    // TODO: 프리뷰, 기존 데이터 불러오기 기능 추가
    const onSubmit: SubmitHandler<any> = (data) => {
        console.log(data);
    };

    return (
        <ProfileEditWrap onSubmit={handleSubmit(onSubmit)}>
            <PageTitle>프로필 수정</PageTitle>
            <PhotoEditWrap htmlFor="photoUpload">
                <PhotoWrap>
                    <img src={photo} alt="프로필 사진" />
                </PhotoWrap>
                <EditButton>
                    <Camera />
                </EditButton>
                <input
                    type="file"
                    id="photoUpload"
                    accept="image/*"
                    {...register("profileImgUrl")}
                />
            </PhotoEditWrap>
            <Input placeholder="닉네임을 입력해주세요." {...register("nickname")} />
            <BottomButtonBar buttonText="완료" type="submit" />
        </ProfileEditWrap>
    );
};

export default MyPageEdit;
