import styled from "styled-components";
import Search from "@/assets/icons/search.svg?react";
import { Dropdown } from "./Dropdown";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    const onClickSearch = () => {
        navigate("/search");
    };

    return (
        <HeaderBox>
            <Dropdown option={["연수동", "연수1동", "연수2동", "동네 바꾸기"]} />
            <SearchButton onClick={onClickSearch}>
                <Search />
            </SearchButton>
        </HeaderBox>
    );
}
