import { ModalBase } from "@/components/atoms/ModalBackground";
import { useRef } from "react";
import styled from "styled-components";

const ModalBase2 = styled.div`
    position: fixed;
    width: 100%;
    max-width: 375px;
    height: 100vh;
    z-index: 11;
    bottom: 0;
`;

const StyledEditModal = styled.div<{ $inset: string }>`
    width: 159px;
    height: 108px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    background-color: #fff;
    z-index: 20;
    position: absolute;
    inset: ${({ $inset }) => $inset};
`;

const StyledEditButton = styled.button`
    font-size: 18px;
    color: var(--color-black-2);
    padding: 5px 0;
`;

type EditModalProps = {
    setTopPosition: (value: number | null) => void;
    topPosition: number;
    itemId: number;
};

const EditModal = ({ setTopPosition, topPosition, itemId }: EditModalProps) => {
    const modalBaseRef = useRef<HTMLDivElement | null>(null);
    const modalBaseRef2 = useRef<HTMLDivElement | null>(null);
    const onClickBase = (e: any) => {
        if (e.target === modalBaseRef.current || e.target === modalBaseRef2.current) {
            setTopPosition(null);
        }
    };
    const onClickEdit = () => {
        console.log("수정", itemId);
    };
    const onClickSoldOut = () => {
        console.log("판매완료", itemId);
    };
    const onClickDelete = () => {
        console.log("삭제", itemId);
    };

    return (
        <>
            <ModalBase $inset="0" opacity={0.4} onClick={onClickBase} ref={modalBaseRef} />
            <ModalBase2 ref={modalBaseRef2} onClick={onClickBase}>
                <StyledEditModal $inset={`${topPosition}px 40px auto auto`}>
                    <StyledEditButton onClick={onClickEdit}>게시글 수정</StyledEditButton>
                    <StyledEditButton onClick={onClickSoldOut}>판매 완료</StyledEditButton>
                    <StyledEditButton onClick={onClickDelete}>삭제</StyledEditButton>
                </StyledEditModal>
            </ModalBase2>
        </>
    );
};

export default EditModal;
