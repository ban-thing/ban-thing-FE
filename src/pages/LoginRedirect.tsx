import { useFetchKakaoLogin } from "@/hooks/api/UsersQuery";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginRedirect = () => {
    const [loginText, setLoginText] = useState("로그인 중");
    const navigate = useNavigate();
    const code = new URL(document.location.toString()).searchParams.get("code");
    const { data, isLoading } = useFetchKakaoLogin(code || "");

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
        }
        if (!isLoading && data) {
            // navigate("/location-select");
        } else {
            setLoginText("로그인 실패");
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