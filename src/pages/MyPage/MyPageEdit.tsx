import styled from "styled-components";
import { PageTitle } from "@/components/atoms/PageTitle";
import BottomButtonBar from "@/components/molecules/BottomButtonBar";
import { Input } from "@/components/atoms/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import Camera from "@/assets/icons/camera.svg?react";
import { useProfilePhotoUpload } from "@/hooks/usePhotoUpload";
import { useEffect } from "react";
import { useFetchMyProfile, useFetchMyProfileEdit } from "@/hooks/api/UsersQuery";
import ClipLoader from "react-spinners/ClipLoader";
import { base64ToFile } from "@/utils/SetImageUrl";

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
    overflow: hidden;

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

const LoaderWrap = styled.div`
    width: 100px;
    height: 100px;
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MyPageEdit = () => {
    const { data, isLoading } = useFetchMyProfile();
    const { mutate } = useFetchMyProfileEdit();
    const { photoPreview, onChangeFile } = useProfilePhotoUpload();
    const { register, handleSubmit, watch, setValue } = useForm();

    useEffect(() => {
        if (data?.data && !isLoading) {
            const changedImg = base64ToFile(data.data.profileImg);
            setValue("nickname", data.data.nickname);
            setValue("profileImg", changedImg);
        }
    }, [data, isLoading]);

    const profileImg = watch("profileImg");
    useEffect(() => {
        if (profileImg) {
            onChangeFile(profileImg[0] || profileImg);
        }
    }, [profileImg]);

    const onSubmit: SubmitHandler<any> = (data) => {
        const submitData = {
            nickname: data.nickname,
            profileImg: data.profileImg[0] || profileImg,
        };
        mutate(submitData);
    };

    return (
        <ProfileEditWrap onSubmit={handleSubmit(onSubmit)}>
            <PageTitle>프로필 수정</PageTitle>
            {isLoading ? (
                <LoaderWrap>
                    <ClipLoader size={28} color="#d7d7d7" />
                </LoaderWrap>
            ) : (
                <PhotoEditWrap htmlFor="photoUpload">
                    <PhotoWrap>
                        <img src={photoPreview} alt="프로필 사진" />
                    </PhotoWrap>
                    <EditButton>
                        <Camera />
                    </EditButton>
                    <input
                        type="file"
                        id="photoUpload"
                        accept="image/*"
                        {...register("profileImg")}
                    />
                </PhotoEditWrap>
            )}
            <Input placeholder="닉네임을 입력해주세요." {...register("nickname")} />
            <BottomButtonBar buttonText="완료" type="submit" />
        </ProfileEditWrap>
    );
};

export default MyPageEdit;
