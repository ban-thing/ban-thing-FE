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
    openDropdown: () => void;
    closeDropdown: () => void;
    toggleDropdown: () => void;
}

export const useDropdownModalStore = create<DropdownModalState>((set) => ({
    isDropdownOpen: false,
    openDropdown: () => set({ isDropdownOpen: true }),
    closeDropdown: () => set({ isDropdownOpen: false }),
    toggleDropdown: () => set((state) => ({ isDropdownOpen: !state.isDropdownOpen })),
}));