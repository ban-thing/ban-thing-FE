import KakaoMap from "../components/molecules/KakaoMap";
import styled from "styled-components";
import { Button } from "@/components/atoms/Button";
import { useCoorStore, useAddressStore } from "@/store/LocationStore";
import { useEffect } from "react";
import { PageTitleWithBackButton } from "@/components/atoms/PageTitle";
import { useLocationSetting } from "@/hooks/useLocationSetting";
import { useNavigate } from "react-router-dom";

const MyLocationSetting = () => {
    const navigate = useNavigate();
    const { getAddress, onClickCurrent } = useLocationSetting();
    const { currentAddress, setCurrentAddress } = useAddressStore();
    const { currentCoor } = useCoorStore();

    async function handleAddressLookup(lat: number, lng: number) {
        try {
            const data = await getAddress(lat, lng);
            setCurrentAddress([
                data.region_1depth_name,
                data.region_2depth_name,
                [data.region_3depth_name],
            ]);
            return data;
        } catch (error) {
            console.error("주소 정보를 가져오지 못했어요.", error);
        }
    }

    useEffect(() => {
        if (currentCoor.lat === 35 && currentCoor.lng === 27) {
            onClickCurrent();
            return;
        }

        (async () => {
            const lat = currentCoor.lat;
            const lng = currentCoor.lng;
            await handleAddressLookup(lat, lng);
        })();
    }, [currentCoor]);

    const onClickSubmit = async () => {
        navigate("/");
    };

    return (
        <Container>
            <PageTitleWithBackButton text="내 위치" $margin="16px 0" />
            <KakaoMap
                key={currentCoor.lat}
                center={currentCoor}
                markers={[currentCoor]}
                height="294px"
                width="100%"
            />
            <LocationInfoWrapper>
                <LocationButton>
                    현재 위치는
                    <LocationText> "{currentAddress?.[2]?.[0]}" </LocationText>
                    이에요.
                </LocationButton>
                <span>실제 위치와 지도상의 위치는 약간 차이날 수 있어요.</span>
            </LocationInfoWrapper>
            <BottomButtonWrapper>
                <Button onClick={onClickSubmit}>적용하기</Button>
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

    & > span {
        font-size: 13px;
        color: var(--color-black-4);
        margin-top: 16px;
    }
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
