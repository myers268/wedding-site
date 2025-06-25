import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/rsvp.attendance";

import { getEventAttendanceByGuestIds, getGuestByFullName, getPartyByPrimaryGuestId } from "#services/guests";
import { getUserSession } from "#services/session";
import { z } from "zod/v4";

const ATTENDING = "attending";
const GUEST = "guest-id";
const EVENT = "event-id";

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

export async function loader({ request, context }: Route.LoaderArgs) {
  const guestName = await getUserSession(request);

  if (!guestName) {
    throw redirect("/rsvp/search");
  }

  const db = context.cloudflare.db;

  const guest = await getGuestByFullName(db, guestName);
  const party = await getPartyByPrimaryGuestId(db, guest.id);
  const attendance = await getEventAttendanceByGuestIds(db, party.map(p => p.id));

  return {
    party,
    attendance,
  };
}

export default function Attendance({ loaderData }: Route.ComponentProps) {
  const eventsFetcher = useFetcher();

  return (
    <>
      <h2 className="text-fluid-3xl/(--spacing-fluid-3xl) font-cursive flex justify-center">
        Guests
      </h2>
      {loaderData.party.map((guest) => (
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
      {loaderData.attendance.map((event) => (
        <div
          key={event.name}
          className="grid gap-fluid-sm bg-stone-100 border-2 border-double w-full max-w-[50ch] p-fluid-sm font-handwritten"
        >
          <div>
            <h3 className="text-fluid-xl">{event.name}</h3>
            <div>{event.location}</div>
            <div>{new Date(event.timestamp).toLocaleString()}</div>
          </div>
          <ul>
            {event.attendance.map((guest) => (
              <li key={guest.id}>
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
                      defaultChecked={guest.attending}
                    />
                    {guest.fullName}
                  </label>
                  <input className="hidden" aria-hidden readOnly name={GUEST} value={guest.id} />
                  <input className="hidden" aria-hidden readOnly name={EVENT} value={event.id} />
                </eventsFetcher.Form>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
