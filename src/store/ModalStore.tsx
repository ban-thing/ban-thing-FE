import { create } from "zustand";

interface LoginModalState {
    isLoginModalVisible: boolean;
    showLoginModal: () => void;
    hideLoginModal: () => void;
}

export const useLoginModalStore = create<LoginModalState>((set) => ({
    isLoginModalVisible: false,
    showLoginModal: () => set({ isLoginModalVisible: true }),
    hideLoginModal: () => set({ isLoginModalVisible: false }),
}));

interface DropdownModalState {
    isDropdownOpen: boolean;
    openCount: number;
    openDropdown: () => void;
    closeDropdown: () => void;
    plusCount: () => void;
}

export const useDropdownModalStore = create<DropdownModalState>((set) => ({
    isDropdownOpen: false,
    openCount: 0,
    openDropdown: () => set({ isDropdownOpen: true }),
    closeDropdown: () => set({ isDropdownOpen: false }),
    plusCount: () =>
        set((state) => ({
            openCount: state.openCount + 1,
        })),
}));
