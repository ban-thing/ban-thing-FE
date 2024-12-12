import { LayoutBox } from "@/components/atoms/LayoutBox";
import character from "@/assets/characterNotFound.png";
import styled from "styled-components";
import { Button } from "@/components/atoms/Button";
import { useNavigate } from "react-router-dom";

const NotFoundWrap = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-rows: 1fr 80px;
`;

const NotFoundTop = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    & img {
        width: 120px;
        height: 120px;
    }

    & span {
        color: var(--color-black-4);
        font-size: 12px;
        text-align: center;
    }
`;

const NotFoundDown = styled.div`
    display: flex;
    gap: 15px;
    padding: 0 20px 32px;
`;

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <LayoutBox>
            <NotFoundWrap>
                <NotFoundTop>
                    <img src={character} alt="캐릭터 이미지" />
                    <span>
                        찾을 수 없는 페이지 입니다.
                        <br /> 요청하신 페이지가 사라졌거나,
                        <br /> 잘못된 경로를 이용했어요.
                    </span>
                </NotFoundTop>
                <NotFoundDown>
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outlined"
                        size="small"
                        style={{
                            border: "1px solid var(--color-black-6)",
                            color: "var(--color-black-5)",
                        }}
                    >
                        이전으로
                    </Button>
                    <Button onClick={() => navigate("")} size="small">
                        반띵 홈
                    </Button>
                </NotFoundDown>
            </NotFoundWrap>
        </LayoutBox>
    );
};

export default NotFound;
