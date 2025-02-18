import styled from "styled-components";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { useNavigate } from "react-router-dom";
import BackIcon from "@/assets/icons/back.svg?react";

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

    const handleItemClick = (value: string) => {
        if (value === "기타") {
            navigate("/my-page/cancel-other");
        } else {
            navigate("/my-page/cancel-notice", { state: { reason: value } });
        }
    };

    return (
        <MyPageAccountWrap>
            <PageTitleWithBackButton
                text="회원탈퇴"
                $margin="10px 0"
                backTo="/my-page/account-setting"
            />
            <SettingList>
                {settings.map((value, index) => (
                    <SettingItem key={index} onClick={() => handleItemClick(value)}>
                        {value}
                        <RotatedBackIcon />
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
    width: 100%;
    margin-top: 30px;
`;

const SettingItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 20px;
    width: 100%;
    height: 50px;
    color: var(--color-black-4);
    box-sizing: border-box;
    cursor: pointer;
`;

const RotatedBackIcon = styled(BackIcon)`
    transform: rotate(180deg);
`;
