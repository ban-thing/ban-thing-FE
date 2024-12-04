import { Input } from "@/components/atoms/Input";
import { RegisterSubTitle } from "@/components/atoms/ItemRegisterElement";
import ItemRegisterModalLayout from "@/components/layout/ItemRegisterModalLayout";
import { AddressDropdown } from "@/components/molecules/ItemRegister/AddressDropdown";
import { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import styled from "styled-components";

const StyledInputWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

type DirectModalProps = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    register: UseFormRegister<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    watch: UseFormWatch<FieldValues>;
};

const dummyList = ["인천광역시 연수구 연수동", "인천광역시 연수구 송도동", "서울특별시 강남구"];

const ItemRegisterDirectModal = ({ setShowModal, register, setValue, watch }: DirectModalProps) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [address, setAddress] = useState(dummyList[0]);

    const onClickComplete = () => {
        setValue("address", address);
        setShowModal(false);
    };

    return (
        <ItemRegisterModalLayout
            buttonDisabled={!watch("directLocation")}
            titleText="직거래 설정"
            onClickComplete={onClickComplete}
        >
            <StyledInputWrap>
                <div>
                    <RegisterSubTitle>지역</RegisterSubTitle>
                    <AddressDropdown
                        showDropdown={showDropdown}
                        setShowDropdown={setShowDropdown}
                        addresses={dummyList}
                        setAddress={setAddress}
                    />
                </div>
                <div style={showDropdown ? { marginTop: "110px" } : undefined}>
                    <RegisterSubTitle>거래 희망 장소</RegisterSubTitle>
                    <Input
                        placeholder="거래 희망 장소를 입력해주세요."
                        {...register("directLocation")}
                    />
                </div>
            </StyledInputWrap>
        </ItemRegisterModalLayout>
    );
};

export default ItemRegisterDirectModal;
