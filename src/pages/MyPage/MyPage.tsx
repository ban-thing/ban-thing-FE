import NavigationBar from "@/components/atoms/NavigationBar";
import { PageTitle } from "@/components/atoms/PageTitle";
import MyPageProfile from "@/components/molecules/MyPage.tsx/MyPageProfile";
import styled from "styled-components";
import photo from "@/assets/tempProfile.png";
import SquareButtonList from "@/components/molecules/MyPage.tsx/SquareButtons";
import MyPageSettingList from "@/components/molecules/MyPage.tsx/MyPageSettingList";

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

const dummyProfile = {
    profileImgUrl: photo,
    address1: "ㅇㅇ시 ㅇㅇ동",
    nickname: "반띵#5784",
};

const MyPage = () => {
    return (
        <MyPageWrap>
            <PageTitle>마이페이지</PageTitle>
            <MyPageProfile
                profileImgUrl={dummyProfile.profileImgUrl}
                address1={dummyProfile.address1}
                nickname={dummyProfile.nickname}
            />
            <SquareButtonList />
            <MyPageSettingList />
            <NavigationBar />
            {/* 로그아웃 이벤트 추가 */}
            <LogoutButton>로그아웃</LogoutButton>
        </MyPageWrap>
    );
};

export default MyPage;
