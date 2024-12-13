import { useState, useEffect } from "react";
import { Region } from "@/types/location";
import { useLocationData } from "./useLocationData";
import { useLocationStore } from "@/store/LocationStore";

export const useLocationSetting = () => {
    const {
        cities,
        districts,
        towns,
        isLoading,
        error,
        loadCities,
        loadDistricts,
        loadTowns,
        setDistricts,
        setTowns,
    } = useLocationData();

    const [selectedCity, setSelectedCity] = useState<Region | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<Region | null>(null);
    const [selectedTowns, setSelectedTowns] = useState<Region[]>([]);
    const { setCurrentLocation } = useLocationStore();

    const handleCitySelect = (city: Region) => {
        setSelectedCity(city);
    };

    const handleDistrictSelect = (district: Region) => {
        setSelectedDistrict(district);
        if (district.id.endsWith("_all")) {
            setSelectedTowns([district]);
        }
    };

    const handleTownToggle = (town: Region) => {
        setSelectedTowns((prev) => {
            if (town.id.endsWith("_all")) {
                return [town];
            }
            if (prev.some((t) => t.id.endsWith("_all"))) {
                return [town];
            }
            if (prev.find((t) => t.id === town.id)) {
                const filtered = prev.filter((t) => t.id !== town.id);
                return filtered.filter((t) => !t.id.endsWith("_all"));
            }
            if (prev.length < 3) {
                return [...prev, town];
            }
            return prev;
        });
    };

    const handleRemoveTown = (townId: string) => {
        setSelectedTowns((prev) => prev.filter((t) => t.id !== townId));
    };

    const onClickCurrent = (navigate: (path: string) => void) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCurrentLocation(location);
                    navigate("/my-location-setting");
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("위치 정보를 가져오는데 실패했습니다.");
                },
            );
        } else {
            alert("이 브라우저에서는 위치 정보를 사용할 수 없습니다.");
        }
    };

    useEffect(() => {
        loadCities();
    }, []);

    useEffect(() => {
        if (selectedCity) {
            loadDistricts(selectedCity.id, selectedCity.name);
            setSelectedDistrict(null);
            setSelectedTowns([]);
        } else {
            setDistricts([]);
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedDistrict && !selectedDistrict.id.endsWith("_all")) {
            loadTowns(selectedDistrict.id, selectedDistrict.name);
            setSelectedTowns([]);
        } else {
            setTowns([]);
        }
    }, [selectedDistrict]);

    return {
        cities,
        districts,
        towns,
        isLoading,
        error,
        selectedCity,
        selectedDistrict,
        selectedTowns,
        handleCitySelect,
        handleDistrictSelect,
        handleTownToggle,
        handleRemoveTown,
        onClickCurrent,
    };
};
