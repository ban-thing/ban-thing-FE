import styled from "styled-components";
import { useMyLocationModalStore } from "@/store/ModalStore";
import { useNavigate } from "react-router-dom";

export default function MyLocationModal() {
    const { hideMyLocationModal } = useMyLocationModalStore();
    const navigate = useNavigate();

    const moveMyLocationSetting = () => {
        navigate("/my-location-setting");
        hideMyLocationModal();
    };

    return (
        <>
            <ModalBase />
            <ModalContainer>
                <ModalTextContainer>
                    <ModalTextBox>
                        'bantting.com'이(가) 사용자의
                        <br /> 현재 위치를 사용하려고 합니다.
                    </ModalTextBox>
                    <ModalTextBox2>
                        'Safari'가 현재 사용자의 정확한 위치에 대해
                        <br /> 접근 권한이 있기 때문에, 이 웹 사이트가
                        <br />
                        사용자의 정확한 위치를 사용합니다.
                    </ModalTextBox2>
                    <Line />
                    <ButtonContainer>
                        <ActionButton onClick={hideMyLocationModal}>허용 안 함</ActionButton>
                        <ButtonDivider />
                        <ActionButton onClick={moveMyLocationSetting}>허용</ActionButton>
                    </ButtonContainer>
                </ModalTextContainer>
            </ModalContainer>
        </>
    );
}

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
    width: 264px;
    height: 173px;
    border-radius: 24px;
    z-index: 20;
    box-sizing: border-box;
    overflow: hidden;
`;

const ModalTextContainer = styled.div`
    width: 100%;
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
    margin-top: 15px;
    margin-bottom: 3px;
`;

const ModalTextBox2 = styled.div`
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: var(--color-black-4);
    line-height: 1.4;
    margin-bottom: 10px;
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: var(--color-black-7);
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: stretch;
    width: 100%;
    height: 100%;
    position: relative;
`;

const ButtonDivider = styled.div`
    width: 1px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    background-color: var(--color-black-7);
    transform: translateX(-50%);
`;

const ActionButton = styled.button`
    width: 50%;
    border: none;
    background: none;
    font-size: 16px;
    font-weight: 500;
    padding: 15px 2px;
    color: #1a5ee4;
    cursor: pointer;
`;
