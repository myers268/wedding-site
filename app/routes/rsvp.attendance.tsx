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
          <ul className="min-w-0 w-full overflow-auto grid gap-2">
            {event.attendance.map((guest) => (
              <li
                key={guest.id}
                className="font-handwritten flex gap-fluid-md select-none"
              >
                <eventsFetcher.Form
                  className="contents"
                  method="POST"
                  onChange={(event) => {
                    eventsFetcher.submit(event.currentTarget);
                  }}
                >
                  <span className="break-words min-w-0 mr-auto">
                    {guest.fullName}
                  </span>
                  <label className="group flex gap-fluid-2xs items-center">
                    <input
                      type="radio"
                      radioGroup="attendance"
                      name={ATTENDING}
                      value={attendingValues.YES}
                      defaultChecked={
                        guest.attending === "YES" ? true : undefined
                      }
                      className="sr-only"
                    />
                    <div className="w-5 h-5 border-sage-500 border-3 border-double bg-white group-hover:border-sage-700 transition-colors group-has-[*:focus-visible]:ring-2 ring-sage-500">
                      <svg
                        className="w-full h-full stroke-sage-700 opacity-0 group-has-[:checked]:opacity-100 transition-opacity"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    Yes
                  </label>
                  <label className="group flex gap-fluid-2xs items-center">
                    <input
                      type="radio"
                      radioGroup="attendance"
                      name={ATTENDING}
                      value={attendingValues.NO}
                      defaultChecked={
                        guest.attending === "NO" ? true : undefined
                      }
                      className="sr-only"
                    />
                    <div className="w-5 h-5 border-sage-500 border-3 border-double bg-white group-hover:border-sage-700 transition-colors group-has-[*:focus-visible]:ring-2 ring-sage-500">
                      <svg
                        className="w-full h-full stroke-rust-300 opacity-0 group-has-[:checked]:opacity-100 transition-opacity"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 3L11 11M11 3L3 11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
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
