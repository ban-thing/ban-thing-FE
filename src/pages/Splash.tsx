import styled from "styled-components";
import MainLogo from "@/components/atoms/MainLogo";

const SplashBox = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-main-2);
`;

const Splash = () => {
    return (
        <SplashBox>
            <MainLogo />
        </SplashBox>
    );
};

export default Splash;
