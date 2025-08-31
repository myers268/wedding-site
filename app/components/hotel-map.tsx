import {
  GoogleMap,
  Marker,
  TransitLayer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useMemo } from "react";

const containerStyle = {
  width: "100%",
  height: "25rem",
};

const hotels = [
  {
    name: "Hilton Garden Inn, Washington D.C. / U.S. Capitol",
    position: { lat: 38.9062586, lng: -77.0056282 },
    url: "https://www.hilton.com/en/hotels/dcanmgi-hilton-garden-inn-washington-dc-us-capitol/?SEO_id=GMB-AMER-GI-DCANMGI&y_source=1_MjA4MjE4Ni03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D",
  },
  {
    name: "Hotel Nell, Union Market",
    position: { lat: 38.9111946, lng: -76.9976061 },
    url: "https://www.hotelnelldc.com/",
  },
  {
    name: "Courtyard Washington D.C. / U.S. Capitol",
    position: { lat: 38.9078865, lng: -77.0032167 },
    url: "https://www.marriott.com/en-us/hotels/wasus-courtyard-washington-dc-us-capitol/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0",
  },
  {
    name: "Placemakr Dupont Circle",
    position: { lat: 38.9099211, lng: -77.0423689 },
    url: "https://www.placemakr.com/locations/washington-dc/dupont-circle?utm_source=GMB&utm_medium=organic&utm_campaign=GMBdupnt",
  },
  {
    name: "The Venn at Embassy Row, Dupont Circle",
    position: { lat: 38.9106467, lng: -77.0455332 },
    url: "https://www.marriott.com/en-us/hotels/wastx-the-ven-at-embassy-row-washington-dc-a-tribute-portfolio-hotel/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0",
  },
];

export default function HotelMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  const center = useMemo(() => {
    const avgLat =
      hotels.reduce((sum, hotel) => sum + hotel.position.lat, 0) /
      hotels.length;
    const avgLng =
      hotels.reduce((sum, hotel) => sum + hotel.position.lng, 0) /
      hotels.length;
    return { lat: avgLat, lng: avgLng };
  }, []);

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
    >
      <TransitLayer />
      {hotels.map((hotel, index) => (
        <Marker
          key={index}
          position={hotel.position}
          title={hotel.name}
          onClick={() => window.open(hotel.url, "_blank")}
        />
      ))}
    </GoogleMap>
  );
}
