// "use client";
import React from "react";
import { GoogleMap, LoadScript, PolylineF } from "@react-google-maps/api";
import { mapStyle } from "./mapConfig";

interface MyGoogleMapProps {
  path: { lat: number; lng: number }[];
  center: { lat: number; lng: number };
}

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "10px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
};

const MyGoogleMapComponent: React.FC<MyGoogleMapProps> = ({ path, center }) => {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{ styles: mapStyle }}
      >
        <PolylineF
          path={path}
          options={{
            strokeColor: "#FFFF01",
            strokeOpacity: 0.6,
            strokeWeight: 8,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MyGoogleMapComponent;
