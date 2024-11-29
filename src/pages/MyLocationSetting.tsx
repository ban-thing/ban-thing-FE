import Map from "../components/molecules/Map";
import styled from "styled-components";
import BackButtonIcon from "../assets/icons/back.svg?react";
import { Button } from "@/components/atoms/Button";

const MyLocationSetting = () => {
    return (
        <Container>
            <Header>
                <BackButtonIcon style={{ cursor: "pointer", marginLeft: 20 }} />
                <Title>내 위치</Title>
            </Header>
            <Map
                center={{ lat: 37.5665, lng: 126.978 }}
                markers={[
                    { lat: 37.5796, lng: 126.977 },
                    { lat: 37.5512, lng: 126.9882 },
                ]}
                height="294px"
                width="100%"
            />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                    flexDirection: "column",
                }}
            >
                <Button
                    variant="gray"
                    style={{
                        width: "335px",
                        height: "36px",
                        color: "var(--color-black-4)",
                        fontSize: "14px",
                        backgroundColor: "var(--color-black-8)",
                    }}
                >
                    현재 위치는
                    <span style={{ color: "var(--color-black-1)" }}> "연수동" </span>
                    이에요.
                </Button>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    bottom: "20px",
                    right: "0",
                    width: "100%",
                }}
            >
                <Button>적용하기</Button>
            </div>
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
