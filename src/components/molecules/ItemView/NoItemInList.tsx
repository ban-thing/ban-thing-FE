import Character from "@/assets/characterTranslucent.svg?react";
import styled from "styled-components";

const NoItemWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;

const CharacterWrap = styled.div`
    width: 105px;
`;

const NoItemText = styled.div`
    color: #adadad;
    font-size: 14px;
`;

const NoItemInList = () => {
    return (
        <NoItemWrap>
            <CharacterWrap>
                <Character />
            </CharacterWrap>
            <NoItemText>아직 등록된 상품이 없어요.</NoItemText>
        </NoItemWrap>
    );
};

export default NoItemInList;
