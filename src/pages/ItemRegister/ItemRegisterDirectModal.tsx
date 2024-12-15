import { Input } from "@/components/atoms/Input";
import { RegisterSubTitle } from "@/components/atoms/ItemRegisterElement";
import ItemRegisterModalLayout from "@/components/layout/ItemRegisterModalLayout";
import { AddressDropdown } from "@/components/molecules/ItemRegister/AddressDropdown";
import { useFetchMyProfile } from "@/hooks/api/UsersQuery";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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

const ItemRegisterDirectModal = ({ setShowModal, register, setValue, watch }: DirectModalProps) => {
    const { data } = useFetchMyProfile();
    const [showDropdown, setShowDropdown] = useState(false);
    const [addressList, setAddressList] = useState<any[]>(["동 데이터 불러오는 중"]);
    const [address, setAddress] = useState(addressList[0]);

    const onClickComplete = () => {
        setValue("address", address);
        setShowModal(false);
    };

    useEffect(() => {
        if (data) {
            setAddressList([data?.data.address1, data?.data.address2, data?.data.address3]);
        }
    }, [data]);

    return (
        <ItemRegisterModalLayout
            buttonDisabled={!watch("directLocation")}
            titleText="직거래 설정"
            onClickComplete={onClickComplete}
            setShowModal={setShowModal}
        >
            <StyledInputWrap>
                <div>
                    <RegisterSubTitle>지역</RegisterSubTitle>
                    <AddressDropdown
                        showDropdown={showDropdown}
                        setShowDropdown={setShowDropdown}
                        addresses={addressList}
                        setAddress={setAddress}
                    />
                </div>
                <div style={showDropdown ? { marginTop: "110px" } : undefined}>
                    <RegisterSubTitle>거래 희망 장소</RegisterSubTitle>
                    <Input
                        placeholder="거래 희망 장소를 입력해요."
                        {...register("directLocation")}
                    />
                </div>
            </StyledInputWrap>
        </ItemRegisterModalLayout>
    );
};

export default ItemRegisterDirectModal;
