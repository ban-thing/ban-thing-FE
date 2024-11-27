import { create } from "zustand";

interface LoginState {
    isLoginModalVisible: boolean;
    showLoginModal: () => void;
    hideLoginModal: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
    isLoginModalVisible: false,
    showLoginModal: () => set({ isLoginModalVisible: true }),
    hideLoginModal: () => set({ isLoginModalVisible: false }),
}));
