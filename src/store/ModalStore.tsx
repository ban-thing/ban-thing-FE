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

interface MyLocationModalState {
    isMyLocationModalVisible: boolean;
    showMyLocationModal: () => void;
    hideMyLocationModal: () => void;
}

export const useMyLocationModalStore = create<MyLocationModalState>((set) => ({
    isMyLocationModalVisible: false,
    showMyLocationModal: () => set({ isMyLocationModalVisible: true }),
    hideMyLocationModal: () => set({ isMyLocationModalVisible: false }),
}));
