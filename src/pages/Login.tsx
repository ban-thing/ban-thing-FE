import styled from "styled-components";
import { KakaoLoginButton, UnderlineTextButton } from "@/components/atoms/Button";
import { Link } from "react-router-dom";
import MainLogo from "@/components/atoms/MainLogo";

const LoginBox = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    background: linear-gradient(#9dbdff 44%, #d8e5ff 79%, #e6eeff 100%);
`;

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

const Login = () => {
    const uri = window.location.href.includes("localhost")
        ? import.meta.env.VITE_REDIRECT_URI_LOCAL
        : import.meta.env.VITE_REDIRECT_URI;
    // const uri = import.meta.env.VITE_REDIRECT_URI;

    const onClickLogin = () => {
        // 인가코드 요청
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_REST_API_KEY}&redirect_uri=${uri}&response_type=code`;
    };
    return (
        <LoginBox>
            <LoginTextBox>
                <div>
                    <WelcomeSubTitle>반려동물용품</WelcomeSubTitle>
                    <WelcomeTitle>중고거래는?</WelcomeTitle>
                </div>
                <MainLogo />
                <KakaoLoginButton onClick={onClickLogin} />
                <UnderlineTextButton width="150px">
                    <Link to={"/"} style={{ padding: "8px" }}>
                        로그인 없이 둘러보기
                    </Link>
                </UnderlineTextButton>
            </LoginTextBox>
        </LoginBox>
    );
};

export default Login;
