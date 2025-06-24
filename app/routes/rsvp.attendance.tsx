import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/rsvp.attendance";

import { getGuestByFullName } from "#services/guests";
import { getUserSession } from "#services/session";
import { z } from "zod";

const ATTENDING = "attending";
const GUEST = "guest";
const EVENT = "event";

const eventSchema = z.object({
  [ATTENDING]: z.coerce.boolean(),
  [GUEST]: z.string(),
  [EVENT]: z.string(),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const event = eventSchema.parse(Object.fromEntries(formData.entries()));
  console.log(event)

  return null;
}

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
  };
}

export default function Attendance({ loaderData }: Route.ComponentProps) {
  const allGuests = [
    loaderData.guest,
    ...loaderData.guest.additionalGuests.guests,
  ];

  const eventsFetcher = useFetcher();

  return (
    <>
      <h2 className="text-fluid-3xl/(--spacing-fluid-3xl) font-cursive flex justify-center">
        Guests
      </h2>
      <div className="bg-stone-100 border-2 border-double w-full max-w-[50ch] p-fluid-sm font-handwritten">
        {loaderData.guest.fullName}
      </div>
      {loaderData.guest.additionalGuests.guests.map((guest) => (
        <div
          key={guest.fullName}
          className="bg-stone-100 border-2 border-double w-full max-w-[50ch] p-fluid-sm font-handwritten"
        >
          {guest.fullName}
        </div>
      ))}
      <h2 className="text-fluid-3xl/(--spacing-fluid-3xl) font-cursive flex justify-center">
        Events
      </h2>
      {loaderData.guest.attendance.map((attendance) => (
        <div
          key={attendance.event.name}
          className="grid gap-fluid-sm bg-stone-100 border-2 border-double w-full max-w-[50ch] p-fluid-sm font-handwritten"
        >
          <div>
            <h3 className="text-fluid-xl">{attendance.event.name}</h3>
            <div>{attendance.event.location}</div>
            <div>{new Date(attendance.event.timestamp).toLocaleString()}</div>
          </div>
          <ul>
            {allGuests.map((guest) => (
              <li key={guest.fullName}>
                <eventsFetcher.Form
                  method="POST"
                  onChange={(event) => {
                    eventsFetcher.submit(event.currentTarget);
                  }}
                >
                  <label className="flex items-center gap-fluid-xs select-none">
                    <input
                      className="accent-sage-500 size-fluid-sm"
                      type="checkbox"
                      name={ATTENDING}
                      defaultChecked={
                        guest.attendance.find(
                          (x) => x.event.name === attendance.event.name
                        )?.attending
                      }
                    />
                    {guest.fullName}
                  </label>
                  <input className="hidden" aria-hidden readOnly name={GUEST} value={guest.fullName} />
                  <input className="hidden" aria-hidden readOnly name={EVENT} value={attendance.event.location} />
                </eventsFetcher.Form>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
