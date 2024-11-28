import HomeHeader from "@/components/atoms/HomeHeader";
import NavigationBar from "@/components/atoms/NavigationBar";
import { ReactNode } from "react";
import { ItemPlusButton, MySellButton } from "@/components/atoms/Button";
import { styled } from "styled-components";

type HomeLayoutProps = {
    children: ReactNode;
};

const StyledDiv = styled.div`
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
`;

const BtnWrap = styled.div`
    position: absolute;
    width: 100%;
    right: -190px;
`;

const HomeLayout = ({ children }: HomeLayoutProps) => {
    return (
        <>
            <HomeHeader />
            {children}
            <StyledDiv>
                <BtnWrap>
                    {/* <ItemPlusButton /> */}
                    <MySellButton />
                </BtnWrap>
            </StyledDiv>
            <NavigationBar />
        </>
    );
};

export default HomeLayout;
