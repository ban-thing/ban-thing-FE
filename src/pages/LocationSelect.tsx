import { useEffect, useState } from "react";
import styled from "styled-components";
import BackButtonIcon from "../assets/icons/back.svg?react";
import LocationIcon from "../assets/icons/location.svg?react";
import PointIcon from "../assets/icons/point.svg?react";
import CheckIcon from "../assets/icons/check1.svg?react";
import { Button } from "@/components/atoms/Button";

interface Region {
    id: string;
    name: string;
}

interface AdmVO {
    admCode: string;
    admCodeNm: string;
    lowestAdmCodeNm: string;
}

interface ApiResponse {
    admVOList: {
        pageNo: string;
        admVOList: AdmVO[];
        totalCount: string;
        error: string;
        message: string;
        numOfRows: string;
    };
}

const API_KEY = "DF267C57-FC4C-337B-BADF-F0A952C4F4B3";
const BASE_URL = "/api";

const fetchCities = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}/admCodeList?format=json&numOfRows=20&pageNo=1&key=${API_KEY}&domain=http://localhost:5173`,
        );
        const data = await response.json();
        return (data as ApiResponse).admVOList.admVOList.map((item: AdmVO) => ({
            id: item.admCode,
            name: item.lowestAdmCodeNm,
        }));
    } catch (error) {
        console.error("Error fetching cities:", error);
        return [];
    }
};

const fetchDistricts = async (cityCode: string) => {
    try {
        const response = await fetch(
            `${BASE_URL}/admSiList?key=${API_KEY}&domain=http://localhost:5173&format=json&admCode=${cityCode}`,
        );
        const data = await response.json();
        return (data as ApiResponse).admVOList.admVOList.map((item: AdmVO) => ({
            id: item.admCode,
            name: item.lowestAdmCodeNm,
        }));
    } catch (error) {
        console.error("Error fetching districts:", error);
        return [];
    }
};
const fetchTowns = async (districtCode: string) => {
    try {
        const response = await fetch(
            `${BASE_URL}/admDongList?key=${API_KEY}&domain=http://localhost:5173&format=json&admCode=${districtCode}`,
        );
        const data = await response.json();
        return (data as ApiResponse).admVOList.admVOList.map((item: AdmVO) => ({
            id: item.admCode,
            name: item.lowestAdmCodeNm,
        }));
    } catch (error) {
        console.error("Error fetching towns:", error);
        return [];
    }
};

