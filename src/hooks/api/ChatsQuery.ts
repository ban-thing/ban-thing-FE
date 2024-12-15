import { useQuery, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { ChatList, ChatRoomCreate, ChatRoomView } from "@/types/Chat";
import ApiService from "@/utils/ApiService";

const apiService = new ApiService();

// 채팅 목록 조회 Query
export const useChatsListQuery = () => {
    return useQuery<ChatList[]>({
        queryKey: ["chats"],
        queryFn: async () => {
            const response = await apiService.get<{
                status: string;
                data: ChatList[];
                message: string | null;
            }>("chats", {});

            return response.data;
        },
        retry: false,
    });
};

// 채팅방 생성 Mutation
export const useCreateChatRoomMutation = () => {
    return useMutation({
        mutationFn: async (chatRoomData: ChatRoomCreate) => {
            return await apiService.post<{
                status: string;
                data: { chatRoomId: number };
                message: string;
            }>("chats", chatRoomData);
        },
    });
};

// 채팅방 메시지 조회 (무한 스크롤)
export const useChatRoomMessagesQuery = (roomId: number) => {
    return useInfiniteQuery<ChatRoomView>({
        queryKey: ["chats", roomId],
        queryFn: async ({ pageParam = 0 }) => {
            return await apiService.get<ChatRoomView>(`chats${roomId}`, {
                page: pageParam,
            });
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage.hasNext) return undefined;
            return lastPage.messages.length;
        },
        initialPageParam: 0,
    });
};

// 실시간 채팅 메시지 전송 Mutation
export const useSendMessageMutation = () => {
    return useMutation({
        mutationFn: async ({ roomId, message }: { roomId: number; message: string }) => {
            return await apiService.post<void>(`/api/chats/room/${roomId}/message`, { message });
        },
    });
};

// 채팅 대화내용, 아이템 정보 조회
export const useChatRoomDetailsQuery = (roomId: number) => {
    return useInfiniteQuery<ChatRoomView>({
        queryKey: ["chats", roomId],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await apiService.get<{
                status: string;
                data: ChatRoomView;
                message: string | null;
            }>(`chats/${roomId}`, { page: pageParam, size: 3 });

            return response.data;
        },
        getNextPageParam: (lastPage) => {
            return lastPage.hasNext ? lastPage.messages.length : undefined;
        },
        initialPageParam: 0,
    });
};
