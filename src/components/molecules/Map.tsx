import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useState } from "react";

interface Props {
    center: {
        lat: number;
        lng: number;
    };
    markers?: {
        lat: number;
        lng: number;
    }[];
    height?: string | number;
    width?: string | number;
}

export default function Map({ center, markers = [], height = "400px", width = "100%" }: Props) {
    const [mapLoaded, setMapLoaded] = useState(false);

    const containerStyle = {
        width,
        height,
    };

    const handleMapLoad = () => {
        setMapLoaded(true);
    };

    return (
        <div style={{ display: mapLoaded ? "block" : "none" }}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                onLoad={handleMapLoad}
            >
                {markers.map((marker, index) => (
                    <MarkerF key={index} position={marker} />
                ))}
            </GoogleMap>
        </div>
    );
}
