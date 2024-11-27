import styled from "styled-components";
import Search from "@/assets/icons/search.svg?react";
import Dropdown from "./DropDown";

const HeaderBox = styled.header`
    height: 50px;
    width: 100%;
    padding: 14px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
`;

export default function HomeHeader() {
    return (
        <HeaderBox>
            <Dropdown />
            <Search />
        </HeaderBox>
    );
}
