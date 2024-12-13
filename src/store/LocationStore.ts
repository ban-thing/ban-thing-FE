import { create } from "zustand";

interface LocationState {
    currentLocation: Record<string, string> | null;
    setCurrentLocation: (location: Record<string, string> | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
    currentLocation: null,
    setCurrentLocation: (location) => set({ currentLocation: location }),
}));

interface CoorState {
    currentCoor: { lat: number; lng: number };
    setCurrentCoor: (location: { lat: number; lng: number }) => void;
    resetCurrentCoor: () => void;
}

export const useCoorStore = create<CoorState>((set) => ({
    currentCoor: { lat: 35, lng: 27 },
    setCurrentCoor: (coor) => set({ currentCoor: coor }),
    resetCurrentCoor: () => set({ currentCoor: { lat: 35, lng: 27 } }),
}));

interface ItemListLocationState {
    currentLocation: string;
    setCurrentLocation: (location: string) => void;
}

export const useItemListLocationStore = create<ItemListLocationState>((set) => ({
    currentLocation: "",
    setCurrentLocation: (location) => set({ currentLocation: location }),
}));
