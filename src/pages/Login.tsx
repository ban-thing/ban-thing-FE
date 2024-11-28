import LoginContainer from "@/components/molecules/LoginContainer";
import LoginModal from "@/components/molecules/LoginModal";
import { useLoginModalStore } from "@/store/ModalStore";
import styled from "styled-components";

const LoginBox = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    background: linear-gradient(var(--color-main-2), var(--color-main-3), white);
`;

const Login = () => {
    const { isLoginModalVisible } = useLoginModalStore();

    return (
        <>
            <LoginBox>
                <LoginContainer />
                {isLoginModalVisible && <LoginModal />}
            </LoginBox>
        </>
    );
};

export default Login;
