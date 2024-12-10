import styled from "styled-components";
import { PageTitle } from "@/components/atoms/PageTitle";
import ModalBaseWithCharacter from "@/components/molecules/ItemRegister/ModalBaseWithCharacter";
import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react";
import BottomButtonBar from "@/components/molecules/BottomButtonBar";
import { motion } from "motion/react";
import { slideUpMotion } from "@/utils/animation";

const ItemRegisterModalWrap = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    height: 611px;
    width: 100%;
    max-width: 375px;
    position: fixed;
    background-color: #fff;
    bottom: 0;
    z-index: 20;
    border-radius: 24px 24px 0 0;
    box-sizing: border-box;
`;

type ItemRegisterModalProps = {
    titleText?: string;
    children: ReactNode;
    buttonText?: string;
    onClickComplete?: MouseEventHandler<HTMLButtonElement>;
    buttonDisabled?: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
};

const ItemRegisterModalLayout = ({
    titleText = "모달 제목",
    children,
    buttonText = "완료",
    onClickComplete = () => {},
    buttonDisabled = false,
    setShowModal,
}: ItemRegisterModalProps) => {
    return (
        <>
            <ModalBaseWithCharacter setShowModal={setShowModal} {...slideUpMotion} />
            <ItemRegisterModalWrap {...slideUpMotion}>
                <PageTitle $margin="32px 0 40px">{titleText}</PageTitle>
                {children}
                <BottomButtonBar
                    className={buttonDisabled ? "disabled" : ""}
                    disabled={buttonDisabled}
                    buttonText={buttonText}
                    onClick={onClickComplete}
                />
            </ItemRegisterModalWrap>
        </>
    );
};

export default ItemRegisterModalLayout;
