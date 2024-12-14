import { useFetchKakaoLogin, useFetchKakaoLogin_token } from "@/hooks/api/UsersQuery";
import { setCookie } from "@/utils/Cookie";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginRedirect = () => {
    // const navigate = useNavigate();
    const [loginText, setLoginText] = useState("로그인 중");
    const code = new URL(document.location.toString()).searchParams.get("code");
    const { data, isLoading } = useFetchKakaoLogin(code || "");
    const { status: tokenData, isLoading: isTokenLoading } = useFetchKakaoLogin_token(
        data?.access_token || "",
    );

    useEffect(() => {
        console.log(data, isLoading, tokenData, isTokenLoading);
        if (!isLoading && data) {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            setCookie("access_token", data.access_token, { path: "/login" });
            setCookie("refresh_token", data.refresh_token, { path: "/login" });
        }
        if (!isLoading && !isTokenLoading && data && tokenData) {
            setLoginText("로그인 성공");
            // navigate("/location-select");
        }
    }, [data, isLoading, code]);

    return <LoginFailed>{loginText}</LoginFailed>;
};

export default LoginRedirect;

const LoginFailed = styled.div`
    width: 100%;
    max-width: 375px;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;
