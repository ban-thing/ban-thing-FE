import { create } from "zustand";

interface LocationState {
    currentLocation: { lat: number; lng: number } | null;
    setCurrentLocation: (location: { lat: number; lng: number } | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
    currentLocation: null,
    setCurrentLocation: (location) => set({ currentLocation: location }),
}));
