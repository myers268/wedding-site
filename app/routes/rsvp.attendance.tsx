import confetti from "canvas-confetti";
import { redirect, useFetcher, type AppLoadContext } from "react-router";
import { toast } from "sonner";
import type { Route } from "./+types/rsvp.attendance";

import {
  getEventAttendanceByGuestIds,
  getPrimaryGuestByFullName,
  getPartyByGuestId,
  updateGuestAttendance,
  writeSingleGuest,
} from "#services/guests";
import { getUserSession } from "#services/session";
import { z } from "zod/v4";
import { EVENTS } from "../db";

const attendingValues = {
  YES: "YES",
  NO: "NO",
} as const;

const attendanceDataSchema = z.object({
  guestId: z.coerce.number(),
  eventId: z.coerce.number(),
  attending: z.enum(Object.values(attendingValues)),
});

function* parseAttendanceUpdates(formData: FormData) {
  for (const [key, attending] of formData.entries()) {
    if (key.includes("_")) {
      const [guestId, eventId] = key.split("_");
      const parsedUpdate = attendanceDataSchema.parse({
        guestId,
        eventId,
        attending,
      });
      yield parsedUpdate;
    }
  }
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const db = context.cloudflare.db;

  for (const update of parseAttendanceUpdates(formData)) {
    await updateGuestAttendance(db, update);
  }

  return null;
}

export async function clientAction({ serverAction }: Route.ClientActionArgs) {
  await serverAction();
  toast("RSVP updated!");
  await confetti({
    origin: { y: 0.9 },
  });
}

async function getGuest(
  request: Request<unknown, CfProperties<unknown>>,
  db: AppLoadContext["cloudflare"]["db"]
) {
  const name = new URL(request.url).searchParams.get("name");

  if (name !== null) {
    const guest = await getPrimaryGuestByFullName(db, name).catch(async () => {
      const { guest } = await writeSingleGuest(db, name, [
        EVENTS.INDIANA_SHOWER,
        EVENTS.WASHINGTON_SHOWER,
      ]);
      return guest;
    });
    return guest;
  }

  const guestName = await getUserSession(request);

  if (!guestName) {
    throw redirect("/rsvp/search");
  }

  const guest = await getPrimaryGuestByFullName(db, guestName);
  return guest;
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const db = context.cloudflare.db;

  const guest = await getGuest(request, db);

  const party = await getPartyByGuestId(db, guest.partyId!); // TODO: Handle case where partyId is null
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
      <div className="relative isolate mt-fluid-sm">
        <div className="-z-10 absolute inset-0 blob-2 bg-rust-300/35 -scale-[210%] translate-x-8" />
        <div className="-z-10 absolute inset-0 blob-3 bg-sage-300/60 -scale-200" />
        <h2 className="text-fluid-3xl/(--spacing-fluid-3xl) font-cursive flex justify-center z-10">
          Guests
        </h2>
      </div>
      {loaderData.party.map((guest) => (
        <div
          key={guest.fullName}
          className="bg-stone-100 border-3 border-double w-full max-w-[40rem] p-fluid-sm font-handwritten"
        >
          {guest.fullName ?? "Guest"}
        </div>
      ))}
      <div className="relative isolate">
        <div className="-z-10 absolute inset-0 blob-3 bg-rust-300/35 scale-[210%]" />
        <div className="-z-10 absolute inset-0 blob-2 bg-sage-300/60 scale-[250%] -translate-x-6 translate-y-4" />
        <h2 className="text-fluid-3xl/(--spacing-fluid-3xl) font-cursive flex justify-center z-10">
          Events
        </h2>
      </div>
      <eventsFetcher.Form method="POST" className="contents">
        {loaderData.attendance.map((event) => (
          <div
            key={event.name}
            className="grid gap-fluid-sm bg-stone-100 border-3 border-double w-full max-w-[40rem] p-fluid-sm font-light"
          >
            <div>
              <h3 className="text-fluid-xl">{event.name}</h3>
              <div className="text-fluid-sm italic font-light sm:font-extralight">
                {event.description}
              </div>
              <div className="text-fluid-sm italic font-light sm:font-extralight">
                {event.location}
              </div>
              <div className="text-fluid-sm italic font-light sm:font-extralight">
                {new Date(event.timestamp).toLocaleString("en-US", {
                  dateStyle: "full",
                  timeStyle: "short",
                  timeZone: "America/New_York",
                })}
              </div>
            </div>
            <ul className="min-w-0 w-full overflow-auto grid gap-2">
              {event.attendance.map((guest) => (
                <li
                  key={guest.id}
                  className="font-handwritten flex gap-fluid-md select-none"
                >
                  <span className="break-words min-w-0 mr-auto">
                    {guest.fullName ?? "Guest"}
                  </span>
                  <label className="group flex gap-fluid-2xs items-center">
                    <input
                      type="radio"
                      name={`${guest.id}_${event.id}`}
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
                      name={`${guest.id}_${event.id}`}
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
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button
          type="submit"
          className="w-full max-w-[40rem] p-fluid-sm bg-sage-500 text-white font-light text-fluid-lg border-3 border-double"
          disabled={eventsFetcher.state !== "idle"}
        >
          Submit
        </button>
      </eventsFetcher.Form>
    </>
  );
}
