import styled from "styled-components";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { useNavigate } from "react-router-dom";

const MyPageCancelMembership = () => {
    const navigate = useNavigate();
    const settings = [
        "찾는 물품이 없어요",
        "물품이 안 팔려요",
        "비매너 사용자를 만났어요",
        "상품을 찾기 불편해요",
        "개인정보를 삭제하고 싶어요",
        "기타",
    ];
    return (
        <MyPageAccountWrap>
            <PageTitleWithBackButton text="회원탈퇴" $margin="10px 0" backTo="/my-page" />
            <SettingList>
                {settings.map((value, index) => (
                    <SettingItem key={index} onClick={() => navigate("/cancel-notice")}>
                        {value}
                    </SettingItem>
                ))}
            </SettingList>
        </MyPageAccountWrap>
    );
};

export default MyPageCancelMembership;

const MyPageAccountWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const SettingList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const SettingItem = styled.div`
    padding: 20px 28px;
    width: 100%;
    height: 50px;
    cursor: pointer;
    color: var(--color-black-4);
    box-sizing: border-box;
`;
