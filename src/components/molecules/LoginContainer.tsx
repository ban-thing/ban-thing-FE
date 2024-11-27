import styled from "styled-components";
import { Button, UnderlineTextButton } from "@/components/atoms/Button";
import Character from "@/assets/character.svg?react";
import { Link } from "react-router-dom";
import { useLoginStore } from "@/store/LoginStore";

const LoginTextBox = styled.div`
    height: 549px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 20px;
`;

const WelcomeTitle = styled.h1`
    font-weight: 700;
    font-size: 32px;
    width: 220px;
    margin-bottom: 10px;
`;

const WelcomeSubTitle = styled.h2`
    font-size: 16px;
    color: var(--color-black-5);
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 29px;
`;

const MainCharacterButton = styled.div`
    width: 100%;
    height: 130px;
    display: flex;
    align-items: flex-end;
    position: relative;
`;

const MainCharacter = styled.div`
    position: absolute;
    top: 0;
    right: 50px;
    z-index: 9;
`;

const ButtonWrap = styled.div`
    z-index: 10;
`;

export default function LoginContainer() {
    const { showLoginModal } = useLoginStore();

    return (
        <>
            <LoginTextBox>
                <div>
                    <WelcomeTitle>반띵에 오신 것을 환영해요~!</WelcomeTitle>
                    <WelcomeSubTitle>우리동네 펫용품 중고거래 서비스</WelcomeSubTitle>
                </div>
                <ButtonGroup>
                    <MainCharacterButton>
                        <MainCharacter>
                            <Character />
                        </MainCharacter>
                        <ButtonWrap>
                            <Button variant="gray" hoverAction={false} onClick={showLoginModal}>
                                카카오로 로그인
                            </Button>
                        </ButtonWrap>
                    </MainCharacterButton>
                    <UnderlineTextButton>
                        <Link to={"/"}>로그인 없이 둘러보기</Link>
                    </UnderlineTextButton>
                </ButtonGroup>
            </LoginTextBox>
        </>
    );
}
