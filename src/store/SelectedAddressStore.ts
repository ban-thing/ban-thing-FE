import { create } from "zustand";

type SelectedAddressStore = {
    selectedAddress: string;
    setSelectedAddress: (address: string) => void;
};

export const useSelectedAddressStore = create<SelectedAddressStore>((set) => ({
    selectedAddress: "",
    setSelectedAddress: (address) => set({ selectedAddress: address }),
}));
