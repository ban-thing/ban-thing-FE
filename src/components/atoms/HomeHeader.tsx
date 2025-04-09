import styled from "styled-components";
import Search from "@/assets/icons/searchIcon.svg?react";
import { Dropdown } from "./Dropdown";
import { useNavigate } from "react-router-dom";
import { useFetchMyProfile } from "@/hooks/api/UsersQuery";
import { useEffect, useState } from "react";
import { useSelectedAddressStore } from "@/store/SelectedAddressStore";

const HeaderBox = styled.header`
    height: 50px;
    width: 100%;
    max-width: 375px;
    padding: 14px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    position: fixed;
    top: 0;
    z-index: 15;
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.05), transparent);
    }
`;

const SearchButton = styled.button`
    padding: 0 5px;
`;

export default function HomeHeader() {
    const [addressList, setAddressList] = useState<string[]>();
    const { data, isSuccess } = useFetchMyProfile();
    const { setSelectedAddress } = useSelectedAddressStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess && data) {
            const extractLastWord = (address: string) => {
                if (!address) return "";
                const words = address.split(" ");
                return words[words.length - 1];
            };

            const addresses = [data.data.address1, data.data.address2, data.data.address3].filter(
                Boolean,
            );

            setSelectedAddress(addresses[0] || "");

            setAddressList(
                [
                    addresses[0] ? extractLastWord(addresses[0]) : "",
                    addresses[1] ? extractLastWord(addresses[1]) : "",
                    addresses[2] ? extractLastWord(addresses[2]) : "",
                    "동네 바꾸기",
                ].filter((addr) => addr !== ""),
            );
        }
    }, [data, isSuccess]);

    const onChange = (value: string) => {
        if (value === "동네 바꾸기") {
            navigate("/location-select");
            return;
        }
        if (value === "지역 설정하기") {
            navigate("/login");
            return;
        }

        const addresses = [data?.data.address1, data?.data.address2, data?.data.address3].filter(
            Boolean,
        );

        const fullAddress = addresses.find((addr) => addr?.includes(value));
        if (fullAddress) {
            setSelectedAddress(fullAddress);
        }
    };

    const onClickSearch = () => {
        navigate("/search");
    };

    return (
        <HeaderBox>
            <Dropdown
                option={addressList ? addressList : ["논현동", "지역 설정하기"]}
                onChange={onChange}
            />
            <SearchButton onClick={onClickSearch}>
                <Search />
            </SearchButton>
        </HeaderBox>
    );
}
