import { redirect } from "react-router";
import type { Route } from "./+types/rsvp.attendance";

import { getGuestByFullName } from "#services/guests";
import { getUserSession } from "#services/session";

export async function loader({ request }: Route.LoaderArgs) {
  // Check if user has a valid session
  const guestName = await getUserSession(request);
  
  if (!guestName) {
    // Redirect to search page if no session
    throw redirect("/rsvp/search");
  }

  // Fetch guest data using the name from session
  const guest = await getGuestByFullName(guestName);

  return {
    guest,
  }
}

export default function Attendance({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h2 className="text-fluid-3xl/(--spacing-fluid-3xl) font-cursive flex justify-center">
        Guests
      </h2>
      <div className="bg-stone-100 border-2 border-double w-full max-w-[50ch] p-fluid-sm font-handwritten">
        {loaderData.guest.fullName}
      </div>
      {loaderData.guest.additionalGuests.guests.map((guest) => (
        <div key={guest.fullName} className="bg-stone-100 border-2 border-double w-full max-w-[50ch] p-fluid-sm font-handwritten">
          {guest.fullName}
        </div>
      ))}
      <h2 className="text-fluid-3xl/(--spacing-fluid-3xl) font-cursive flex justify-center">
        Events
      </h2>
      {loaderData.guest.attendance.map((attendance) => (
        <div key={attendance.event.name} className="">

        </div>
      ))}
    </>
  );
}
