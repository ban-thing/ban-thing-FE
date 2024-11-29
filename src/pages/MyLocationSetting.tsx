import Map from "../components/molecules/Map";
import styled from "styled-components";
import BackButtonIcon from "../assets/icons/back.svg?react";
import { Button } from "@/components/atoms/Button";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };
const SAMPLE_MARKERS = [
    { lat: 37.5796, lng: 126.977 },
    { lat: 37.5512, lng: 126.9882 },
];

const MyLocationSetting = () => {
    return (
        <Container>
            <Header>
                <BackButton>
                    <BackButtonIcon />
                </BackButton>
                <Title>내 위치</Title>
            </Header>
            <Map center={DEFAULT_CENTER} markers={SAMPLE_MARKERS} height="294px" width="100%" />
            <LocationInfoWrapper>
                <LocationButton>
                    현재 위치는
                    <LocationText> "연수동" </LocationText>
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
