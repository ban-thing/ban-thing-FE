import { useFetchKakaoLogin, useFetchKakaoLogin_token } from "@/hooks/api/UsersQuery";
import { getAllCookiesByName, removeAllCookiesByName, setCookie } from "@/utils/Cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const LoginRedirect = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const code = new URL(document.location.toString()).searchParams.get("code");
    const errorDesc = new URL(document.location.toString()).searchParams.get("error_description");
    const { data, isLoading } = useFetchKakaoLogin(code || "");
    const { data: tokenData, isLoading: isTokenLoading } = useFetchKakaoLogin_token(
        data?.access_token || "",
        code || "",
    );

    // 유저가 로그인 동의했을 때
    useEffect(() => {
        if (!isLoading && data) {
            queryClient.invalidateQueries({
                queryKey: ["kakaoLogin_token"],
            });
        }
        if (!isLoading && data && !isTokenLoading && tokenData) {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            if (getAllCookiesByName("Authorization_banthing")) {
                removeAllCookiesByName("Authorization_banthing");
            }
            setCookie("Authorization_banthing", tokenData.data, { path: "/", maxAge: 10800 });
            if (tokenData.message.includes("로그인")) {
                navigate("/");
            } else navigate("/location-select");
        }
    }, [data, isLoading, tokenData, isTokenLoading, code]);

    // 유저가 로그인 취소했을 때
    useEffect(() => {
        if (errorDesc && errorDesc == "User denied access") {
            navigate("/login");
        }
    }, [errorDesc]);

    return (
        <LoginFailed>
            <ClipLoader size={48} color="#d7d7d7" />
        </LoginFailed>
    );
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
