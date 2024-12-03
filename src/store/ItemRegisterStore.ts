import { create } from "zustand";

interface ItemRegisterHashList {
    itemRegisterHashList: string[];
    setItemRegisterHashList: (list: string[]) => void;
    resetItemRegisterHashList: () => void;
    deleteItemAtIndex: (index: number) => void;
}

export const useItemRegisterHashListStore = create<ItemRegisterHashList>((set) => ({
    itemRegisterHashList: [""],
    setItemRegisterHashList: (list: string[]) => set({ itemRegisterHashList: list }),
    resetItemRegisterHashList: () => set({ itemRegisterHashList: [""] }),
    deleteItemAtIndex: (index: number) =>
        set((state) => ({
            itemRegisterHashList: state.itemRegisterHashList.filter((_, i) => i !== index),
        })),
}));

interface ItemRegisterAddress {
    itemRegisterAddress: string;
    itemRegisterDirectLocation: string;
    setItemRegisterAddress: (arg: string) => void;
    setItemRegisterDirectLocation: (arg: string) => void;
}

export const useItemRegisterAddressStore = create<ItemRegisterAddress>((set) => ({
    itemRegisterAddress: "",
    itemRegisterDirectLocation: "",
    setItemRegisterAddress: (arg: string) => set({ itemRegisterAddress: arg }),
    setItemRegisterDirectLocation: (arg: string) => set({ itemRegisterDirectLocation: arg }),
}));
