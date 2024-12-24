import styled from "styled-components";
import BackButtonIcon from "@/assets/icons/back.svg?react";
import { useNavigate, useParams } from "react-router-dom";
import SendIcon from "@/assets/icons/send.svg?react";
import { useEffect, useState } from "react";
import { useChatRoomDetailsQuery } from "@/hooks/api/ChatsQuery";
import ClipLoader from "react-spinners/ClipLoader";
import { setImgUrl } from "@/utils/SetImageUrl";
import { useFetchMyProfile } from "@/hooks/api/UsersQuery";

export default function Chatting() {
    const navigate = useNavigate();
    const { data: myProfileData } = useFetchMyProfile();
    const { chatRoomId } = useParams();
    const [inputText, setInputText] = useState("");
    const [messagesList, setMessagesList] = useState<any[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const { data, fetchNextPage, hasNextPage, isLoading } = useChatRoomDetailsQuery(
        Number(chatRoomId),
    );

    // const sendMessageMutation = useSendMessageMutation();

    const handleSendMessage = async () => {
        if (inputText.trim() === "" || !socket) return;

        const now = new Date();

        const newMessage = {
            chatRoomId: Number(chatRoomId),
            senderId: myProfileData?.data.userId,
            message: inputText.trim(),
            time: now, // Date 객체 직접 사용
        };

        console.log(newMessage);
        try {
            socket.send(JSON.stringify(newMessage));
            setInputText("");
        } catch (error) {
            console.error("메시지 전송 실패:", error);
            alert("메시지 전송에 실패했습니다. 다시 시도해주세요.");
        }
    };

    useEffect(() => {
        const createWebSocket = () => {
            const ws = new WebSocket(`wss://api.banthing.net/ws/chat/${chatRoomId}`);

            ws.onopen = () => {
                console.log("웹소켓 연결 성공");
            };

            ws.onmessage = (event) => {
                try {
                    if (event.data === "WebSocket 연결 완료") {
                        return;
                    }

                    if (typeof event.data === "string" && event.data.includes("{")) {
                        const msg = JSON.parse(event.data);
                        setMessagesList((prev) => {
                            const isDuplicate = prev.some(
                                (prevMsg) =>
                                    prevMsg.time === msg.time &&
                                    prevMsg.message === msg.message &&
                                    prevMsg.senderId === msg.senderId,
                            );
                            if (isDuplicate) {
                                return prev;
                            }
                            setTimeout(() => {
                                const chatContainer = document.querySelector(".chat-container");
                                if (chatContainer) {
                                    chatContainer.scrollTop = chatContainer.scrollHeight;
                                }
                            }, 100);
                            return [...prev, msg];
                        });
                    }
                } catch (error) {
                    console.error("메시지 처리 중 에러:", error);
                }
            };

            ws.onerror = (error) => {
                console.error("웹소켓 에러:", error);
            };

            ws.onclose = () => {
                console.log("웹소켓 연결 종료");
                setTimeout(createWebSocket, 3000);
            };

            setSocket(ws);
        };

        createWebSocket();

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [chatRoomId]);

    useEffect(() => {
        console.log("메시지리스트:", messagesList);
    }, [messagesList]);

    useEffect(() => {
        const chatContainer = document.querySelector(".chat-container");
        if (!chatContainer) return;

        if (isInitialLoad || messagesList.length > 0) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
            setIsInitialLoad(false);
        }
    }, [messagesList, data, isInitialLoad]);

    useEffect(() => {
        const chatContainer = document.querySelector(".chat-container");
        if (!chatContainer) return;

        const handleScroll = () => {
            // const currentScrollHeight = chatContainer.scrollHeight;

            if (chatContainer.scrollTop === 0 && hasNextPage) {
                const currentScrollPosition = chatContainer.scrollHeight - chatContainer.scrollTop;
                fetchNextPage().then(() => {
                    setTimeout(() => {
                        const newScrollHeight = chatContainer.scrollHeight;
                        chatContainer.scrollTop = newScrollHeight - currentScrollPosition;
                    }, 100);
                });
            }
        };

        chatContainer.addEventListener("scroll", handleScroll);
        return () => chatContainer.removeEventListener("scroll", handleScroll);
    }, [fetchNextPage, hasNextPage]);

    if (!data) {
        return (
            <LoaderWrap>
                <ClipLoader size={48} color="#d7d7d7" />
            </LoaderWrap>
        );
    }

    const messages = data.pages.flatMap((page) => page.messages);

    // 날짜 포맷팅 함수 수정
    const formatDateDivider = (date: string) => {
        // UTC 시간을 KST로 변환
        const messageDate = new Date(date);
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
        const koreanDate = new Date(messageDate.getTime() + KR_TIME_DIFF);

        return `${koreanDate.getFullYear()}년 ${koreanDate.getMonth() + 1}월 ${koreanDate.getDate()}일`;
    };

    // 메시지를 날짜별로 그룹화하는 함수 수정
    const groupMessagesByDate = (messages: any[]) => {
        const groups: { [key: string]: any[] } = {};

        messages.forEach((message) => {
            // UTC 시간을 KST로 변환
            const date = new Date(message.time);
            const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
            const koreanDate = new Date(date.getTime() + KR_TIME_DIFF);
            const dateKey = koreanDate.toISOString().split("T")[0];

            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(message);
        });

        return groups;
    };

    // formatDate 함수 수정
    const formatDate = (dateString: string) => {
        // 서버 시간을 Date 객체로 변환
        const date = new Date(dateString);

        // UTC+9 시간 추가 (9시간을 밀리초로 변환)
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
        const koreanDate = new Date(date.getTime() + KR_TIME_DIFF);

        const hours = koreanDate.getHours();
        const minutes = koreanDate.getMinutes();

        // 12시간제로 변환
        const ampm = hours >= 12 ? "오후" : "오전";
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${ampm} ${formattedHours}:${formattedMinutes}`;
    };

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
                <HeaderTitle>
                    {myProfileData?.data.nickname === data.pages[0].seller
                        ? data.pages[0].buyer
                        : data.pages[0].seller}
                </HeaderTitle>
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

            <ChatContainer className="chat-container">
                {hasNextPage && (
                    <LoadingIndicator>스크롤하여 이전 메시지 불러오기</LoadingIndicator>
                )}
                {Object.entries(
                    groupMessagesByDate(
                        [...messages, ...messagesList].sort(
                            (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
                        ),
                    ),
                ).map(([date, messagesForDate]) => (
                    <div
                        key={date}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <DateDivider>{formatDateDivider(date)}</DateDivider>
                        </div>
                        {messagesForDate.map((message, index) => (
                            <MessageBubble
                                key={`${date}-${index}`}
                                $isMe={message.senderId === myProfileData?.data.userId}
                            >
                                {message.message}
                                <MessageTime
                                    $isMe={message.senderId === myProfileData?.data.userId}
                                >
                                    {formatDate(message.time)}
                                </MessageTime>
                            </MessageBubble>
                        ))}
                    </div>
                ))}
                {hasNextPage && (
                    <div style={{ textAlign: "center", padding: "10px" }}>
                        <button onClick={() => fetchNextPage()}>이전 메시지 더보기</button>
                    </div>
                )}
            </ChatContainer>

            <Footer>
                {/* <ImageButton>
                    <AlbumIcon />
                </ImageButton> */}
                <InputContainer>
                    <ChatInput
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const Header = styled.div`
    width: 375px;
    height: 56px;
    display: flex;
    align-items: center;
    position: sticky;
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
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #ddd;
        border-radius: 4px;
    }
`;

const DateDivider = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 12px;
    margin: 24px 0;
    width: fit-content;
    color: var(--color-main-1);
    background: rgba(198, 212, 255, 0.3);
    padding: 4px 8px;
    border-radius: 24px;
`;

const MessageBubble = styled.div<{ $isMe: boolean }>`
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
    max-width: 70%;
    padding: 10px 16px;
    border-radius: 24px;
    position: relative;
    background-color: ${(props) => (props.$isMe ? "var(--color-main-1)" : "var(--color-black-8)")};
    color: ${(props) => (props.$isMe ? "white" : "black")};
    align-self: ${(props) => (props.$isMe ? "flex-end" : "flex-start")};
    margin-bottom: 16px;
    word-wrap: break-word;
    white-space: pre-wrap;
`;

const MessageTime = styled.span<{ $isMe: boolean }>`
    font-size: 10px;
    color: var(--color-black-5);
    position: absolute;
    bottom: 0;
    ${(props) => (props.$isMe ? "left: -48px;" : "right: -48px;")}
`;

const Footer = styled.div`
    width: 343px;
    height: 60px;
    padding: 16px 16px 36px 16px;
    display: flex;
    align-items: center;
    gap: 4px;
    position: sticky;
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
    position: sticky;
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

const LoadingIndicator = styled.div`
    text-align: center;
    padding: 10px;
    color: var(--color-black-5);
    font-size: 14px;
`;
