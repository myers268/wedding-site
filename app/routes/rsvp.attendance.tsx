import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/rsvp.attendance";

import {
  getEventAttendanceByGuestIds,
  getPrimaryGuestByFullName,
  getPartyBytGuestId,
  updateGuestAttendance,
} from "#services/guests";
import { getUserSession } from "#services/session";
import { z } from "zod/v4";

const ATTENDING = "attending";
const GUEST = "guestId";
const EVENT = "eventId";

const attendingValues = {
  YES: "YES",
  NO: "NO",
} as const;

const attendingSchema = z.object({
  [ATTENDING]: z.enum(Object.values(attendingValues)),
  [GUEST]: z.coerce.number(),
  [EVENT]: z.coerce.number(),
});

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const event = attendingSchema.parse(Object.fromEntries(formData.entries()));

  await updateGuestAttendance(context.cloudflare.db, event);

  return null;
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const guestName = await getUserSession(request);

  if (!guestName) {
    throw redirect("/rsvp/search");
  }

  const db = context.cloudflare.db;

  const guest = await getPrimaryGuestByFullName(db, guestName);
  const party = await getPartyBytGuestId(db, guest.partyId!); // TODO: Handle case where partyId is null
  const attendance = await getEventAttendanceByGuestIds(
    db,
    party.sort((a) => (a.id === guest.id ? -1 : 1)).map((p) => p.id)
  );

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
          className="bg-stone-100 border-3 border-double w-full max-w-[50ch] p-fluid-sm font-handwritten"
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
          className="grid gap-fluid-sm bg-stone-100 border-3 border-double w-full max-w-[50ch] p-fluid-sm font-light"
        >
          <div>
            <h3 className="text-fluid-xl">{event.name}</h3>
            <div className="text-fluid-sm italic font-extralight">
              {new Date(event.timestamp).toLocaleString()}
            </div>
            <div className="text-fluid-sm italic font-extralight">
              {event.location}
            </div>
          </div>
          <ul>
            {event.attendance.map((guest) => (
              <li key={guest.id} className="font-handwritten flex gap-fluid-md">
                <eventsFetcher.Form
                  className="contents"
                  method="POST"
                  onChange={(event) => {
                    eventsFetcher.submit(event.currentTarget);
                  }}
                >
                  <label className="select-none mr-auto">
                    {guest.fullName}
                    {/* <select
                      aria-label="Select attendance status"
                      name={ATTENDING}
                      defaultValue={guest.attending}
                      className="w-full text-wrap"
                    >
                      <option disabled value="UNKNOWN">
                        Is {guest.fullName} attending?
                      </option>
                      <option value={attendingValues.YES}>{guest.fullName} is attending</option>
                      <option value={attendingValues.NO}>{guest.fullName} is NOT attending</option>
                    </select> */}
                  </label>
                  <label className="flex gap-fluid-2xs items-center">
                    <input
                      type="radio"
                      radioGroup="attendance"
                      name={ATTENDING}
                      value={attendingValues.YES}
                      defaultChecked={guest.attending === "YES" ? true : undefined}
                    />
                    Yes
                  </label>
                  <label className="flex gap-fluid-2xs items-center">
                    <input
                      type="radio"
                      radioGroup="attendance"
                      name={ATTENDING}
                      value={attendingValues.NO}
                      defaultChecked={guest.attending === "NO" ? true : undefined}
                    />
                    No
                  </label>
                  <input
                    className="hidden"
                    aria-hidden
                    readOnly
                    name={GUEST}
                    value={guest.id}
                  />
                  <input
                    className="hidden"
                    aria-hidden
                    readOnly
                    name={EVENT}
                    value={event.id}
                  />
                </eventsFetcher.Form>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
