import styled from "styled-components";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

export const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    message,
    confirmText = "확인",
    cancelText = "취소",
}: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <>
            <ModalBase />
            <ModalContainer>
                <ModalTextContainer>
                    <ModalTextBox>{message}</ModalTextBox>
                    <Line />
                    <ButtonContainer>
                        <ActionButton onClick={onClose}>{cancelText}</ActionButton>
                        <ButtonDivider />
                        <ActionButton $isConfirm onClick={onConfirm}>
                            {confirmText}
                        </ActionButton>
                    </ButtonContainer>
                </ModalTextContainer>
            </ModalContainer>
        </>
    );
};

const ModalBase = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 246px;
    height: 173px;
    border-radius: 24px;
    z-index: 20;
    box-sizing: border-box;
    overflow: hidden;
`;

const ModalTextContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

const ModalTextBox = styled.div`
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.4;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: var(--color-black-8);
    margin-top: auto;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: stretch;
    width: 100%;
    height: 47px;
    position: relative;
`;

const ButtonDivider = styled.div`
    width: 1px;
    height: 47px;
    position: absolute;
    bottom: 0;
    left: 50%;
    background-color: var(--color-black-8);
    transform: translateX(-50%);
`;

const ActionButton = styled.button<{ $isConfirm?: boolean }>`
    width: 50%;
    height: 47px;
    border: none;
    background: none;
    font-size: 14px;
    font-weight: 500;
    padding: 15px 2px;
    color: ${({ $isConfirm }) => ($isConfirm ? "var(--color-main-1)" : "var(--color-black-5)")};
    cursor: pointer;
`;
