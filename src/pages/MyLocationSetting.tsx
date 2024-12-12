import KakaoMap from "../components/molecules/KakaoMap";
import styled from "styled-components";
import BackButtonIcon from "../assets/icons/back.svg?react";
import { Button } from "@/components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { useLocationStore } from "@/store/LocationStore";
import { useEffect, useState } from "react";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };

interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

const MyLocationSetting = () => {
    const navigate = useNavigate();
    const { currentLocation } = useLocationStore();
    const [locationName, setLocationName] = useState<string>("");

    const handleBack = () => {
        navigate("/location-select");
    };

    useEffect(() => {
        if (!currentLocation) {
            navigate("/location-select");
        }
    }, [currentLocation, navigate]);

    useEffect(() => {
        const fetchLocationName = async () => {
            console.log(currentLocation, "currentLocation");
            if (currentLocation) {
                try {
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation.lat},${currentLocation.lng}&language=ko&key=AIzaSyDL86mTnLYIFovG0Z7TaRUw4_vtM2rRh2s`,
                    );
                    const data = await response.json();
                    if (data.results[0]) {
                        const address = data.results[0].address_components.find(
                            (component: AddressComponent) =>
                                component.types.includes("sublocality_level_2") ||
                                component.types.includes("sublocality_level_1"),
                        );
                        setLocationName(address?.long_name || "알 수 없는 위치");
                    }
                } catch (error) {
                    console.error("Error fetching location name:", error);
                    setLocationName("알 수 없는 위치");
                }
            }
        };
        fetchLocationName();
    }, [currentLocation]);

    return (
        <Container>
            <Header>
                <BackButton onClick={handleBack}>
                    <BackButtonIcon style={{ display: "flex" }} />
                </BackButton>
                <Title>내 위치</Title>
            </Header>

            <KakaoMap
                center={currentLocation || DEFAULT_CENTER}
                markers={[currentLocation || DEFAULT_CENTER]}
                height="294px"
                width="100%"
            />
            <LocationInfoWrapper>
                <LocationButton>
                    현재 위치는
                    <LocationText> "{locationName}" </LocationText>
                    이에요.
                </LocationButton>
            </LocationInfoWrapper>
            <BottomButtonWrapper>
                <Button>적용하기</Button>
            </BottomButtonWrapper>
        </Container>
    );
};

export default MyLocationSetting;

const Container = styled.div`
    padding: 20px 0;
    width: 100%;
    background: white;
`;

const Header = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const Title = styled.h1`
    text-align: center;
    flex-grow: 1;
    font-size: 20px;
    font-weight: 500;
    margin-right: 40px;
`;
const LocationInfoWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    flex-direction: column;
`;

const LocationButton = styled(Button).attrs({ variant: "gray" })`
    width: 335px;
    height: 36px;
    color: var(--color-black-4);
    font-size: 14px;
    background-color: var(--color-black-8);
`;

const LocationText = styled.span`
    color: var(--color-black-1);
`;

const BottomButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 20px;
    right: 0;
    width: 100%;
`;
const BackButton = styled.div`
    cursor: pointer;
    margin-left: 20px;
`;
