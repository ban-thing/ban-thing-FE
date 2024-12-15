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

interface HashtagFilterModalState {
    isHashtagFilterModalVisible: boolean;
    showHashtagFilterModal: () => void;
    hideHashtagFilterModal: () => void;
}

export const useHashtagFilterModalStore = create<HashtagFilterModalState>((set) => ({
    isHashtagFilterModalVisible: false,
    showHashtagFilterModal: () => set({ isHashtagFilterModalVisible: true }),
    hideHashtagFilterModal: () => set({ isHashtagFilterModalVisible: false }),
}));

interface FilterModalState {
    isFilterModalVisible: boolean;
    showFilterModal: () => void;
    hideFilterModal: () => void;
    priceRange: {
        minPrice: number;
        maxPrice: number;
    };
    setPriceRange: (minPrice: number, maxPrice: number) => void;
}

export const useFilterModalStore = create<FilterModalState>((set) => ({
    isFilterModalVisible: false,
    showFilterModal: () => set({ isFilterModalVisible: true }),
    hideFilterModal: () => set({ isFilterModalVisible: false }),
    priceRange: {
        minPrice: 0,
        maxPrice: 5000000,
    },
    setPriceRange: (minPrice, maxPrice) => set({ priceRange: { minPrice, maxPrice } }),
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
