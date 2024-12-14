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

const LogoutButton = styled.div`
    font-size: 12px;
    color: var(--color-black-6);
    padding: 8px 0;
    text-align: center;
    cursor: pointer;
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
            setProfileData(data.data);
        }
    }, [data, isLoading]);

    return (
        <MyPageWrap>
            <PageTitle>마이페이지</PageTitle>
            {isLoading ? (
                <ProfileLoadingWrap>
                    <ClipLoader size={28} color="#d7d7d7" />
                </ProfileLoadingWrap>
            ) : (
                <MyPageProfile
                    profileImg={profileData?.profileImg as string}
                    address1={profileData?.address1 as string}
                    nickname={profileData?.nickname as string}
                />
            )}
            <SquareButtonList />
            <MyPageSettingList />
            <NavigationBar />
            {/* TODO: 로그아웃 이벤트 추가 */}
            <LogoutButton>로그아웃</LogoutButton>
        </MyPageWrap>
    );
};

export default MyPage;
