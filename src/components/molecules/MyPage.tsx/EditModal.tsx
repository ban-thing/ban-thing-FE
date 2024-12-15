import { ModalBase } from "@/components/atoms/ModalBackground";
import { useFetchItemDelete, useFetchItemSold } from "@/hooks/api/ItemsQuery";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ModalBase2 = styled.div`
    position: fixed;
    width: 100%;
    max-width: 375px;
    height: 100vh;
    z-index: 11;
    bottom: 0;
`;

const StyledEditModal = styled.div<{ $inset: string; $height?: string }>`
    width: 152px;
    height: ${({ $height }) => ($height ? $height : "159px")};
    padding: 10px;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    z-index: 20;
    position: absolute;
    inset: ${({ $inset }) => $inset};
`;

const StyledEditButton = styled.button`
    font-size: 18px;
    color: var(--color-black-2);
    padding: 10px;
    text-align: left;
`;

type EditModalProps = {
    setTopPosition: (value: number | null) => void;
    topPosition: number;
    itemId: number;
    isSold?: boolean;
};

const EditModal = ({ setTopPosition, topPosition, itemId, isSold = false }: EditModalProps) => {
    const navigate = useNavigate();
    const { mutate: soldMutate } = useFetchItemSold();
    const { mutate: deleteMutate } = useFetchItemDelete();
    const modalBaseRef = useRef<HTMLDivElement | null>(null);
    const modalBaseRef2 = useRef<HTMLDivElement | null>(null);
    const onClickBase = (e: any) => {
        if (e.target === modalBaseRef.current || e.target === modalBaseRef2.current) {
            setTopPosition(null);
        }
    };
    const onClickEdit = () => {
        navigate(`/item-register?edit=${itemId}`);
    };
    const onClickSoldOut = () => {
        soldMutate(itemId);
        setTopPosition(null);
    };
    const onClickDelete = () => {
        deleteMutate(itemId);
        setTopPosition(null);
    };

    return (
        <>
            <ModalBase $inset="0" opacity={0.4} onClick={onClickBase} ref={modalBaseRef} />
            <ModalBase2 ref={modalBaseRef2} onClick={onClickBase}>
                <StyledEditModal
                    $inset={`${topPosition}px 25px auto auto`}
                    $height={isSold ? "108px" : ""}
                >
                    <StyledEditButton onClick={onClickEdit}>게시글 수정</StyledEditButton>
                    {!isSold && (
                        <StyledEditButton onClick={onClickSoldOut}>거래 완료</StyledEditButton>
                    )}
                    <StyledEditButton onClick={onClickDelete}>삭제</StyledEditButton>
                </StyledEditModal>
            </ModalBase2>
        </>
    );
};

export default EditModal;
