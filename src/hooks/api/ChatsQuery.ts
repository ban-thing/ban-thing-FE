import { useQuery, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { ChatList, ChatRoomCreate, ChatRoomView } from "@/types/Chat";
import ApiService from "@/utils/ApiService";

const apiService = new ApiService();

// 채팅 목록 조회 Query
export const useChatsListQuery = () => {
    return useQuery<ChatList[]>({
        queryKey: ["chats"],
        queryFn: async () => {
            return await apiService.get<ChatList[]>(`chats`, {});
        },
    });
};

// 채팅방 생성 Mutation
export const useCreateChatRoomMutation = () => {
    return useMutation({
        mutationFn: async (chatRoomData: ChatRoomCreate) => {
            return await apiService.post<number>("chats", chatRoomData);
        },
        // onSuccess: () => {
        //     navigate("/chatting/")
        // }
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
