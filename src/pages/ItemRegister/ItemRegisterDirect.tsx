import { Input } from "@/components/atoms/Input";
import { RegisterSubTitle } from "@/components/atoms/ItemRegisterElement";
import { PageTitle } from "@/components/atoms/PageTitle";
import { useEffect } from "react";
import styled from "styled-components";

const StyledInputWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const ItemRegisterDirect = () => {
    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        // 뒤로 가기 시 창 닫기
        const handlePopState = () => {
            window.close();
        };
        window.addEventListener("popstate", handlePopState);
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);
    return (
        <>
            <PageTitle>직거래 설정</PageTitle>
            <StyledInputWrap>
                <div>
                    <RegisterSubTitle>지역</RegisterSubTitle>
                    <Input />
                </div>
                <div>
                    <RegisterSubTitle>거래 희망 장소</RegisterSubTitle>
                    <Input />
                </div>
            </StyledInputWrap>
        </>
    );
};

export default ItemRegisterDirect;
