import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { useItemRegisterAddressStore } from "@/store/ItemRegisterStore";

const AddressDropdownWrap = styled.div`
    position: relative;
`;

const AddressHeadWrap = styled.div`
    position: relative;
    width: 334px;
    height: 52px;
    & > * {
        cursor: pointer;
    }
`;

const AddressFakeInputWrap = styled.div`
    position: absolute;
    background-color: #fff;
    top: 0;

    & > *:hover {
        color: var(--color-black-1);
        font-weight: 700;
    }
`;

const AddressFakeInput = styled.div`
    width: 301px;
    height: 18px;
    border: 1px solid var(--color-black-6);
    border-radius: 8px;
    padding: 16px;
    font-size: 15px;
    color: var(--color-black-5);
    cursor: pointer;

    &.highlight {
        color: var(--color-black-1);
        font-weight: 700;
    }
`;

const ChangeButton = styled.div`
    position: absolute;
    font-size: 14px;
    color: #c3c3c3;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
`;

type AddressDropdownProps = {
    addresses?: string[];
    headText?: string;
    showDropdown: boolean;
    setShowDropdown: Dispatch<SetStateAction<boolean>>;
};

const AddressDropdownHead = ({
    headText = "lorem",
    showDropdown,
    setShowDropdown,
}: AddressDropdownProps) => {
    const { setItemRegisterAddress } = useItemRegisterAddressStore();

    useEffect(() => {
        if (headText) {
            setItemRegisterAddress(headText);
        }
    }, [headText]);

    return (
        <AddressHeadWrap onClick={() => setShowDropdown(!showDropdown)}>
            <AddressFakeInput>{headText}</AddressFakeInput>
            <ChangeButton>변경</ChangeButton>
        </AddressHeadWrap>
    );
};

export const AddressDropdown = ({
    addresses = ["lorem", "ipsum", "dolar"],
    showDropdown = false,
    setShowDropdown,
}: AddressDropdownProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onClickAddress = (index: number) => {
        setSelectedIndex(index);
        setShowDropdown(false);
    };

    return (
        <AddressDropdownWrap>
            <AddressDropdownHead
                headText={addresses[selectedIndex]}
                setShowDropdown={setShowDropdown}
                showDropdown={showDropdown}
            />
            {showDropdown && (
                <AddressFakeInputWrap>
                    {addresses.map((value, index) => (
                        <AddressFakeInput
                            key={index}
                            className={selectedIndex === index ? "highlight" : ""}
                            onClick={() => onClickAddress(index)}
                        >
                            {value}
                        </AddressFakeInput>
                    ))}
                </AddressFakeInputWrap>
            )}
        </AddressDropdownWrap>
    );
};