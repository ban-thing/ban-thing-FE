import styled from "styled-components";
import { Button, UnderlineTextButton } from "@/components/atoms/Button";
import { Link } from "react-router-dom";
import { useLoginModalStore } from "@/store/ModalStore";
import MainLogo from "@/components/atoms/MainLogo";

const LoginTextBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 20px;
`;

const WelcomeTitle = styled.h1`
    font-weight: 700;
    font-size: 30px;
    width: 220px;
    margin-bottom: 15px;
`;

const WelcomeSubTitle = styled.h2`
    font-size: 18px;
`;

const ButtonWrap = styled.div`
    z-index: 10;
    margin-bottom: 20px;
`;

export default function LoginContainer() {
    const { showLoginModal } = useLoginModalStore();

    return (
        <>
            <LoginTextBox>
                <div>
                    <WelcomeSubTitle>반려동물용품</WelcomeSubTitle>
                    <WelcomeTitle>중고거래는?</WelcomeTitle>
                </div>
                <MainLogo />
                <ButtonWrap>
                    <Button variant="yellow" $hoverAction={false} onClick={showLoginModal}>
                        카카오로 3초만에 로그인
                    </Button>
                </ButtonWrap>
                <UnderlineTextButton width="150px">
                    <Link to={"/"} style={{ padding: "8px" }}>
                        로그인 없이 둘러보기
                    </Link>
                </UnderlineTextButton>
            </LoginTextBox>
        </>
    );
}
