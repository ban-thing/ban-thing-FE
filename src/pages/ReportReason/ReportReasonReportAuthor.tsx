import styled from "styled-components";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { useNavigate, useLocation } from "react-router-dom";
import CheckIcon from "../../assets/icons/check1.svg?react";
import { Button } from "@/components/atoms/Button";
import { useState } from "react";
import { ConfirmModal } from "@/components/molecules/ConfirmModal";
import { useFetchUserReport } from "@/hooks/api/UsersQuery";

const ReportReasonReportAuthor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCategory = location.state?.category || "작성자 신고하기";
    const itemId = location.state?.itemId;
    const sellerId = location.state?.sellerId;
    
    console.log('🔍 ReportReasonReportAuthor 페이지 로드:', { selectedCategory, itemId, sellerId, locationState: location.state });
    const settings = ["비매너 사용자", "거래 중 분쟁 발생", "사기 의심", "욕설 비방 혐오표현 사용", "연애 목적의 원하지 않는 대화 시도", "부적절한 성적 행위", "기타 부적절한 행위"];
    const [selectedReason, setSelectedReason] = useState<string>("");
    const [otherReason, setOtherReason] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { mutate: reportUser } = useFetchUserReport();

    const handleItemClick = (value: string) => {
        setSelectedReason(value);
    };

    const handleReportButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
        
        console.log('🔍 작성자 신고 시작:', { sellerId, selectedCategory, selectedReason, otherReason });
        
        // Validation 추가
        if (!sellerId || isNaN(Number(sellerId))) {
            console.error('❌ sellerId가 유효하지 않습니다:', sellerId);
            alert('작성자 정보가 올바르지 않습니다.');
            return;
        }
        
        if (!selectedReason || selectedReason.trim() === "") {
            console.error('❌ 신고 사유가 선택되지 않았습니다:', selectedReason);
            alert('신고 사유를 선택해주세요.');
            return;
        }
        
        if (selectedReason === "기타 부적절한 행위" && (!otherReason || otherReason.trim() === "")) {
            console.error('❌ 기타 사유에 대한 상세 내용이 입력되지 않았습니다');
            alert('상세 신고 사유를 입력해주세요.');
            return;
        }
        
        if (sellerId) {
            const reportData = {
                userId: sellerId, 
                reason: selectedReason,
                detailed_reason: selectedReason === "기타 부적절한 행위" ? otherReason : ""
            };
            
            console.log('📤 useFetchUserReport API 호출:', reportData);
            console.log('📤 sellerId 타입 및 값 확인:', { 
                sellerId, 
                sellerIdType: typeof sellerId, 
                sellerIdNumber: Number(sellerId),
                isNaN: isNaN(Number(sellerId))
            });
            
            reportUser(reportData, {
                onSuccess: (response) => {
                    console.log('✅ 작성자 신고 성공:', response);
                    navigate('/');
                    // 여기에 성공 토스트 메시지를 추가할 수 있습니다
                },
                onError: (error: any) => {
                    console.error('❌ 작성자 신고 실패:', error);
                    console.error('❌ 에러 상세 정보:', {
                        status: error.response?.status,
                        statusText: error.response?.statusText,
                        data: error.response?.data,
                        config: error.config,
                        message: error.message
                    });
                    // 여기에 오류 토스트 메시지를 추가할 수 있습니다
                }
            });
        } else {
            console.error('❌ sellerId가 없어서 신고할 수 없습니다:', { sellerId, itemId });
            alert('작성자 정보를 찾을 수 없습니다.');
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
            
            {selectedReason === "기타 부적절한 행위" && (
                <OtherReasonContainer>
                    <OtherReasonInput 
                        placeholder="신고 사유를 자세하게 작성해주세요.&#13;&#10;자세히 적어주시면 신고 처리에 큰 도움이 됩니다."
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                    />
                </OtherReasonContainer>
            )}
            
            <ButtonContainer>
                <Button
                    onClick={handleReportButtonClick}
                    size="large"
                    disabled={!selectedReason || (selectedReason === "기타 부적절한 행위" && !otherReason)}
                    style={{
                        backgroundColor: selectedReason && 
                            (selectedReason !== "기타 부적절한 행위" || otherReason)
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

const OtherReasonContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 0 20px;
    margin-top: 20px;
    margin-bottom: 100px;
    box-sizing: border-box;
`;

const OtherReasonInput = styled.textarea`
    width: 100%;
    height: 120px;
    max-height: 30vh;
    padding: 12px;
    border: 1px solid var(--color-black-6);
    border-radius: 8px;
    resize: vertical;
    font-size: 14px;
    overflow-y: auto;
    &::placeholder {
        color: var(--color-black-5);
    }
    &:focus {
        outline: none;
        border-color: var(--color-main-1);
    }
`;