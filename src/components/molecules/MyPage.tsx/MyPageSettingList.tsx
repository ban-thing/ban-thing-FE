import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledMyPageSettingList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 113px;
`;

const SettingTitle = styled.div`
    font-size: 14px;
    color: var(--color-black-4);
`;

const SettingText = styled.div`
    color: var(--color-black-1);
    cursor: pointer;
`;

const MyPageSettingList = () => {
    const navigate = useNavigate();
    const url = [
        "terms-of-use",
        "personal-info",
        "location-based",
        "version-info",
        "account-setting",
    ];
    const settings = ["이용약관", "개인정보", "위치기반", "버전정보", "계정설정"];
    return (
        <StyledMyPageSettingList>
            <SettingTitle>설정</SettingTitle>
            {settings.map((value, index) => (
                <SettingText key={index} onClick={() => navigate(url[index])}>
                    {value}
                </SettingText>
            ))}
        </StyledMyPageSettingList>
    );
};

export default MyPageSettingList;
