import styled from "styled-components";
import Character from "@/assets/characterWhite.svg?react";
import { ModalBase } from "@/components/atoms/ModalBackground";

export const ModalBase2 = styled.div`
    position: fixed;
    width: 100%;
    max-width: 375px;
    height: 100vh;
    z-index: 11;
    bottom: 0;
`;

export const CharacterWrap = styled.div`
    position: absolute;
    bottom: 575px;
    right: 20px;
    z-index: 15;
`;

const ModalBaseWithCharacter = () => {
    return (
        <>
            <ModalBase $bottom={"0px"} opacity={0.4} id="ModalBase" />
            <ModalBase2 id="ModalBase2">
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <CharacterWrap>
                        <Character />
                    </CharacterWrap>
                </div>
            </ModalBase2>
        </>
    );
};

export default ModalBaseWithCharacter;
