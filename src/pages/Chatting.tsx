import styled from "styled-components";
import BackButtonIcon from "../assets/icons/back.svg?react";
import { useNavigate } from "react-router-dom";

export default function Chatting() {
    const navigate = useNavigate();

    return (
        <Header>
            <BackButtonIcon
                style={{ cursor: "pointer", marginLeft: 20 }}
                onClick={() => navigate("/chatting-list")}
            />
            <Title>지역 선택하기</Title>
        </Header>
    );
}
const Header = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    position: relative;
`;

const Title = styled.h1`
    text-align: center;
    flex-grow: 1;
    font-size: 20px;
    font-weight: 500;
    margin-right: 40px;
`;
