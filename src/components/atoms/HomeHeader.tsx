import styled from "styled-components";
import Search from "@/assets/icons/search.svg?react";
import { Dropdown } from "./Dropdown";
import { useNavigate } from "react-router-dom";
import { useFetchMyProfile } from "@/hooks/api/UsersQuery";
import { useEffect, useState } from "react";

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
`;

const SearchButton = styled.button`
    padding: 0 5px;
`;

export default function HomeHeader() {
    const [addressList, setAddressList] = useState<string[]>();
    const { data, isSuccess } = useFetchMyProfile();
    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess && data) {
            setAddressList([
                data.data.address1,
                data.data.address2 || "",
                data.data.address3 || "",
                "동네 바꾸기",
            ]);
        }
    }, [data, isSuccess]);
    const onClickSearch = () => {
        navigate("/search");
    };
    const onChange = (value: string) => {
        if (value === "동네 바꾸기") navigate("/location-select");
        if (value === "지역 설정하기") navigate("/login");
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
