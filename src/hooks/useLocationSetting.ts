import { useState, useEffect } from "react";
import { Region } from "@/types/location";
import { useLocationData } from "./useLocationData";
import { useCoorStore, useAddressStore } from "@/store/LocationStore";

export const useLocationSetting = () => {
    const {
        currentAddress,
        setCurrentCity,
        setCurrentDistrict,
        setCurrentTowns,
        resetCurrentAddress,
    } = useAddressStore();
    const {
        cities,
        districts,
        towns,
        isLoading,
        error,
        setDistricts,
        setTowns,
        loadCities,
        loadDistricts,
        loadTowns,
    } = useLocationData();
    const { setCurrentCoor } = useCoorStore();
    const [selectedCity, setSelectedCity] = useState<Region | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<Region | null>(null);
    const [selectedTowns, setSelectedTowns] = useState<Region[]>([]);

    const handleCitySelect = (city: Region) => {
        setCurrentCity(city.name);
    };

    const handleDistrictSelect = (district: Region) => {
        setCurrentDistrict(district.name);
        if (district.id.endsWith("_all")) {
            setCurrentTowns([district.name]);
        }
    };

    const handleTownToggle = (town: Region) => {
        if (Array.isArray(currentAddress?.[2]) && town) {
            if (currentAddress?.[2].includes(town.name)) {
                return;
            }
            if (town.id.endsWith("_all")) {
                return setCurrentTowns([town.name]);
            }
            if (currentAddress?.[2].length < 3) {
                const filtered = currentAddress?.[2].filter((town) => !town.includes("전체"));
                return setCurrentTowns([...filtered, town.name]);
            }
            if (currentAddress?.[2].length === 3) {
                return;
            }
        }
        setCurrentTowns([town.name]);
    };

    const handleRemoveTown = (town: string) => {
        const filtered = currentAddress?.[2]?.filter((prevTown) => prevTown !== town);
        setCurrentTowns(filtered?.length === 0 ? [] : filtered || []);
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
        if (currentAddress?.[0]) {
            const cityId = cities.find((item) => item.name === currentAddress[0])?.id as string;
            setTowns([]);
            loadDistricts(cityId, currentAddress[0] as string);
            setSelectedCity({ id: cityId, name: currentAddress[0] });
        }
    }, [currentAddress?.[0], cities]);

    useEffect(() => {
        if (currentAddress?.[1]) {
            const districtsId = districts.find((item) => item.name === currentAddress[1])
                ?.id as string;
            setSelectedDistrict({ id: districtsId, name: currentAddress[1] });
            setSelectedTowns([]);
            if (!currentAddress[1].includes("전체")) {
                loadTowns(districtsId, currentAddress[1] as string);
            }
        }
    }, [currentAddress?.[1], districts]);

    useEffect(() => {
        if (currentAddress?.[2]) {
            const townsArray = currentAddress?.[2];
            const resultArray = townsArray.map((name) => {
                const id = towns.find((item) => item.name === name)?.id as string;
                return { id, name };
            });
            setSelectedTowns(resultArray);
        }
    }, [currentAddress?.[2], towns]);

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

    const resetData = () => {
        setDistricts([]);
        setTowns([]);
        setCurrentCity(null);
        setCurrentDistrict(null);
        setCurrentTowns([]);
        setSelectedCity(null);
        setSelectedDistrict(null);
        setCurrentTowns([]);
        resetCurrentAddress();
    };

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
        resetData,
    };
};
