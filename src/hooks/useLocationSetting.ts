import { useState, useEffect } from "react";
import { Region } from "@/types/location";
import { useLocationData } from "./useLocationData";
import { useCoorStore, useLocationStore } from "@/store/LocationStore";

export const useLocationSetting = () => {
    const { currentLocation } = useLocationStore();
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
    const { setCurrentCoor } = useCoorStore();
    const [selectedCity, setSelectedCity] = useState<Region | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<Region | null>(null);
    const [selectedTowns, setSelectedTowns] = useState<Region[]>([]);

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

    const onClickCurrent = (navigate?: (path: string) => void) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCurrentCoor(location);
                    if (navigate) navigate("/my-location-setting");
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
        if (selectedDistrict) {
            loadTowns(selectedDistrict.id, selectedDistrict.name);
        }
        if (selectedDistrict && !selectedDistrict.id.endsWith("_all")) {
            loadTowns(selectedDistrict.id, selectedDistrict.name);
            setSelectedTowns([]);
        } else {
            setTowns([]);
        }
    }, [selectedDistrict]);

    // 좌표값으로 주소 얻기
    const getAddress = (lat: number, lng: number): Promise<any> => {
        return new Promise((resolve, reject) => {
            let geocoder = new kakao.maps.services.Geocoder();
            let coord = new kakao.maps.LatLng(lat, lng);

            geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const addressData = result[0].address;
                    resolve(addressData);
                } else {
                    reject(`주소를 구하지 못했어요. ${status}`);
                }
            });
        });
    };

    // 좌표값으로 주소 불러왔을 때 주소 시/구/동 자동 선택
    useEffect(() => {
        if (currentLocation && cities.length > 0) {
            // 시 선택
            const city = cities.find((item) => item.name === currentLocation.region_1depth_name);
            if (city) {
                setSelectedCity(city);
            }

            // 구 선택 (cities가 로드된 후에)
            if (districts.length > 0) {
                const district = districts.find(
                    (item) => item.name === currentLocation.region_2depth_name,
                );
                if (district) {
                    setSelectedDistrict(district);
                }
            }

            // 동 선택
            if (towns.length > 0) {
                const town = towns.find((item) => item.name === currentLocation.region_3depth_name);
                if (town) {
                    setSelectedTowns([town]);
                }
            }
        }
    }, [currentLocation, cities, districts, towns]);

    return {
        cities,
        districts,
        towns,
        isLoading,
        error,
        selectedCity,
        selectedDistrict,
        selectedTowns,
        setSelectedCity,
        setSelectedDistrict,
        setSelectedTowns,
        handleCitySelect,
        handleDistrictSelect,
        handleTownToggle,
        handleRemoveTown,
        onClickCurrent,
        getAddress,
    };
};
