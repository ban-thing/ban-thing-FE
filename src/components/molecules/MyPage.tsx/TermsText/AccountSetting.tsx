import styled from "styled-components";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "@/utils/Cookie";
import { useState } from "react";
import FootprintIcon from "@/assets/icons/footPrintBackground.svg?react";

const AccountSetting = () => {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        removeCookie("Authorization_banthing");
        navigate("/login");
    };

    return (
        <MyPageAccountWrap>
            <PageTitleWithBackButton text="계정설정" $margin="10px 0" backTo="/my-page" />
            <SettingList>
                <SettingItem onClick={() => setShowLogoutModal(true)}>로그아웃</SettingItem>
                <SettingItem onClick={() => navigate("/my-page/cancel-membership")}>
                    회원탈퇴
                </SettingItem>
            </SettingList>

            <CenterIcon>
                <FootprintIcon />
            </CenterIcon>

            {showLogoutModal && (
                <>
                    <ModalBase />
                    <ModalContainer>
                        <ModalTextContainer>
                            <ModalTextBox>로그아웃 하시겠습니까?</ModalTextBox>
                            <Line />
                            <ButtonContainer>
                                <ActionButton onClick={() => setShowLogoutModal(false)}>
                                    취소
                                </ActionButton>
                                <ButtonDivider />
                                <ActionButton $isConfirm onClick={handleLogout}>
                                    확인
                                </ActionButton>
                            </ButtonContainer>
                        </ModalTextContainer>
                    </ModalContainer>
                </>
            )}
        </MyPageAccountWrap>
    );
};

export default AccountSetting;

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
    padding: 8px 20px;
    width: 100%;
    height: 50px;
    cursor: pointer;
    color: var(--color-black-4);
    box-sizing: border-box;
`;

const ModalBase = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 246px;
    height: 173px;
    border-radius: 24px;
    z-index: 20;
    box-sizing: border-box;
    overflow: hidden;
`;

const ModalTextContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

const ModalTextBox = styled.div`
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.4;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: var(--color-black-7);
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: stretch;
    width: 100%;
    height: 100%;
    position: relative;
`;

const ButtonDivider = styled.div`
    width: 1px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    background-color: var(--color-black-7);
    transform: translateX(-50%);
`;

const ActionButton = styled.button<{ $isConfirm?: boolean }>`
    width: 50%;
    border: none;
    background: none;
    font-size: 14px;
    font-weight: 500;
    padding: 15px 2px;
    color: ${({ $isConfirm }) => ($isConfirm ? "var(--color-main-1)" : "var(--color-black-5)")};
    cursor: pointer;
`;

const CenterIcon = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    svg {
        width: 118px;
        height: 118px;
    }
`;
