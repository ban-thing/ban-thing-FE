import KakaoMap from "../components/molecules/KakaoMap";
import styled from "styled-components";
import { Button } from "@/components/atoms/Button";
import { useLocationStore } from "@/store/LocationStore";
import { useEffect, useState } from "react";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { useLocationSetting } from "@/hooks/useLocationSetting";

const MyLocationSetting = () => {
    const { getAddress } = useLocationSetting();
    const { currentLocation, setCurrentLocation } = useLocationStore();
    const [currentCoor, setCurrentCoor] = useState({ lat: 37.5665, lng: 126.978 });

    async function handleAddressLookup(lat: number, lng: number) {
        try {
            const data = await getAddress(lat, lng);
            setCurrentLocation(data);
            return data;
        } catch (error) {
            console.error("주소 정보를 가져오지 못했어요.", error);
        }
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCurrentCoor(location);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("위치 정보를 가져오는데 실패했습니다.");
                },
            );
        } else {
            alert("이 브라우저에서는 위치 정보를 사용할 수 없습니다.");
        }
    }, []);

    useEffect(() => {
        const lat = currentCoor.lat;
        const lng = currentCoor.lng;
        handleAddressLookup(lat, lng);
        console.log(currentLocation);
    }, [currentCoor]);

    return (
        <Container>
            <PageTitleWithBackButton text="내 위치" $margin="16px 0" />
            <KakaoMap center={currentCoor} markers={[currentCoor]} height="294px" width="100%" />
            <LocationInfoWrapper>
                <LocationButton>
                    현재 위치는
                    <LocationText> "{currentLocation?.region_3depth_name}" </LocationText>
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
    width: 100%;
    background: white;
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
