import LoginContainer from "@/components/molecules/LoginContainer";
import LoginModal from "@/components/molecules/LoginModal";
import { useLoginStore } from "@/store/LoginStore";
import styled from "styled-components";

const LoginBox = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
`;

const Login = () => {
    const { isLoginModalVisible } = useLoginStore();

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
