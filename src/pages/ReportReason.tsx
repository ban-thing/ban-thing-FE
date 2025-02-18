import styled from "styled-components";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { useNavigate } from "react-router-dom";
import BackIcon from "@/assets/icons/back.svg?react";

const ReportReason = () => {
    const navigate = useNavigate();
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
        if (value === "기타") {
            navigate("/my-page/cancel-other");
        } else {
            navigate("/my-page/cancel-notice", { state: { reason: value } });
        }
    };

    return (
        <ReportReasonWrap>
            <PageTitleWithBackButton text="신고 사유" $margin="10px 0" backTo="" />
            <SettingList>
                {settings.map((value, index) => (
                    <SettingItem key={index} onClick={() => handleItemClick(value)}>
                        {value}
                        <RotatedBackIcon />
                    </SettingItem>
                ))}
            </SettingList>
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
