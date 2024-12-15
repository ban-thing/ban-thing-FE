import { useState } from "react";
import { Region, AdmVO, ApiResponse } from "@/types/location";

const URL = window.location.href.includes("localhost") ? "/api" : "https://api.vworld.kr/ned/data";
// const API_KEY = "15EB6A87-98E6-333C-BF19-30B0EEA78330";
const API_KEY = window.location.href.includes("localhost")
    ? "DF267C57-FC4C-337B-BADF-F0A952C4F4B3" // Local API key
    : "15EB6A87-98E6-333C-BF19-30B0EEA78330"; // Server API key
const BASE_URL = window.location.href.includes("localhost")
    ? "http://localhost:3000"
    : "http://211.188.62.82:3000";

export const useLocationData = () => {
    const [cities, setCities] = useState<Region[]>([]);
    const [districts, setDistricts] = useState<Region[]>([]);
    const [towns, setTowns] = useState<Region[]>([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            `${URL}/admCodeList?format=json&numOfRows=100&pageNo=1&key=${API_KEY}&domain=${BASE_URL}`,
            true,
        );
        if (data) {
            setCities(
                data.admVOList.admVOList.map((item: AdmVO) => ({
                    id: item.admCode,
                    name: item.lowestAdmCodeNm.slice(0, 4),
                })),
            );
        }
    };

    const loadDistricts = async (cityCode: string, cityName: string) => {
        const data = await fetchData(
            `${URL}/admSiList?key=${API_KEY}&numOfRows=100&domain=${BASE_URL}&format=json&admCode=${cityCode}`,
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
            `${URL}/admDongList?key=${API_KEY}&numOfRows=100&domain=${BASE_URL}&format=json&admCode=${districtCode}`,
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
        isLoading: isInitialLoading,
        error,
        loadCities,
        loadDistricts,
        loadTowns,
        setDistricts,
        setTowns,
    };
};
