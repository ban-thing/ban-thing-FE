import styled from "styled-components";
import { Button } from "@/components/atoms/Button";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MyPageCancelOther = () => {
    const navigate = useNavigate();
    const [reason, setReason] = useState("");

    return (
        <MyPageCancelNoticeWrap>
            <PageTitleWithBackButton
                text="기타"
                $margin="10px 0"
                backTo="/my-page/cancel-membership"
            />
            <SettingList>
                <GuideText>
                    탈퇴 사유를 남겨주시면
                    <br />
                    서비스 개선에 큰 도움이 돼요!
                </GuideText>
                <TextAreaContainer>
                    <TextArea
                        placeholder="탈퇴사유를 작성해 주세요."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                    <SkipButton onClick={() => navigate("/my-page/cancel-notice")}>
                        넘어가기
                    </SkipButton>
                </TextAreaContainer>
            </SettingList>
            <ButtonContainer>
                <Button
                    onClick={() =>
                        navigate("/my-page/cancel-notice", {
                            state: { reason: "기타", memo: reason.trim() },
                        })
                    }
                    size="large"
                    disabled={!reason.trim()}
                    style={{
                        backgroundColor: reason.trim()
                            ? "var(--color-main-1)"
                            : "var(--color-black-6)",
                        color: "white",
                        cursor: reason.trim() ? "pointer" : "default",
                    }}
                >
                    진행하기
                </Button>
            </ButtonContainer>
        </MyPageCancelNoticeWrap>
    );
};

export default MyPageCancelOther;

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
    padding: 0 20px;
    box-sizing: border-box;
`;

const GuideText = styled.div`
    font-size: 20px;
    color: var(--color-black-2);
    margin-bottom: 16px;
    text-align: center;
`;

const TextAreaContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const SkipButton = styled.div`
    display: flex;
    justify-content: flex-end;
    background: none;
    border: none;
    color: var(--color-black-5);
    font-size: 12px;
    padding: 0;
    cursor: pointer;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 194px;
    padding: 16px;
    border: 1px solid var(--color-black-6);
    border-radius: 8px;
    resize: none;
    font-size: 14px;
    line-height: 1.5;
    color: var(--color-black-4);
    box-sizing: border-box;
    margin-bottom: 16px;
    &::placeholder {
        color: var(--color-black-6);
    }

    &:focus {
        outline: none;
        border-color: var(--color-main-1);
    }
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
