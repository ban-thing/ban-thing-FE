import HomeHeader from "@/components/atoms/HomeHeader";
import NavigationBar from "@/components/atoms/NavigationBar";
import { ReactNode } from "react";
import { MySellButton } from "@/components/atoms/Button";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

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
    right: -230px;
`;

const HomeLayout = ({ children }: HomeLayoutProps) => {
    const navigate = useNavigate();
    const onClickSellButton = () => {
        navigate("/item-register");
    };
    return (
        <>
            <HomeHeader />
            {children}
            <StyledDiv>
                <BtnWrap>
                    {/* <ItemPlusButton /> */}
                    <MySellButton onClick={onClickSellButton} />
                </BtnWrap>
            </StyledDiv>
            <NavigationBar />
        </>
    );
};

export default HomeLayout;
