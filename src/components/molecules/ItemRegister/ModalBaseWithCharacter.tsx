import styled from "styled-components";
import Character from "@/assets/characterWhite.svg?react";
import { ModalBase } from "@/components/atoms/ModalBackground";
import { Dispatch, HTMLAttributes, SetStateAction, useRef } from "react";

export const ModalBase2 = styled.div<HTMLAttributes<HTMLDivElement>>`
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

type ModalBaseProps = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
};

const ModalBaseWithCharacter = ({ setShowModal }: ModalBaseProps) => {
    const modalBaseRef = useRef<HTMLDivElement | null>(null);
    const modalBaseRef2 = useRef<HTMLDivElement | null>(null);

    const onClickBase = (e: any) => {
        if (e.target === modalBaseRef.current || e.target === modalBaseRef2.current) {
            setShowModal(false);
        }
    };
    return (
        <>
            <ModalBase
                $bottom={"0px"}
                opacity={0.4}
                id="ModalBase"
                ref={modalBaseRef}
                onClick={onClickBase}
            />
            <ModalBase2 id="ModalBase2" onClick={onClickBase}>
                <div
                    ref={modalBaseRef2}
                    style={{ position: "relative", width: "100%", height: "100%" }}
                >
                    <CharacterWrap>
                        <Character />
                    </CharacterWrap>
                </div>
            </ModalBase2>
        </>
    );
};

export default ModalBaseWithCharacter;
