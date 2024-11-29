import LoginContainer from "@/components/molecules/LoginContainer";
import LoginModal from "@/components/molecules/LoginModal";
import { useLoginModalStore } from "@/store/ModalStore";
import styled from "styled-components";

const LoginBox = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    background: linear-gradient(#9dbdff 44%, #d8e5ff 79%, #e6eeff 100%);
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
