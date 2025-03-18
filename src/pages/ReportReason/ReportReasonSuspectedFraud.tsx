import styled from "styled-components";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";

const ReportReasonSuspectedFraud = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [reason, setReason] = useState("");
    const selectedCategory = location.state?.category || "사기가 의심돼요";

    return (
        <ReportReasonWrap>
            <PageTitleWithBackButton text="신고 사유" $margin="10px 0" backTo="" />
            <SelectedCategory>{selectedCategory}</SelectedCategory>
                <TextAreaContainer>
                        <TextArea
                            placeholder="신고 사유를 자세하게 작성해주세요.&#13;&#10;자세하게 적어주시면 신고 처리에 큰 도움이 됩니다."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                </TextAreaContainer>
                <ButtonContainer>
                    <Button
                        onClick={() =>
                            navigate("/report-reason", {
                                state: { reason: reason.trim() },
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
                        신고하기
                    </Button>
            </ButtonContainer>
        </ReportReasonWrap>
    );
};

export default ReportReasonSuspectedFraud;

const ReportReasonWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const SelectedCategory = styled.div`
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    color: var(--color-black-3);
    margin-top: 40px;
    margin-bottom: 24px;
    text-align: center;
`;

const TextAreaContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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