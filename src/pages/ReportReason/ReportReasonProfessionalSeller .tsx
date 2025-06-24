import styled from "styled-components";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { useNavigate, useLocation } from "react-router-dom";
import CheckIcon from "../../assets/icons/check1.svg?react";
import { Button } from "@/components/atoms/Button";
import { useState } from "react";
import { ConfirmModal } from "@/components/molecules/ConfirmModal";
import { useFetchItemReport } from "@/hooks/api/ItemsQuery";

const ReportReasonProfessionalSeller = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCategory = location.state?.category || "전문 판매업자 같아요";
    const itemId = location.state?.itemId;
    const settings = ["동일/유사한 제품을 단기간에 판매", "동일 제품을 다양한 사이즈나 색상 판매", "기타 영리적 목적이 확인"];
    const [selectedReason, setSelectedReason] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { mutate: reportItem } = useFetchItemReport();

    const handleItemClick = (value: string) => {
        setSelectedReason(value);
    };

    const handleReportButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
        
        if (itemId) {
            reportItem({
                itemId, 
                hiReason: selectedCategory,
                loReason: selectedReason
            }, {
                onSuccess: () => {
                    navigate('/');
                    // 여기에 성공 토스트 메시지를 추가할 수 있습니다
                },
                onError: (error) => {
                    console.error('신고 처리 중 오류 발생:', error);
                    // 여기에 오류 토스트 메시지를 추가할 수 있습니다
                }
            });
        } else {
            navigate("/");
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                    onClick={handleReportButtonClick}
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

            <ConfirmModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onConfirm={handleConfirm}
                message="신고 하시겠습니까?"
                subMessage="신고 내용은 반띵 이용약관 및 정책에 의해서 처리되며, 허위신고 시 반띵 이용이 제한될 수 있습니다."
                confirmText="확인"
                cancelText="취소"
            />
        </ReportReasonWrap>
    );
};

export default ReportReasonProfessionalSeller;

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
