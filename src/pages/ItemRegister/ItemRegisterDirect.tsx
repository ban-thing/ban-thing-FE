import { Input } from "@/components/atoms/Input";
import { RegisterSubTitle } from "@/components/atoms/ItemRegisterElement";
import { PageTitle } from "@/components/atoms/PageTitle";
import BottomButtonBar from "@/components/molecules/BottomButtonBar";
import { AddressDropdown } from "@/components/molecules/ItemRegister/AddressDropdown";
import { useItemRegisterAddressStore } from "@/store/ItemRegisterStore";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledInputWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const dummyList = ["인천광역시 연수구 연수동", "인천광역시 연수구 송도동", "서울특별시 강남구"];

const ItemRegisterDirect = () => {
    const { itemRegisterDirectLocation, setItemRegisterDirectLocation } =
        useItemRegisterAddressStore();
    const [showDropdown, setShowDropdown] = useState(false);
    const [location, setLocation] = useState("");

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

    const onClickComplete = () => {
        setItemRegisterDirectLocation(location);
        // window.close();
    };

    console.log(itemRegisterDirectLocation);

    return (
        <>
            <PageTitle>직거래 설정</PageTitle>
            <StyledInputWrap>
                <div>
                    <RegisterSubTitle>지역</RegisterSubTitle>
                    <AddressDropdown
                        showDropdown={showDropdown}
                        setShowDropdown={setShowDropdown}
                        addresses={dummyList}
                    />
                </div>
                <div style={showDropdown ? { marginTop: "110px" } : undefined}>
                    <RegisterSubTitle>거래 희망 장소</RegisterSubTitle>
                    <Input
                        placeholder="거래 희망 장소를 입력해주세요."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
            </StyledInputWrap>
            <BottomButtonBar buttonText="완료" onClick={onClickComplete} />
        </>
    );
};

export default ItemRegisterDirect;
