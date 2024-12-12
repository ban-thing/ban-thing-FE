import { Map, MapMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps {
    center: {
        lat: number;
        lng: number;
    };
    markers?: Array<{
        lat: number;
        lng: number;
    }>;
    height: string;
    width: string;
    level?: number;
}

const KakaoMap = ({ center, markers = [], height, width, level = 3 }: KakaoMapProps) => {
    return (
        <div>
            <Map
                center={center}
                style={{
                    width: width,
                    height: height,
                }}
                level={level}
            >
                {markers.map((marker, index) => (
                    <MapMarker key={index} position={marker} />
                ))}
            </Map>
        </div>
    );
};

export default KakaoMap;
