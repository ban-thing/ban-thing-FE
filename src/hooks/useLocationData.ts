import { useState } from "react";
import { AdmVO, ApiResponse, Region } from "@/types/location";
// import * as DistrictListData from "@/lib/DistrictListData";
// import * as TownListData from "@/lib/TownListData";
// import { CityList } from "@/lib/CityListData";
const isLocal = window.location.href.includes("localhost");

const BASE_URL = isLocal ? "/api" : "http://api.vworld.kr/ned/data";
// const API_KEY = "15EB6A87-98E6-333C-BF19-30B0EEA78330";
const API_KEY = isLocal
    ? "DF267C57-FC4C-337B-BADF-F0A952C4F4B3" // Local API key
    : "15EB6A87-98E6-333C-BF19-30B0EEA78330"; // Server API key
const DOMAIN = isLocal ? "http://localhost:3000" : "https://211.188.62.82:3000";

// interface LocationData {
//     admCode: string;
//     admCodeNm: string;
//     lowestAdmCodeNm: string;
// }

// interface DistrictListType {
//     [key: string]: LocationData[];
// }

// interface TownListType {
//     [key: string]: LocationData[];
// }

export const useLocationData = () => {
    const [cities, setCities] = useState<Region[]>([]);
    const [districts, setDistricts] = useState<Region[]>([]);
    const [towns, setTowns] = useState<Region[]>([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 데이터 로드 코드

    // 시/도 목록 로드
    // const loadCities = async () => {
    //     try {
    //         setIsInitialLoading(true);
    //         const cityList = CityList.map((city) => ({
    //             id: city.admCode,
    //             name:
    //                 city.lowestAdmCodeNm.includes("충청") ||
    //                 city.lowestAdmCodeNm.includes("경상") ||
    //                 city.lowestAdmCodeNm.includes("전라")
    //                     ? `${city.lowestAdmCodeNm[0]}${city.lowestAdmCodeNm[2]}`
    //                     : city.lowestAdmCodeNm.replace(
    //                           /특별시|광역시|특별자치시|도|특별자치도/g,
    //                           "",
    //                       ),
    //         }));
    //         setCities(cityList);
    //     } catch (err) {
    //         setError(err as string);
    //     } finally {
    //         setIsInitialLoading(false);
    //     }
    // };
    // // 구/군 목록 로드
    // const loadDistricts = async (cityCode: string, cityName: string) => {
    //     try {
    //         const districtKey = `DistrictList_${cityCode}`;
    //         const districtList = (DistrictListData as DistrictListType)[districtKey] || [];

    //         const districts = districtList.map((item: LocationData) => ({
    //             id: item.admCode,
    //             name: item.lowestAdmCodeNm,
    //         }));

    //         setDistricts([{ id: `${cityCode}_all`, name: `${cityName} 전체` }, ...districts]);
    //     } catch (err) {
    //         setError(err as string);
    //     }
    // };

    // // 동/읍/면 목록 로드
    // const loadTowns = async (districtCode: string, districtName: string) => {
    //     try {
    //         const townKey = `Towns_${districtCode}`;
    //         const townList = (TownListData as TownListType)[townKey] || [];

    //         const towns = townList.map((item: LocationData) => ({
    //             id: item.admCode,
    //             name: item.lowestAdmCodeNm,
    //         }));

    //         setTowns([{ id: `${districtCode}_all`, name: `${districtName} 전체` }, ...towns]);
    //     } catch (err) {
    //         setError(err as string);
    //     }
    // };

    // api 통신 코드
    const fetchData = async (url: string, isInitial: boolean = false) => {
        try {
            if (isInitial) setIsInitialLoading(true);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data as ApiResponse;
        } catch (err) {
            setError(err instanceof Error ? err.message : "알 수 없는 에러가 발생했습니다.");
            return null;
        } finally {
            if (isInitial) setIsInitialLoading(false);
        }
    };

    const loadCities = async () => {
        const data = await fetchData(
            `${BASE_URL}/admCodeList?format=json&numOfRows=100&pageNo=1&key=${API_KEY}&domain=${DOMAIN}`,
            true,
        );
        if (data) {
            setCities(
                data.admVOList.admVOList.map((item: AdmVO) => ({
                    id: item.admCode,
                    name: item.lowestAdmCodeNm.slice(0, 2),
                })),
            );
        }
    };

    const loadDistricts = async (cityCode: string, cityName: string) => {
        const data = await fetchData(
            `${BASE_URL}/admSiList?key=${API_KEY}&numOfRows=100&domain=${DOMAIN}&format=json&admCode=${cityCode}`,
        );
        if (data) {
            const districts = data.admVOList.admVOList.map((item: AdmVO) => ({
                id: item.admCode,
                name: item.lowestAdmCodeNm,
            }));
            setDistricts([{ id: `${cityCode}_all`, name: `${cityName} 전체` }, ...districts]);
        }
    };

    const loadTowns = async (districtCode: string, districtName: string) => {
        const data = await fetchData(
            `${BASE_URL}/admDongList?key=${API_KEY}&numOfRows=100&domain=${DOMAIN}&format=json&admCode=${districtCode}`,
        );
        if (data) {
            const towns = data.admVOList.admVOList.map((item: AdmVO) => ({
                id: item.admCode,
                name: item.lowestAdmCodeNm,
            }));
            setTowns([{ id: `${districtCode}_all`, name: `${districtName} 전체` }, ...towns]);
        }
    };

    return {
        cities,
        districts,
        towns,
        error,
        isLoading: isInitialLoading,
        loadCities,
        loadDistricts,
        loadTowns,
        setDistricts,
        setTowns,
    };
};