export default function LocationSelect() {
    const [cities, setCities] = useState<Region[]>([]);
    const [districts, setDistricts] = useState<Region[]>([]);
    const [towns, setTowns] = useState<Region[]>([]);
    const [selectedCity, setSelectedCity] = useState<Region | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<Region | null>(null);
    const [selectedTowns, setSelectedTowns] = useState<Region[]>([]);

    useEffect(() => {
        const loadCities = async () => {
            const citiesData = await fetchCities();
            setCities(citiesData);
        };
        loadCities();
    }, []);

    useEffect(() => {
        const loadDistricts = async () => {
            if (selectedCity) {
                const districtsData = await fetchDistricts(selectedCity.id);
                setDistricts(districtsData);
                setSelectedDistrict(null);
                setSelectedTowns([]);
            } else {
                setDistricts([]);
            }
        };
        loadDistricts();
    }, [selectedCity]);

    useEffect(() => {
        const loadTowns = async () => {
            if (selectedDistrict) {
                const townsData = await fetchTowns(selectedDistrict.id);
                setTowns(townsData);
                setSelectedTowns([]);
            } else {
                setTowns([]);
            }
        };
        loadTowns();
    }, [selectedDistrict]);

    const handleCitySelect = (city: Region) => {
        setSelectedCity(city);
    };

    const handleDistrictSelect = (district: Region) => {
        setSelectedDistrict(district);
    };

    const handleTownToggle = (town: Region) => {
        setSelectedTowns((prev) => {
            if (prev.find((t) => t.id === town.id)) {
                return prev.filter((t) => t.id !== town.id);
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

    return (
        <Container>
            <Header>
                <BackButtonIcon style={{ cursor: "pointer", marginLeft: 20 }} />
                <Title>지역 선택하기</Title>
            </Header>
            <div
                style={{
                    width: "100%",
                    height: "44px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <CurrentLocationButton>
                    <LocationIcon style={{ width: 16, height: 16 }} />
                    현재 위치 추가
                </CurrentLocationButton>
            </div>

            <CategoryLabels>
                <span>
                    시
                    <PointIcon style={{ width: 2, height: 2, margin: "0 4px" }} />도
                </span>
                <span>
                    시
                    <PointIcon style={{ width: 2, height: 2, margin: "0 4px" }} />
                    군
                    <PointIcon style={{ width: 2, height: 2, margin: "0 4px" }} />구
                </span>
                <span>
                    동
                    <PointIcon style={{ width: 2, height: 2, margin: "0 4px" }} />
                    읍
                    <PointIcon style={{ width: 2, height: 2, margin: "0 4px" }} />면
                </span>
            </CategoryLabels>
            <RegionContainer>
                <RegionSection>
                    {cities.map((city) => (
                        <RegionButton
                            key={city.id}
                            onClick={() => handleCitySelect(city)}
                            selected={selectedCity?.id === city.id}
                            variant="city"
                        >
                            {city.name.slice(0, 2)}
                        </RegionButton>
                    ))}
                </RegionSection>

                <RegionSection>
                    {districts.map((district) => (
                        <RegionButton
                            key={district.id}
                            onClick={() => handleDistrictSelect(district)}
                            selected={selectedDistrict?.id === district.id}
                            variant="district"
                        >
                            {district.name}
                        </RegionButton>
                    ))}
                </RegionSection>

                <RegionSection>
                    {towns.map((town) => (
                        <RegionButton
                            key={town.id}
                            onClick={() => handleTownToggle(town)}
                            selected={selectedTowns.some((t) => t.id === town.id)}
                            variant="town"
                        >
                            {town.name}
                            {selectedTowns.some((t) => t.id === town.id) && (
                                <CheckIcon
                                    style={{
                                        width: 22,
                                        height: 22,
                                        textAlign: "end",
                                    }}
                                />
                            )}
                        </RegionButton>
                    ))}
                </RegionSection>
            </RegionContainer>

            <SelectedArea>
                <div style={{ fontSize: 14, color: "var(--color-black-4)", marginBottom: 15 }}>
                    최대 3개 지역을 선택해요.
                </div>
                <SelectedTags>
                    <TagSection>
                        {selectedTowns.length > 0 && (
                            <>
                                <TagLabel>대표 지역</TagLabel>
                                <Tag
                                    key={selectedTowns[0].id}
                                    onClick={() => handleRemoveTown(selectedTowns[0].id)}
                                >
                                    {selectedTowns[0].name}
                                </Tag>
                            </>
                        )}
                    </TagSection>
                    {selectedTowns.length > 1 && (
                        <TagSection>
                            <TagLabel>추가 지역</TagLabel>
                            {selectedTowns.slice(1).map((town) => (
                                <Tag key={town.id} onClick={() => handleRemoveTown(town.id)}>
                                    {town.name}
                                </Tag>
                            ))}
                        </TagSection>
                    )}
                </SelectedTags>
                <ButtonGroup>
                    <Button
                        variant="outlined"
                        size="small"
                        style={{
                            color: "var(--color-black-5)",
                            borderColor: "var(--color-black-6)",
                        }}
                    >
                        취소
                    </Button>
                    <Button variant="filled" size="small">
                        확인
                    </Button>
                </ButtonGroup>
            </SelectedArea>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    background: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    position: relative;
`;

const Title = styled.h1`
    text-align: center;
    flex-grow: 1;
    font-size: 20px;
    font-weight: 500;
    margin-right: 40px;
`;

const CurrentLocationButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    border: 1px solid var(--color-main-1);
    color: var(--color-main-1);
    background: white;
    padding: 2px 6px;
    border-radius: 24px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    gap: 3px;
    margin-right: 16px;
`;

const CategoryLabels = styled.div`
    font-size: 14px;
    background-color: var(--color-black-8);
    padding: 12px 36px;
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    span {
        color: var(--color-black-5);
        display: flex;
        align-items: center;
    }
`;

const RegionContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background-color: #f5f5f5;
    flex: 1;
    overflow: hidden;
`;

const RegionSection = styled.div`
    background: white;
    overflow-y: auto;
    height: 100%;
`;

const RegionButton = styled.button<{
    selected?: boolean;
    variant?: "city" | "district" | "town";
}>`
    width: 100%;
    height: 50px;
    padding: 8px 20px;
    text-align: left;
    border: none;
    background: white;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: var(--color-black-5);

    ${({ selected, variant }) => {
        switch (variant) {
            case "city":
                return (
                    selected &&
                    `
                    background: var(--color-main-1);
                    color: white;
                    &:hover {
                        background: var(--color-main-1);
                    }
                `
                );
            case "district":
                return (
                    selected &&
                    `
                    background: var(--color-main-3);
                    color: #6290ec;
                    &:hover {
                        background: var(--color-main-2);
                    }
                `
                );
            case "town":
                return `
                    background: white;
                    color: ${selected ? "var(--color-main-1)" : "var(--color-black-5)"};
                    font-weight: ${selected ? "500" : "normal"};
                    display: flex;
                    justify-content: space-between;
                    &:hover {
                        background: #f5f5f5;
                    }
                `;
            default:
                return "";
        }
    }}

    &:hover {
        background-color: #f5f5f5;
    }
`;

const SelectedArea = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 10px;
    background: white;
    border-top: 1px solid #eee;
`;

export const SelectedTags = styled.div`
    margin-bottom: 20px;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    gap: 9px;
`;

export const TagSection = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
`;

export const TagLabel = styled.span`
    color: var(--color-black-5);
    margin-right: 6px;
    white-space: nowrap;
`;

export const Tag = styled.span`
    display: inline-flex;
    align-items: center;
    background: rgba(98, 144, 236, 0.1);
    color: var(--color-main-1);
    padding: 0 8px;
    border-radius: 20px;
    margin-right: 6px;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;

    &::after {
        content: "×";
        margin-left: 6px;
        font-size: 18px;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;
