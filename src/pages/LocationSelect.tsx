import styled from "styled-components";
import LocationIcon from "../assets/icons/location.svg?react";
import PointIcon from "../assets/icons/point.svg?react";
import CheckIcon from "../assets/icons/check1.svg?react";
import { Button } from "@/components/atoms/Button";
import ClipLoader from "react-spinners/ClipLoader";
import { PageTitle } from "@/components/atoms/PageTitle";
import { useLocationSetting } from "@/hooks/useLocationSetting";
import { useNavigate } from "react-router-dom";
import { useFetchAddress } from "@/hooks/api/UsersQuery";

const formatAddress = (
    city?: { name: string },
    district?: { name: string },
    town?: { name: string },
) => {
    if (!city) return "";
    if (town?.name.includes("전체")) {
        if (district?.name.includes("전체")) {
            return city.name;
        }
        return `${city.name} ${district?.name}`;
    }
    return `${city.name} ${district?.name} ${town?.name}`;
};

export default function LocationSelect() {
    const navigate = useNavigate();
    const {
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
        resetData,
    } = useLocationSetting();
    const { mutate } = useFetchAddress({
        address1: selectedTowns[0]
            ? formatAddress(selectedCity, selectedDistrict, selectedTowns[0])
            : "",
        address2: selectedTowns[1]
            ? formatAddress(selectedCity, selectedDistrict, selectedTowns[1])
            : "",
        address3: selectedTowns[2]
            ? formatAddress(selectedCity, selectedDistrict, selectedTowns[2])
            : "",
    });

    const onClickCancel = () => {
        resetData();
    };

    const onClickSubmit = () => {
        if (selectedTowns[0]) {
            mutate();
        }
    };

    if (isLoading) {
        return (
            <LoaderContainer>
                <ClipLoader color="#d7d7d7" size={48} />
            </LoaderContainer>
        );
    }
    if (error) {
        return <ErrorContainer>{error}</ErrorContainer>;
    }

    return (
        <Container>
            <PageTitle $margin="16px 0 16px">지역 선택하기</PageTitle>
            <div
                style={{
                    width: "100%",
                    height: "44px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <CurrentLocationButton onClick={() => onClickCurrent(navigate)}>
                    <LocationIcon style={{ width: 16, height: 16 }} />
                    현재 위치 추가
                </CurrentLocationButton>
            </div>

            <CategoryLabels>
                <span>
                    시<PointIcon />도
                </span>
                <span>
                    시<PointIcon />군<PointIcon />구
                </span>
                <span>
                    동<PointIcon />읍<PointIcon />면
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
                            {city.name}
                        </RegionButton>
                    ))}
                </RegionSection>

                <RegionSection>
                    {districts.map((district) => {
                        const isSelected = selectedDistrict?.id === district.id;
                        const shouldHighlight =
                            isSelected ||
                            (selectedDistrict?.id.endsWith("_all") &&
                                !district.id.endsWith("_all"));

                        return (
                            <RegionButton
                                key={district.id}
                                onClick={() => handleDistrictSelect(district)}
                                selected={shouldHighlight}
                                variant="district"
                            >
                                {district.name}
                                {shouldHighlight && (
                                    <CheckIcon
                                        style={{
                                            width: 22,
                                            height: 22,
                                            textAlign: "end",
                                        }}
                                    />
                                )}
                            </RegionButton>
                        );
                    })}
                </RegionSection>

                <RegionSection>
                    {towns.map((town) => {
                        const isAllSelected = selectedTowns.some((t) => t.id?.endsWith("_all"));
                        const isSelected =
                            selectedTowns.some((t) => t.id === town.id) ||
                            (isAllSelected && !town.id?.endsWith("_all"));

                        return (
                            <RegionButton
                                key={town.id}
                                onClick={() => handleTownToggle(town)}
                                selected={isSelected}
                                variant="town"
                            >
                                {town.name}
                                {isSelected && (
                                    <CheckIcon
                                        style={{
                                            width: 22,
                                            height: 22,
                                            textAlign: "end",
                                        }}
                                    />
                                )}
                            </RegionButton>
                        );
                    })}
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
                                    onClick={() => handleRemoveTown(selectedTowns[0].name)}
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
                                <Tag key={town.id} onClick={() => handleRemoveTown(town.name)}>
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
                        onClick={onClickCancel}
                    >
                        초기화
                    </Button>
                    <Button
                        variant={selectedTowns.length > 0 ? "filled" : "gray"}
                        size="small"
                        disabled={selectedTowns.length === 0}
                        onClick={onClickSubmit}
                    >
                        확인
                    </Button>
                </ButtonGroup>
            </SelectedArea>
        </Container>
    );
}

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
`;

const ErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    color: red;
    font-size: 16px;
`;

const Container = styled.div`
    width: 100%;
    background: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;
const CurrentLocationButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    border: 1px solid var(--color-main-1);
    color: var(--color-main-1);
    background: rgba(198, 212, 255, 0.3);
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

    & svg {
        width: 2px;
        height: 2px;
        margin: 0 4px;
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

    &:hover {
        background-color: #f5f5f5;
    }

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
`;

const SelectedArea = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 10px;
    background: white;
    border-top: 1px solid #eee;
`;
const SelectedTags = styled.div`
    margin-bottom: 20px;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    gap: 9px;
`;
const TagSection = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
`;
const TagLabel = styled.span`
    color: var(--color-black-5);
    margin-right: 6px;
    white-space: nowrap;
`;
const Tag = styled.span`
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
