import styled from "styled-components";
import { ModalButton, UnderlineTextButton } from "@/components/atoms/Button";
import { ModalBase, ModalContainer, ModalTextContainer } from "@/components/atoms/ModalBackground";
import { useLoginModalStore } from "@/store/ModalStore";
import Logo from "@/assets/icons/logoBlue.svg?react";
import { ButtonHTMLAttributes, MouseEventHandler, useState } from "react";
import Check from "@/assets/icons/check1.svg?react";

type ModalTextBoxProps = {
    height: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
};

const ModalTextBox = styled.div<ModalTextBoxProps>`
    width: 100%;
    height: ${(props) => props.height};
    display: flex;
    column-gap: 14px;
    border-bottom: 1px solid var(--color-black-6);
    box-sizing: border-box;

    &:not(:first-child) {
        padding: 10px 0;
    }

    &:nth-child(2) {
        cursor: pointer;
    }
`;

const ModalApproveBox = styled.div`
    display: grid;
    grid-template-columns: 24px 1fr;
    column-gap: 14px;
    row-gap: 8px;
    width: 100%;
    margin-top: 10px;

    & > span {
        width: 24px;
        height: 24px;
    }
    & * {
        color: var(--color-black-5);
    }
`;

const LogoCircle = styled.div`
    width: 50px;
    height: 51px;
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
    display: grid;
    grid-template-rows: 24px 24px;
    gap: 7px;
`;

const ApproveAllTextBox = styled.div`
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

const RequiredApprove = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
    font-size: 12px;
`;

const ViewTerms = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
    font-size: 12px;
    color: var(--color-black-3);
    text-decoration: underline;
    background: none;
`;

export default function LoginModal() {
    const { hideLoginModal } = useLoginModalStore();
    const [approveList, setApproveList] = useState([false, false]);

    const onClickAllApprove = () => {
        setApproveList((prev) => [!prev[0], !prev[1]]);
    };

    const onClickApprove = (index: number) => {
        // if (approveList[index]) return;
        setApproveList((prev) => prev.map((item, i) => (i === index ? !item : item)));
    };

    return (
        <>
            <ModalBase />
            <ModalContainer>
                <div>
                    <ModalTextContainer>
                        <ModalTextBox height="64px">
                            <LogoCircle>
                                <Logo />
                            </LogoCircle>
                            <LogoTextBox>
                                <LogoTitle>반띵</LogoTitle>
                                <LogoText>펫용품 중고거래 서비스</LogoText>
                            </LogoTextBox>
                        </ModalTextBox>
                        <ModalTextBox height="113px" onClick={onClickAllApprove}>
                            <ApproveCheck>
                                {approveList[0] && approveList[1] && <Check />}
                            </ApproveCheck>
                            <ApproveAllTextBox>
                                <div>전체 동의하기</div>
                                <ApproveText>
                                    전체동의는 선택목적에 대한 동의를 포함하고 있으며, 선택목적에
                                    대한 동의를 거부해도 서비스 이용이 가능합니다.
                                </ApproveText>
                            </ApproveAllTextBox>
                        </ModalTextBox>
                        <ModalTextBox height="108px">
                            <ApproveCheck />
                            <ApproveText>
                                반띵 서비스 제공을 위해 회원번호와 함께 개인정보가 제공됩니다. 보다
                                자세한 개인정보 제공항목은 동의 내용에서 확인하실 수 있습니다. 해당
                                정보는 동의 철회 또는 서비스 탈퇴 시 지체없이 파기됩니다.
                            </ApproveText>
                        </ModalTextBox>
                        <ModalApproveBox>
                            <span>{approveList[0] && <Check />}</span>
                            <RequiredText>
                                <RequiredApprove onClick={() => onClickApprove(0)}>
                                    [필수] 카카오 개인정보 제3자 제공 동의
                                </RequiredApprove>
                                <ViewTerms>보기</ViewTerms>
                            </RequiredText>
                            <span>{approveList[1] && <Check />}</span>
                            <RequiredText>
                                <RequiredApprove onClick={() => onClickApprove(1)}>
                                    [필수] 카카오 개인정보 제3자 제공 동의
                                </RequiredApprove>
                                <ViewTerms>보기</ViewTerms>
                            </RequiredText>
                        </ModalApproveBox>
                    </ModalTextContainer>
                    <ModalButton $enable={approveList[0] && approveList[1]}>
                        동의하고 계속하기
                    </ModalButton>
                </div>
                <UnderlineTextButton onClick={hideLoginModal} color="white">
                    취소
                </UnderlineTextButton>
            </ModalContainer>
        </>
    );
}
