import styled from "styled-components";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { useNavigate } from "react-router-dom";
import CheckIcon from "../assets/icons/check1.svg?react";
import { Button } from "@/components/atoms/Button";
import { useState } from "react";

const ReportReasonAdvertisement = () => {
    const navigate = useNavigate();
    const settings = ["상점 및 타 사이트 홍보", "상품 도배", "기타 영리적 목적이 확인되는 콘텐츠"];
    const [selectedReason, setSelectedReason] = useState<string>("");

    const handleItemClick = (value: string) => {
        setSelectedReason(value);
    };

    return (
        <ReportReasonWrap>
            <PageTitleWithBackButton text="신고 사유" $margin="10px 0" backTo="" />
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
                        navigate("/my-page/cancel-notice", {
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

export default ReportReasonAdvertisement;
const ReportReasonWrap = styled.div`
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
    background-color: ${(props) => (props.$isSelected ? "var(--color-black-8)" : "transparent")};
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
