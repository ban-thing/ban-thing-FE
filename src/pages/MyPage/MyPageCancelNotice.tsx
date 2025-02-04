import styled from "styled-components";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";

const MyPageCancelNotice = () => {
    return (
        <MyPageCancelNoticeWrap>
            <PageTitleWithBackButton text="탈퇴전 유의사항" $margin="10px 0" backTo="/my-page" />
        </MyPageCancelNoticeWrap>
    );
};

export default MyPageCancelNotice;

const MyPageCancelNoticeWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;
