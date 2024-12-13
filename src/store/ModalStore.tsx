import { create } from "zustand";

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

interface FilterModalState {
    isFilterModalVisible: boolean;
    showFilterModal: () => void;
    hideFilterModal: () => void;
}

export const useFilterModalStore = create<FilterModalState>((set) => ({
    isFilterModalVisible: false,
    showFilterModal: () => set({ isFilterModalVisible: true }),
    hideFilterModal: () => set({ isFilterModalVisible: false }),
}));

interface EditModalState {
    isEditModalVisible: boolean;
    showEditModal: () => void;
    hideEditModal: () => void;
}

export const useEditModalStore = create<EditModalState>((set) => ({
    isEditModalVisible: false,
    showEditModal: () => set({ isEditModalVisible: true }),
    hideEditModal: () => set({ isEditModalVisible: false }),
}));
