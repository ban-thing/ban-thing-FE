import { useState } from "react";
import { Region, AdmVO, ApiResponse } from "@/types/location";

const API_KEY = "DF267C57-FC4C-337B-BADF-F0A952C4F4B3";
const BASE_URL = "/api";

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
            `${BASE_URL}/admCodeList?format=json&numOfRows=20&pageNo=1&key=${API_KEY}&domain=http://localhost:5173`,
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
            `${BASE_URL}/admSiList?key=${API_KEY}&domain=http://localhost:5173&format=json&admCode=${cityCode}`,
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
            `${BASE_URL}/admDongList?key=${API_KEY}&domain=http://localhost:5173&format=json&admCode=${districtCode}`,
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
