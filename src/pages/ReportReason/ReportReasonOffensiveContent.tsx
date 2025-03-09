import styled from "styled-components";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { useNavigate } from "react-router-dom";
import CheckIcon from "../assets/icons/check1.svg?react";

const ReportReasonOffensiveContent = () => {
    const navigate = useNavigate();
    const settings = ["상점 및 타 사이트 홍보", "상품 도배", "기타 영리적 목적이 확인되는 콘텐츠"];

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

export default ReportReasonOffensiveContent;

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

const RotatedBackIcon = styled(CheckIcon)`
    transform: rotate(180deg);
`;
