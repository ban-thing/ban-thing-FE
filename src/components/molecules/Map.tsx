import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

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
    const containerStyle = {
        width,
        height,
    };

    return (
        <LoadScript googleMapsApiKey={API_KEY}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
                {markers.map((marker, index) => (
                    <MarkerF key={index} position={marker} />
                ))}
            </GoogleMap>
        </LoadScript>
    );
}
