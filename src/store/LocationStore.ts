import { create } from "zustand";

interface AddressState {
    currentAddress: [string | null, string | null, string[] | null] | null;
    setCurrentAddress: (address: [string, string, string[]] | null) => void;
    setCurrentCity: (value: string | null) => void;
    setCurrentDistrict: (value: string | null) => void;
    setCurrentTowns: (value: string[] | []) => void;
    resetCurrentAddress: () => void;
}

export const useAddressStore = create<AddressState>((set) => ({
    currentAddress: [null, null, []],
    setCurrentAddress: (address) => set({ currentAddress: address }),
    setCurrentCity: (value: string | null) =>
        set((state) => ({
            currentAddress: state.currentAddress ? [value, null, null] : null,
        })),
    setCurrentDistrict: (value: string | null) =>
        set((state) => ({
            currentAddress: state.currentAddress ? [state.currentAddress[0], value, null] : null,
        })),
    setCurrentTowns: (value: string[] | []) =>
        set((state) => ({
            currentAddress: state.currentAddress
                ? [state.currentAddress[0], state.currentAddress[1], value]
                : null,
        })),
    resetCurrentAddress: () => set({ currentAddress: [null, null, []] }),
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
