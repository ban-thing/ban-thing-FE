import styled from "styled-components";
import Search from "@/assets/icons/search.svg";

const HeaderBox = styled.header`
    height: 50px;
    width: 100%;
    padding: 14px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// TODO: 드롭다운 설치

export default function HomeHeader() {
    return (
        <HeaderBox>
            <div>연수동</div>
            <Search />
        </HeaderBox>
    );
}
