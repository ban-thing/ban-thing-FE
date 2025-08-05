import styled from "styled-components";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/atoms/Button";
import { ConfirmModal } from "@/components/molecules/ConfirmModal";
import { useState } from "react";
import { useFetchDeleteUser } from "@/hooks/api/UsersQuery";

const MyPageCancelNotice = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const deleteUserMutation = useFetchDeleteUser();
    const reason = location.state?.reason || "회원 탈퇴";
    const memo = location.state?.memo || "";

    const settings = [
        "• 탈퇴 후 7일간 재가입이 불가능합니다.",
        "• 탈퇴 시, 계정의 모든 정보는 삭제되며 재가입 시에도 복구되지않습니다.",
        "• 법령에서 일정기간 정보 보관을 규정하거나 서비스 운영상 반드시 필요한 경우, 개인정보처리방침에 공개한 내용과 같이 일정한 기간 동안 개인정보를 보관 후 파기합니다.",
    ];

    const handleWithdrawal = () => {
        console.log("🔍 회원 탈퇴 요청:", { reason, memo });
        deleteUserMutation.mutate({ reason, memo });
        setShowModal(false);
    };

    return (
        <MyPageCancelNoticeWrap>
            <PageTitleWithBackButton
                text="탈퇴전 유의사항"
                $margin="10px 0"
                backTo="/my-page/cancel-membership"
            />
            <SettingList>
                {settings.map((value, index) => (
                    <SettingItem key={index}>{value}</SettingItem>
                ))}
            </SettingList>
            <ButtonContainer>
                <Button
                    onClick={() => navigate("/my-page/cancel-membership")}
                    size="small"
                    style={{
                        backgroundColor: "var(--color-main-1)",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    취소
                </Button>
                <Button
                    onClick={() => setShowModal(true)}
                    variant="outlined"
                    size="small"
                    style={{
                        border: "1px solid var(--color-black-5)",
                        color: "var(--color-black-5)",
                        backgroundColor: "white",
                        cursor: "pointer",
                    }}
                >
                    탈퇴하기
                </Button>
            </ButtonContainer>

            <ConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleWithdrawal}
                message="정말 탈퇴하시겠습니까?"
                subMessage="계정의 모든 정보는 삭제되며 복구되지않습니다."
            />
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
    height: 100%;
    font-size: 16px;
    color: var(--color-black-4);
    box-sizing: border-box;
`;

const ButtonContainer = styled.div`
    width: 375px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    box-sizing: border-box;
    gap: 15px;
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
`;
