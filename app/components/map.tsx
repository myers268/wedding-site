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

interface Location {
  type: string;
  name: string;
  position: { lat: number; lng: number };
  url: string;
}

interface MapProps {
  apiKey: string;
  locations: Location[];
  children?: React.ReactNode;
}

export function Map({ apiKey, locations, children }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const center = useMemo(() => {
    const avgLat =
      locations.reduce((sum, loc) => sum + loc.position.lat, 0) /
      locations.length;
    const avgLng =
      locations.reduce((sum, loc) => sum + loc.position.lng, 0) /
      locations.length;
    return { lat: avgLat, lng: avgLng };
  }, []);

  if (!isLoaded) {
    return (
      <div className="relative border-3 border-double bg-stone-100">
        <div style={containerStyle} />
      </div>
    );
  }

  return (
    <div className="relative border-3 border-double bg-stone-100">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12.5}
        options={{ mapTypeControl: false }}
      >
        <TransitLayer />
        {locations.map((loc, index) => (
          <Marker
            key={index}
            icon={createSVGMarker(loc.type === "hotel" ? "red" : "blue")}
            position={loc.position}
            title={loc.name}
            onClick={() => window.open(loc.url, "_blank")}
          />
        ))}
      </GoogleMap>

      {children}
    </div>
  );
}

const createSVGMarker = (fill: string) => {
  const svgMarker = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fill}" stroke="white" class="size-6">
      <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
    </svg>
  `;

  return {
    url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svgMarker),
    scaledSize: new google.maps.Size(32, 32),
  };
};
