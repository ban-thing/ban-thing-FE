import styled from "styled-components";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { useNavigate, useLocation } from "react-router-dom";
import CheckIcon from "../../assets/icons/check1.svg?react";
import { Button } from "@/components/atoms/Button";
import { useState } from "react";

const ReportReasonReportAuthor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCategory = location.state?.category || "작성자 신고하기";
    const settings = ["비매너 사용자", "거래 중 분쟁 발생", "사기 의심", "욕설 비방 혐오표현 사용", "연애 목적의 원하지 않는 대화 시도", "부적절한 성적 행위", "기타 부적절한 행위 (text입력)"];
    const [selectedReason, setSelectedReason] = useState<string>("");

    const handleItemClick = (value: string) => {
        setSelectedReason(value);
    };

    return (
        <ReportReasonWrap>
            <PageTitleWithBackButton text="신고 사유" $margin="10px 0" backTo="" />
            <SelectedCategory>{selectedCategory}</SelectedCategory>
            <SettingList>
                {settings.map((value, index) => (
                    <SettingItem
                        key={index}
                        onClick={() => handleItemClick(value)}
                        $isSelected={selectedReason === value}
                    >
                        {value}
                        <CheckIcon />
                    </SettingItem>
                ))}
            </SettingList>
            <ButtonContainer>
                <Button
                    onClick={() =>
                        navigate("/report-reason", {
                            state: { reason: selectedReason },
                        })
                    }
                    size="large"
                    disabled={!selectedReason}
                    style={{
                        backgroundColor: selectedReason
                            ? "var(--color-main-1)"
                            : "var(--color-black-6)",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    신고하기
                </Button>
            </ButtonContainer>
        </ReportReasonWrap>
    );
};

export default ReportReasonReportAuthor;

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
    color: var(--color-main-1);
    margin-top: 40px;
    text-align: center;
`;

const SettingList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 30px;
`;

const SettingItem = styled.div<{ $isSelected?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 20px;
    width: 100%;
    height: 50px;
    color: var(--color-black-4);
    box-sizing: border-box;
    cursor: pointer;
    background-color: ${(props) => (props.$isSelected ? "rgba(199, 198, 255, 0.3)" : "transparent")};
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
