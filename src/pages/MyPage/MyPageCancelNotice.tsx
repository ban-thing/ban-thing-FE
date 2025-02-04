import styled from "styled-components";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/atoms/Button";

const MyPageCancelNotice = () => {
    const navigate = useNavigate();

    const settings = [
        "• 탈퇴 후 7일간 재가입이 불가능합니다.",
        "• 탈퇴 시, 계정의 모든 정보는 삭제되며 재가입 시에도 복구되지않습니다.",
    ];

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
                    onClick={() => {
                        /* 탈퇴 로직 추가 */
                    }}
                    variant="outlined"
                    size="small"
                    style={{
                        border: "1px solid var(--color-black-5)",
                        backgroundColor: "var(--color-black-5)",
                        cursor: "pointer",
                    }}
                >
                    탈퇴하기
                </Button>
            </ButtonContainer>
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
    height: 50px;
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
    gap: 8px;
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
`;
