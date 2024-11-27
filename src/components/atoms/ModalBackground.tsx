import styled from "styled-components";

export const ModalBase = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #000;
    opacity: 0.6;
    z-index: 10;
`;

export const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 335px;
    height: 500px;
    border-radius: 24px;
    z-index: 20;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    column-gap: 23px;
    justify-content: space-between;
`;

export const ModalTextContainer = styled.div`
    width: 100%;
    height: 401px;
    background-color: white;
    padding: 24px;
    box-sizing: border-box;
`;

export const ModalCloseButton = styled.button`
    color: white;
    text-decoration: underline;
`;
