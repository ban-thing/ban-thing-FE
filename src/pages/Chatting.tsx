import styled from "styled-components";
import BackButtonIcon from "@/assets/icons/back.svg?react";
import { useNavigate, useParams } from "react-router-dom";
// import AlbumIcon from "@/assets/icons/album.svg?react";
import SendIcon from "@/assets/icons/send.svg?react";
import { useState } from "react";
import { useChatRoomDetailsQuery, useSendMessageMutation } from "@/hooks/api/ChatsQuery";
import ClipLoader from "react-spinners/ClipLoader";
import { setImgUrl } from "@/utils/SetImageUrl";

export default function Chatting() {
    const navigate = useNavigate();
    const { id: chatRoomId } = useParams();
    const [inputText, setInputText] = useState("");

    const { data, fetchNextPage, hasNextPage, isLoading } = useChatRoomDetailsQuery(
        Number(chatRoomId),
    );

    const sendMessageMutation = useSendMessageMutation();

    const handleSendMessage = async () => {
        if (inputText.trim() === "") return;

        try {
            await sendMessageMutation.mutateAsync({
                roomId: Number(chatRoomId),
                message: inputText,
            });
            setInputText("");
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    if (!data) {
        return (
            <LoaderWrap>
                <ClipLoader size={48} color="#d7d7d7" />
            </LoaderWrap>
        );
    }

    console.log(data, "데이터");

    const messages = data.pages.flatMap((page) => page.messages);

    return isLoading ? (
        <LoaderWrap>
            <ClipLoader size={48} color="#d7d7d7" />
        </LoaderWrap>
    ) : (
        <Container>
            <Header>
                <BackButtonIcon
                    style={{ cursor: "pointer", marginLeft: 20 }}
                    onClick={() => navigate("/chatting-list")}
                />
                <HeaderTitle>{data.pages[0].title}</HeaderTitle>
            </Header>

            <ProductInfo onClick={() => navigate(`/item-view/${data.pages[0].itemId}`)}>
                <ProductImage
                    src={
                        Array.isArray(data.pages[0].itemImage)
                            ? setImgUrl(
                                  data.pages[0].itemId,
                                  data.pages[0].itemImage[0]?.split(".")[0],
                                  data.pages[0].itemImage[0]?.split(".")[1],
                              )
                            : setImgUrl(
                                  data.pages[0].itemId,
                                  data.pages[0].itemImage?.split(".")[0],
                                  data.pages[0].itemImage?.split(".")[1],
                              ) || ""
                    }
                    alt={data.pages[0].title}
                />
                <ProductDetails>
                    <Title>{data.pages[0].title}</Title>
                    <Price>
                        {data.pages[0].price ? `${data.pages[0].price.toLocaleString()}원` : "나눔"}
                    </Price>
                </ProductDetails>
            </ProductInfo>

            <ChatContainer>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <DateDivider>2024년 12월 28일</DateDivider>
                </div>
                {messages.map((message, index) => (
                    <MessageBubble
                        key={index}
                        isMe={message.senderId === 1 /* 실제 사용자 ID로 대체 */}
                    >
                        {message.message}
                        <MessageTime isMe={message.senderId === 1}>
                            {new Date(message.time).toLocaleString()}
                        </MessageTime>
                    </MessageBubble>
                ))}
                {hasNextPage && <button onClick={() => fetchNextPage()}>Load more</button>}
            </ChatContainer>

            <Footer>
                {/* <ImageButton>
                    <AlbumIcon />
                </ImageButton> */}
                <InputContainer>
                    <ChatInput
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="내용을 입력해주세요"
                    />
                    <SendButton onClick={handleSendMessage}>
                        <SendIcon />
                    </SendButton>
                </InputContainer>
            </Footer>
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    min-height: 100vh;
    padding-top: calc(56px + 76px);
    padding-bottom: 60px;
`;

const Header = styled.div`
    width: 375px;
    height: 56px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    background: white;
    z-index: 10;
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
    padding: 0 20px;
    padding-bottom: 55px;
    display: flex;
    flex-direction: column;
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
    height: fit-content;
    max-width: 70%;
    padding: 10px 16px;
    border-radius: 24px;
    position: relative;
    background-color: ${(props) => (props.isMe ? "var(--color-main-1)" : "var(--color-black-8)")};
    color: ${(props) => (props.isMe ? "white" : "black")};
    align-self: ${(props) => (props.isMe ? "flex-end" : "flex-start")};
    margin-bottom: 16px;
    word-wrap: break-word;
    white-space: pre-wrap;
`;

const MessageTime = styled.span<{ isMe: boolean }>`
    font-size: 10px;
    color: var(--color-black-5);
    position: absolute;
    bottom: 0;
    ${(props) => (props.isMe ? "left: -48px;" : "right: -48px;")}
`;

const Footer = styled.div`
    width: 343px;
    height: 60px;
    padding: 16px 16px 36px 16px;
    display: flex;
    align-items: center;
    gap: 4px;
    position: fixed;
    bottom: 0;
    background: white;
    border-top: 1px solid #eee;
`;

// const ImageButton = styled.button`
//     width: 36px;
//     height: 36px;
//     border-radius: 50%;
//     color: var(--color-black-8);
//     background-color: var(--color-black-8);
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     justify-content: center;

//     svg path {
//         width: 24px;
//         height: 24px;
//         stroke: var(--color-black-5);
//     }
// `;

const InputContainer = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
`;

const ChatInput = styled.input`
    flex: 1;
    height: 24px;
    padding: 6px 38px 6px 16px;
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
    font-weight: 700;
    margin-right: 40px;
`;

const ProductInfo = styled.div`
    box-sizing: border-box;
    width: 375px;
    display: flex;
    align-items: center;
    padding: 8px 20px;
    gap: 12px;
    border-bottom: 1px solid #eee;
    background: white;
    cursor: pointer;
    position: fixed;
    top: 56px;
    z-index: 10;
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

const LoaderWrap = styled.div`
    width: 375px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
