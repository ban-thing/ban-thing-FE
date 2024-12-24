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
        setSelectedDistrict(district);

        if (district.id.endsWith("_all")) {
            // 전체가 선택된 경우
            const allSelection = {
                id: district.id,
                name: `${selectedCity?.name} 전체`,
            };
            setSelectedTowns([allSelection]);
            setCurrentTowns([allSelection.name]);
            // districts 배열의 모든 항목에 대해 시각적 선택 표시
            setDistricts(
                districts.map((d) => ({
                    ...d,
                    selected: true,
                })),
            );
        } else {
            // 특정 구가 선택된 경우
            loadTowns(district.id, district.name);
            setSelectedTowns([]);
        }
    };

    const handleTownToggle = (town: Region) => {
        if (!town?.id) return;

        if (Array.isArray(currentAddress?.[2])) {
            // 이미 선택된 지역인 경우 제거
            if (currentAddress[2].includes(town.name)) {
                handleRemoveTown(town.name);
                return;
            }

            const isAllSelection = town.id?.endsWith?.("_all");

            if (isAllSelection) {
                // 이미 다른 "전체" 선택이 있다면 그것을 제거
                const existingTowns = currentAddress[2].filter((t) => !t.includes("전체"));
                setCurrentTowns([...existingTowns, town.name]);
                setSelectedTowns([...selectedTowns.filter((t) => !t.id.endsWith("_all")), town]);
            } else if (currentAddress[2].length < 3) {
                // "전체" 선택을 제외한 나머지 선택 처리
                const filtered = currentAddress[2].filter((t) => !t.includes("전체"));
                setCurrentTowns([...filtered, town.name]);
                setSelectedTowns([...selectedTowns.filter((t) => !t.id.endsWith("_all")), town]);
            }
        } else {
            setCurrentTowns([town.name]);
            setSelectedTowns([town]);
        }
    };

    const handleRemoveTown = (town: string) => {
        // 전체 선택이 제거되는 경우
        if (town.includes("전체")) {
            // 선택된 시/군/구 해제
            setSelectedDistrict(null);
            // 동/읍/면 목록 초기화
            setTowns([]);
            // 선택된 동/읍/면 모두 해제
            setSelectedTowns([]);
            // currentAddress에서 해당 지역 관련 모든 선택 제거
            setCurrentTowns([]);
            return;
        }

        // 일반 동/읍/면 제거의 경우
        const filtered = currentAddress?.[2]?.filter((prevTown) => prevTown !== town);
        setCurrentTowns(filtered?.length === 0 ? [] : filtered || []);
        setSelectedTowns(selectedTowns.filter((t) => t.name !== town));
    };

    const onClickCurrent = (navigate?: (path: string) => void) => {
        if (window.location.protocol !== "https:" && window.location.hostname !== "localhost") {
            alert("위치 정보는 보안 연결(HTTPS)에서만 사용할 수 있습니다.");
            return;
        }

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
                    let errorMessage = "위치 정보를 가져오는데 실패했습니다.";
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = "위치 정보 접근 권한이 거부되었습니다.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = "위치 정보를 사용할 수 없습니다.";
                            break;
                        case error.TIMEOUT:
                            errorMessage = "위치 정보 요청이 시간 초과되었습니다.";
                            break;
                    }
                    alert(errorMessage);
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
            loadDistricts(cityId, currentAddress[0] as string);
            setSelectedCity({ id: cityId, name: currentAddress[0] });
        }
    }, [currentAddress?.[0], cities]);

    useEffect(() => {
        if (currentAddress?.[1]) {
            const districtsId = districts.find((item) => item.name === currentAddress[1])
                ?.id as string;
            setSelectedDistrict({ id: districtsId, name: currentAddress[1] });
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
