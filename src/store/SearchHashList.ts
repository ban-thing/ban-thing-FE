import { create } from "zustand";

interface SearchHashList {
    searchHashList: string[];
    setSearchHashList: (list: string[]) => void;
    resetSearchHashList: () => void;
    deleteItemAtIndex: (index: number) => void;
}

export const useSearchHashListStore = create<SearchHashList>((set) => ({
    searchHashList: [""],
    setSearchHashList: (list: string[]) => set({ searchHashList: list }),
    resetSearchHashList: () => set({ searchHashList: [""] }),
    deleteItemAtIndex: (index: number) =>
        set((state) => ({
            searchHashList: state.searchHashList.filter((_, i) => i !== index),
        })),
}));
