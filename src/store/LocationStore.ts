import { create } from "zustand";

interface LocationState {
    currentLocation: Record<string, string> | null;
    setCurrentLocation: (location: Record<string, string> | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
    currentLocation: null,
    setCurrentLocation: (location) => set({ currentLocation: location }),
}));

interface ItemListLocationState {
    currentLocation: string;
    setCurrentLocation: (location: string) => void;
}

export const useItemListLocationStore = create<ItemListLocationState>((set) => ({
    currentLocation: "",
    setCurrentLocation: (location) => set({ currentLocation: location }),
}));
