import NavigationBar from "@/components/atoms/NavigationBar";
import { PageTitle } from "@/components/atoms/PageTitle";
import MyPageProfile from "@/components/molecules/MyPage.tsx/MyPageProfile";
import styled from "styled-components";
import SquareButtonList from "@/components/molecules/MyPage.tsx/SquareButtons";
import MyPageSettingList from "@/components/molecules/MyPage.tsx/MyPageSettingList";
import { useFetchMyProfile } from "@/hooks/api/UsersQuery";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import { UserProfile } from "@/types/User";

const MyPageWrap = styled.div`
    padding: 0 20px;
`;

const ProfileLoadingWrap = styled.div`
    width: 100%;
    height: 61px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`;

const MyPage = () => {
    const [profileData, setProfileData] = useState<UserProfile>();
    const { data, isLoading } = useFetchMyProfile();

    useEffect(() => {
        if (data) {
            const processedData = {
                ...data.data,
                nickname: data.data.nickname.match(/^반띵#\d{10}$/)
                    ? data.data.nickname.replace(/^(반띵#\d{4})\d+$/, "$1")
                    : data.data.nickname,
            };
            setProfileData(processedData);
        }
    }, [data, isLoading]);

    return (
        <MyPageWrap>
            <PageTitle $margin="10px 0">마이페이지</PageTitle>
            {isLoading ? (
                <ProfileLoadingWrap>
                    <ClipLoader size={28} color="#d7d7d7" />
                </ProfileLoadingWrap>
            ) : (
                <MyPageProfile
                    profileImg={profileData?.profileImg as string}
                    address1={profileData?.address1 ? profileData?.address1.slice(-3) : ""}
                    nickname={profileData?.nickname as string}
                />
            )}
            <SquareButtonList />
            <MyPageSettingList />
            <NavigationBar />
        </MyPageWrap>
    );
};

export default MyPage;
