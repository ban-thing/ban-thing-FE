import styled from "styled-components";
import BackButtonIcon from "@/assets/icons/back.svg?react";
import { useNavigate, useParams } from "react-router-dom";
import SendIcon from "@/assets/icons/send.svg?react";
import { useEffect, useState, useRef } from "react";
import { useChatRoomDetailsQuery, useSendMessageMutation } from "@/hooks/api/ChatsQuery";
import ClipLoader from "react-spinners/ClipLoader";
import { imageUrl } from "@/utils/SetImageUrl";
import { useFetchMyProfile } from "@/hooks/api/UsersQuery";
import { useQueryClient } from "@tanstack/react-query";

// Message 타입 정의 추가
type Message = {
    chatRoomId: number;
    senderId: number;
    message: string;
    time: string;
};

export default function Chatting() {
    const navigate = useNavigate();
    const { data: myProfileData } = useFetchMyProfile();
    const { chatRoomId } = useParams();
    const [inputText, setInputText] = useState("");
    const [messagesList, setMessagesList] = useState<Message[]>([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const socketRef = useRef<WebSocket | null>(null);
    const queryClient = useQueryClient();

    const { data, fetchNextPage, hasNextPage, isLoading, refetch } = useChatRoomDetailsQuery(
        Number(chatRoomId),
    );

    const sendMessageMutation = useSendMessageMutation();

    // API에서 가져온 메시지 설정
    useEffect(() => {
        if (data && data.pages.length > 0) {
            const apiMessages = data.pages.flatMap((page) => 
                page.messages.map(msg => ({
                    chatRoomId: Number(chatRoomId),
                    senderId: msg.senderId,
                    message: msg.message,
                    time: typeof msg.time === 'string' ? msg.time : new Date(msg.time).toISOString()
                }))
            );
            
            // API 메시지로 목록 갱신
            setMessagesList(apiMessages);
            console.log(`API에서 ${apiMessages.length}개 메시지 로드됨`);
        }
    }, [data, chatRoomId]);

    const handleSendMessage = async () => {
        if (inputText.trim() === "" || !socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;

        const newMessage: Message = {
            chatRoomId: Number(chatRoomId),
            senderId: myProfileData?.data.userId || 0,
            message: inputText.trim(),
            time: new Date().toISOString(),
        };

        try {
            // 웹소켓으로 메시지 전송
            socketRef.current.send(JSON.stringify(newMessage));
            
            // 서버에 메시지 저장 요청
            await sendMessageMutation.mutateAsync({
                roomId: Number(chatRoomId),
                message: inputText.trim()
            });
            
            // UI에 임시로 메시지 추가 (실제 메시지는 웹소켓을 통해 다시 받거나 다음 API 요청 시 받음)
            setMessagesList(prev => [...prev, newMessage]);
            
            // 입력창 초기화
            setInputText("");
            
            // 채팅 목록 캐시 무효화 (나중에 다시 불러오기 위해)
            queryClient.invalidateQueries({ queryKey: ["chats", Number(chatRoomId)] });
            
            // 스크롤 아래로 이동
            setTimeout(() => {
                const chatContainer = document.querySelector(".chat-container");
                if (chatContainer) {
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }
            }, 100);
        } catch (error) {
            console.error("메시지 전송 실패:", error);
            alert("메시지 전송에 실패했습니다. 다시 시도해주세요.");
        }
    };

    useEffect(() => {
        // 이전 소켓 연결 정리
        if (socketRef.current) {
            socketRef.current.close();
        }
        
        const createWebSocket = () => {
            // 이미 연결 중인 경우 중복 연결 방지
            if (socketRef.current && socketRef.current.readyState !== WebSocket.CLOSED) {
                return;
            }
            
            console.log(`웹소켓 연결 시도: wss://api.banthing.net/ws/chat/${chatRoomId}`);
            
            const ws = new WebSocket(`wss://api.banthing.net/ws/chat/${chatRoomId}`);
            socketRef.current = ws;

            ws.onopen = () => {
                console.log("웹소켓 연결 성공");
                
                // 웹소켓 연결 후 최신 메시지 불러오기
                refetch();
            };

            ws.onmessage = (event) => {
                try {
                    console.log("웹소켓 메시지 수신:", event.data);
                    
                    if (event.data === "WebSocket 연결 완료") {
                        console.log("웹소켓 연결 확인 완료");
                        return;
                    }

                    if (typeof event.data === "string" && event.data.includes("{")) {
                        const msg = JSON.parse(event.data) as Message;
                        
                        // 본인이 보낸 메시지면 처리 방식 변경
                        // 메시지 수신 후 API 데이터를 다시 불러옴으로써 서버에 저장된 메시지를 동기화
                        if (msg.senderId === myProfileData?.data.userId) {
                            // 캐시 무효화
                            queryClient.invalidateQueries({ queryKey: ["chats", Number(chatRoomId)] });
                            return;
                        }
                        
                        setMessagesList((prev) => {
                            // 중복 체크
                            const msgKey = `${msg.senderId}-${msg.message}-${msg.time}`;
                            const isDuplicate = prev.some(
                                (prevMsg) => 
                                    `${prevMsg.senderId}-${prevMsg.message}-${prevMsg.time}` === msgKey
                            );
                            
                            if (isDuplicate) {
                                return prev;
                            }
                            
                            // 메시지 수신 후 API 데이터도 함께 갱신
                            setTimeout(() => {
                                queryClient.invalidateQueries({ queryKey: ["chats", Number(chatRoomId)] });
                            }, 500);
                            
                            // 스크롤 아래로 이동
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

            ws.onclose = (event) => {
                console.log(`웹소켓 연결 종료: ${event.code}, ${event.reason || '이유 없음'}`);
                
                // 비정상 종료인 경우 재연결 시도
                if (event.code !== 1000) {
                    console.log("웹소켓 재연결 시도...");
                    setTimeout(createWebSocket, 3000);
                }
                
                // 소켓 상태 업데이트
                if (socketRef.current === ws) {
                    socketRef.current = null;
                }
            };
        };

        createWebSocket();

        return () => {
            if (socketRef.current) {
                // 정상 종료 코드(1000)로 연결 종료
                socketRef.current.close(1000, "컴포넌트 언마운트");
                socketRef.current = null;
            }
        };
    }, [chatRoomId, myProfileData?.data.userId, queryClient, refetch]);

    useEffect(() => {
        console.log("메시지리스트 업데이트:", messagesList.length);
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

    // 날짜 포맷팅 함수 수정
    const formatDateDivider = (date: string) => {
        const messageDate = new Date(date);
        return `${messageDate.getFullYear()}년 ${messageDate.getMonth() + 1}월 ${messageDate.getDate()}일`;
    };

    // 메시지를 날짜별로 그룹화하는 함수 수정
    const groupMessagesByDate = (messages: Message[]) => {
        const groups: { [key: string]: Message[] } = {};

        messages.forEach((message) => {
            const date = new Date(message.time);
            const dateKey = date.toISOString().split("T")[0];

            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(message);
        });

        return groups;
    };

    // formatDate 함수 수정
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();

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
                        data.pages[0].itemImage
                            ? `${imageUrl}/${data.pages[0].itemImage}`
                            : ""
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
                {/* {hasNextPage && (
                    <LoadingIndicator>스크롤하여 이전 메시지 불러오기</LoadingIndicator>
                )} */}
                {Object.entries(
                    groupMessagesByDate(
                        [...messagesList].sort(
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
                {/* {hasNextPage && (
                    <div style={{ textAlign: "center", padding: "10px" }}>
                        <button onClick={() => fetchNextPage()}>이전 메시지 더보기</button>
                    </div>
                )} */}
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

// const LoadingIndicator = styled.div`
//     text-align: center;
//     padding: 10px;
//     color: var(--color-black-5);
//     font-size: 14px;
// `;
