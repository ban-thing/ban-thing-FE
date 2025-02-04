import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { Button } from "@/components/atoms/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "@/utils/Cookie";
import { useState } from "react";

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
                <SettingItem>회원탈퇴</SettingItem>
            </SettingList>

            {showLogoutModal && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalText>로그아웃 하시겠습니까?</ModalText>
                        <ButtonGroup>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => setShowLogoutModal(false)}
                                style={{
                                    color: "var(--color-black-5)",
                                    borderColor: "var(--color-black-6)",
                                }}
                            >
                                취소
                            </Button>
                            <Button variant="filled" size="small" onClick={handleLogout}>
                                확인
                            </Button>
                        </ButtonGroup>
                    </ModalContent>
                </ModalOverlay>
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

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 24px;
    border-radius: 8px;
    width: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`;

const ModalText = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: var(--color-black-1);
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
    width: 100%;

    button {
        flex: 1;
    }
`;
