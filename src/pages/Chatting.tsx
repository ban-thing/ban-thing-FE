import styled from "styled-components";
import BackButtonIcon from "../assets/icons/back.svg?react";
import { useNavigate } from "react-router-dom";
import AlbumIcon from "../assets/icons/album.svg?react";
import SendIcon from "../assets/icons/send.svg?react";

export default function Chatting() {
    //TODO: 채팅 데이터 받아오기
    const navigate = useNavigate();

    return (
        <Container>
            <Header>
                <BackButtonIcon
                    style={{ cursor: "pointer", marginLeft: 20 }}
                    onClick={() => navigate("/chatting-list")}
                />
                <HeaderTitle>구름이네</HeaderTitle>
            </Header>

            <ProductInfo>
                <ProductImage src="/path-to-image.jpg" alt="고양이 장난감" />
                <ProductDetails>
                    <Title>고양이 장난감</Title>
                    <Price>8,000원</Price>
                </ProductDetails>
            </ProductInfo>

            <ChatContainer>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <DateDivider>2024년 12월 28일</DateDivider>
                </div>
                <MessageBubble isMe={false}>
                    안녕하세요! 구매원해요~!
                    <MessageTime>오후 8:18</MessageTime>
                </MessageBubble>
            </ChatContainer>

            <Footer>
                <ImageButton>
                    <AlbumIcon />
                </ImageButton>
                <InputContainer>
                    <ChatInput placeholder="내용을 입력해주세요" />
                    <SendButton>
                        <SendIcon />
                    </SendButton>
                </InputContainer>
            </Footer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const Header = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    position: relative;
`;

const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
`;

const Price = styled.span`
    font-size: 14px;
    color: #666;
`;

const ChatContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 0 20px;
    margin-top: 0;
    margin-bottom: 60px;
`;

const DateDivider = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 12px;
    margin-top: 16px;
    margin-bottom: 32px;
    width: fit-content;
    color: var(--color-main-1);
    background: rgba(198, 212, 255, 0.3);
    padding: 4px 8px;
    border-radius: 24px;
`;

const MessageBubble = styled.div<{ isMe: boolean }>`
    display: flex;
    align-items: center;
    width: fit-content;
    max-width: 70%;
    height: 20px;
    padding: 10px 16px;
    border-radius: 24px;
    position: relative;
    background-color: ${(props) => (props.isMe ? "#007AFF" : "#f1f1f1")};
    color: ${(props) => (props.isMe ? "white" : "black")};
    align-self: ${(props) => (props.isMe ? "flex-end" : "flex-start")};
`;

const MessageTime = styled.span`
    font-size: 10px;
    color: var(--color-black-5);
    position: absolute;
    bottom: 0;
    right: -50px;
`;

const Footer = styled.div`
    width: 375px;
    height: 60px;
    padding: 16px 16px 36px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    position: fixed;
    bottom: 0;
    background: white;
    border-top: 1px solid #eee;
`;

const ImageButton = styled.button`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: var(--color-black-8);
    background-color: var(--color-black-8);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    svg path {
        width: 24px;
        height: 24px;
        stroke: var(--color-black-5);
    }
`;

const InputContainer = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
`;

const ChatInput = styled.input`
    flex: 1;
    height: 24px;
    padding: 6px 16px;
    border-radius: 20px;
    border: none;
    background-color: var(--color-black-8);
    outline: none;
    font-size: 14px;

    &::placeholder {
        color: #999;
    }
`;

const SendButton = styled.button`
    position: absolute;
    right: 16px;
    width: 24px;
    height: 24px;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const HeaderTitle = styled.h1`
    text-align: center;
    flex-grow: 1;
    font-size: 20px;
    font-weight: 500;
    margin-right: 40px;
`;

const ProductInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 20px;
    gap: 12px;
    border-bottom: 1px solid #eee;
    background: white;
    cursor: pointer;
`;

const ProductImage = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 8px;
    object-fit: cover;
`;

const ProductDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;
