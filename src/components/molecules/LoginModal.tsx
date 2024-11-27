import styled from "styled-components";
import { ModalButton, ModalButtonProps } from "@/components/atoms/Button";
import {
    ModalBase,
    ModalCloseButton,
    ModalContainer,
    ModalTextContainer,
} from "@/components/atoms/ModalBackground";

type ModalTextBoxProps = {
    height: string;
};

const ModalTextBox = styled.div<ModalTextBoxProps>`
    width: 100%;
    height: ${(props) => props.height};
    display: flex;
    column-gap: 14px;
    border-bottom: 1px solid var(--color-black-6);
    box-sizing: border-box;

    &:last-child {
        padding-top: 10px;
        border-bottom: none;
    }

    &:not(:first-child):not(:last-child) {
        padding: 10px 0;
    }
`;

const LogoCircle = styled.div`
    width: 50px;
    height: 51px;
    background-color: #a2f1ff;
    border-radius: 50%;
`;

const LogoTextBox = styled.div`
    margin: 3.5px 0;
`;

const LogoTitle = styled.div`
    font-weight: bold;
    font-size: 18px;
`;

const LogoText = styled.div`
    font-size: 12px;
    color: var(--color-black-5);
    margin-top: 2px;
`;

const ApproveCheck = styled.div`
    min-width: 24px;
    width: 24px;
`;

const ApproveTextBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
`;

const ApproveText = styled.div`
    font-size: 12px;
    color: var(--color-black-5);
`;

const RequiredText = styled.div`
    font-size: 12px;
    color: var(--color-black-3);
    display: flex;
    justify-content: space-between;
    padding-right: 8px;
`;

const VewTerms = styled.button`
    font-size: 12px;
    color: var(--color-black-3);
    text-decoration: underline;
    background: none;
`;

type ModalProps = ModalButtonProps & {};

export default function LoginModal({ enable }: ModalProps) {
    return (
        <>
            <ModalBase />
            <ModalContainer>
                <div>
                    <ModalTextContainer>
                        <ModalTextBox height="64px">
                            <LogoCircle />
                            <LogoTextBox>
                                <LogoTitle>반띵</LogoTitle>
                                <LogoText>펫용품 중고거래 서비스</LogoText>
                            </LogoTextBox>
                        </ModalTextBox>
                        <ModalTextBox height="113px">
                            <ApproveCheck></ApproveCheck>
                            <ApproveTextBox>
                                <div>전체 동의하기</div>
                                <ApproveText>
                                    전체동의는 선택목적에 대한 동의를 포함하고 있으며, 선택목적에
                                    대한 동의를 거부해도 서비스 이용이 가능합니다.
                                </ApproveText>
                            </ApproveTextBox>
                        </ModalTextBox>
                        <ModalTextBox height="108px">
                            <ApproveCheck></ApproveCheck>
                            <ApproveText>
                                반띵 서비스 제공을 위해 회원번호와 함께 개인정보가 제공됩니다. 보다
                                자세한 개인정보 제공항목은 동의 내용에서 확인하실 수 있습니다. 해당
                                정보는 동의 철회 또는 서비스 탈퇴 시 지체없이 파기됩니다.
                            </ApproveText>
                        </ModalTextBox>
                        <ModalTextBox height="65px">
                            <ApproveCheck></ApproveCheck>
                            <ApproveTextBox>
                                <RequiredText>
                                    <div>[필수] 카카오 개인정보 제3자 제공 동의</div>
                                    <VewTerms>보기</VewTerms>
                                </RequiredText>
                                <RequiredText>
                                    <div>[필수] 카카오 개인정보 제3자 제공 동의</div>
                                    <VewTerms>보기</VewTerms>
                                </RequiredText>
                            </ApproveTextBox>
                        </ModalTextBox>
                    </ModalTextContainer>
                    <ModalButton enable={enable}>버튼</ModalButton>
                </div>
                <ModalCloseButton>취소</ModalCloseButton>
            </ModalContainer>
        </>
    );
}
