import styled from "styled-components";

export const ModalBase = styled.div`
    position: fixed;
    width: 100%;
    max-width: 375px;
    height: 100vh;
    background-color: #000;
    opacity: 0.8;
    z-index: 20;
`;

export const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 335px;
    height: 500px;
    border-radius: 24px;
    z-index: 30;
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
