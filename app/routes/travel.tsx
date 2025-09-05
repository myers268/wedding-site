import { Link } from "react-router";
import { Map } from "#app/components/map";

import { env } from "cloudflare:workers";
import type { Route } from "./+types/travel";

export async function loader() {
  return {
    googleMapsApiKey: env.GOOGLE_CLOUD_API_KEY,
  };
}

const locations = [
  {
    type: "hotel",
    name: "The Venn at Embassy Row, Dupont Circle",
    position: { lat: 38.9106467, lng: -77.0455332 },
    url: "https://www.marriott.com/en-us/hotels/wastx-the-ven-at-embassy-row-washington-dc-a-tribute-portfolio-hotel/overview/",
  },
  {
    type: "hotel",
    name: "Placemakr Dupont Circle",
    position: { lat: 38.9099211, lng: -77.0423689 },
    url: "https://www.placemakr.com/locations/washington-dc/dupont-circle/",
  },
  {
    type: "hotel",
    name: "Hilton Garden Inn, Washington D.C. / U.S. Capitol",
    position: { lat: 38.9062586, lng: -77.0056282 },
    url: "https://www.hilton.com/en/hotels/dcanmgi-hilton-garden-inn-washington-dc-us-capitol/",
  },
  {
    type: "hotel",
    name: "Courtyard Washington D.C. / U.S. Capitol",
    position: { lat: 38.9078865, lng: -77.0032167 },
    url: "https://www.marriott.com/en-us/hotels/wasus-courtyard-washington-dc-us-capitol/overview/",
  },
  {
    type: "hotel",
    name: "Hotel Nell, Union Market",
    position: { lat: 38.9111946, lng: -76.9976061 },
    url: "https://www.hotelnelldc.com/",
  },
  {
    type: "venue",
    name: "St Francis Hall",
    position: { lat: 38.937538, lng: -76.986573 },
    url: "https://stfrancishall.com/",
  },
];

export default function Travel({ loaderData }: Route.ComponentProps) {
  return (
    <div className="grid gap-fluid-2xs text-fluid-base">
      <div className="relative isolate mx-auto mt-fluid-2xs">
        {/* <div className="-z-10 absolute inset-0 blob-2 bg-rust-300/30 -scale-120 -translate-y-6 translate-x-4" /> */}
        <div className="-z-10 absolute inset-0 blob-1 bg-stone-100/60 scale-120 -translate-y-3 -translate-x-8" />
        <div className="-z-10 absolute inset-0 blob-3 bg-sage-500/35 scale-120 -translate-y-6 translate-x-16" />
        <h1 className="font-cursive text-fluid-2xl/(--spacing-fluid-3xl) text-balance text-center">
          Where to stay
        </h1>
      </div>

      <div className="grid gap-fluid-xs">
        <Map apiKey={loaderData.googleMapsApiKey} locations={locations}>
          <ul
            id="legend"
            className="absolute top-2 left-2 bg-stone-100 p-2 shadow-md border-3 border-double"
          >
            <li className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="-mb-1">Hotels</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-700 rounded-full"></div>
              <span className="-mb-1">Venue</span>
            </li>
          </ul>
        </Map>
        <h2 className="font-handwritten text-balance text-center text-fluid-xl">
          Hotels, listed from West to East
        </h2>
        <ul className="text-fluid-base italic font-light sm:font-extralight grid gap-fluid-2xs">
          {locations
            .filter((loc) => loc.type === "hotel")
            .map((loc, index) => (
              <li
                key={index}
                className="bg-stone-100 border-3 border-double p-fluid-2xs"
              >
                <Link to={loc.url}>{loc.name}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
