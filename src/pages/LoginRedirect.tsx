import { useFetchKakaoLogin, useFetchKakaoLogin_token } from "@/hooks/api/UsersQuery";
import { setCookie } from "@/utils/Cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginRedirect = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [loginText, setLoginText] = useState("로그인 중");
    const code = new URL(document.location.toString()).searchParams.get("code");
    const { data, isLoading } = useFetchKakaoLogin(code || "");
    const { data: tokenData, isLoading: isTokenLoading } = useFetchKakaoLogin_token(
        data?.access_token || "",
        code || "",
    );

    useEffect(() => {
        if (!isLoading && data) {
            queryClient.invalidateQueries({
                queryKey: ["kakaoLogin_token"],
            });
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            setCookie("access_token", data.access_token, { path: "/login" });
            setCookie("refresh_token", data.refresh_token, { path: "/login" });
        }
        if (!isLoading && data && !isTokenLoading && tokenData) {
            setLoginText("로그인 성공");
            if (tokenData.message.includes("로그인")) {
                navigate("");
            } else navigate("/location-select");
        }
    }, [data, isLoading, tokenData, isTokenLoading, code]);

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
