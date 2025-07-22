import styled from "styled-components";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { useNavigate, useLocation } from "react-router-dom";
import BackIcon from "@/assets/icons/back.svg?react";

const ReportReason = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const itemId = location.state?.itemId;
    const sellerId = location.state?.sellerId;
    
    console.log('🔍 ReportReason 페이지 로드:', { itemId, sellerId, locationState: location.state });
    const settings = [
        "광고성 컨텐츠예요",
        "상품 정보가 부정확해요",
        "거래 금지 품목으로 판단돼요",
        "안전한 거래를 거부해요",
        "사기가 의심돼요",
        "전문 판매업자 같아요",
        "콘텐츠 내용이 불쾌해요",
    ];

    const handleItemClick = (value: string) => {
        switch (value) {
            case "광고성 컨텐츠예요":
                navigate("/report-reason/advertisement", { state: { category: value, itemId } });
                break;
            case "상품 정보가 부정확해요":
                navigate("/report-reason/inaccurate-info", { state: { category: value, itemId } });
                break;
            case "거래 금지 품목으로 판단돼요":
                navigate("/report-reason/prohibited-item", { state: { category: value, itemId } });
                break;
            case "안전한 거래를 거부해요":
                navigate("/report-reason/refuse-safe-transaction", { state: { category: value, itemId } });
                break;
            case "사기가 의심돼요":
                navigate("/report-reason/suspected-fraud", { state: { category: value, itemId } });
                break;
            case "전문 판매업자 같아요":
                navigate("/report-reason/professional-seller", { state: { category: value, itemId } });
                break;
            case "콘텐츠 내용이 불쾌해요":
                navigate("/report-reason/offensive-content", { state: { category: value, itemId } });
                break;
            default:
                break;
        }
    };

    return (
        <ReportReasonWrap>
            <PageTitleWithBackButton text="신고 사유" $margin="10px 0" />
            <SettingList>
                {settings.map((value, index) => (
                    <SettingItem key={index} onClick={() => handleItemClick(value)}>
                        {value}
                        <RotatedBackIcon />
                    </SettingItem>
                ))}
            </SettingList>
            <ReportAuthorButton onClick={() => {
                console.log('🔍 작성자 신고하기 버튼 클릭:', { itemId, sellerId });
                navigate("/report-reason/report-author", { state: { itemId, sellerId } });
            }}>
                작성자 신고하기
            </ReportAuthorButton>
        </ReportReasonWrap>
    );
};

export default ReportReason;

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

const SettingItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 20px;
    width: 100%;
    height: 50px;
    color: var(--color-black-4);
    box-sizing: border-box;
    cursor: pointer;
`;

const RotatedBackIcon = styled(BackIcon)`
    transform: rotate(180deg);
`;
const ReportAuthorButton = styled.button`
    background: none;
    border: none;
    color: var(--color-main-1);
    text-decoration: underline;
    font-size: 14px;
    cursor: pointer;
    margin-top: 24px;
    padding: 8px 20px;
`;
