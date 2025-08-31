import { Link } from "react-router";
import HotelMap from "#app/components/hotel-map";

export default function Travel() {
  return (
    <div className="grid gap-fluid-2xs">
      <h1>Where to stay</h1>
      
      <div>
        <h2>Hotel Locations</h2>
        <HotelMap />
      </div>

      <h2>Hotels</h2>
      <div>
        <Link to="https://www.hilton.com/en/hotels/dcanmgi-hilton-garden-inn-washington-dc-us-capitol/?SEO_id=GMB-AMER-GI-DCANMGI&y_source=1_MjA4MjE4Ni03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D">
          Hilton Garden Inn, Washington D.C. / U.S. Captiol
        </Link>
      </div>
      <div>
        <Link to="https://www.hotelnelldc.com/">Hotel Nell, Union Market</Link>
      </div>
      <div>
        <Link to="https://www.marriott.com/en-us/hotels/wasus-courtyard-washington-dc-us-capitol/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0">Courtyard Washington D.C. / U.S. Capitol</Link>
      </div>
      <div>
        <Link to="https://www.placemakr.com/locations/washington-dc/dupont-circle?utm_source=GMB&utm_medium=organic&utm_campaign=GMBdupnt">Placemakr Dupont Circle</Link>
      </div>
      <div>
        <Link to="https://www.marriott.com/en-us/hotels/wastx-the-ven-at-embassy-row-washington-dc-a-tribute-portfolio-hotel/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0">The Venn at Embassy Row, Dupont Circle</Link>
      </div>
      <h2>Airbnb</h2>
    </div>
  );
}
