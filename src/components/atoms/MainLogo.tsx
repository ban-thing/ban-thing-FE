import styled from "styled-components";
import LogoBlue from "@/assets/icons/logoBlue.svg?react";

const LogoWrap = styled.div`
    width: 150px;
    height: 150px;
    margin-bottom: 160px;
`;

const MainLogo = () => {
    return (
        <LogoWrap>
            <LogoBlue />
        </LogoWrap>
    );
};

export default MainLogo;
