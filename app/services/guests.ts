import { eq, inArray } from "drizzle-orm";
import type { Database } from "#db/index";
import * as schema from "#db/schema";

// export type Guest = {
//   fullName: string,
//   attendance: EventAttendance[]
// }

// export type EventAttendance = {
//   event: Event;
//   attending: boolean;
// }

// export type Event = {
//   name: string;
//   location: string;
//   timestamp: number,
//   description: string;
// }

// export type PrimaryGuest = Guest & {
//   additionalGuests: {
//     count: number,
//     guests: Guest[]
//   }
// }

export interface GuestNotFoundError {
  name: "guest_not_found",
  message: "Guest not found.",
}

export class GuestNotFoundError extends Error {
  constructor() {
    super();
    this.name = "guest_not_found";
    this.message = "Guest not found."
  }
}

export async function getGuestByFullName(db: Database, name: string) {
  const primaryGuest = await db
    .select()
    .from(schema.guest)
    .where(eq(schema.guest.fullName, name))
    .limit(1);

  if (primaryGuest.length === 0) {
    throw new GuestNotFoundError();
  }

  const guest = primaryGuest[0];

  if (!guest.isPrimary) {
    throw new GuestNotFoundError();
  }

  return guest;
}

export async function getPartyByPrimaryGuestId(db: Database, guestId: number) {
  const party = await db
    .select()
    .from(schema.guest)
    .where(eq(schema.guest.primaryGuestId, guestId));

  return party;
}

type EventAttendanceWithGuests = {
  id: number;
  name: string;
  location: string;
  timestamp: number;
  description: string;
  attendance: {
    id: number;
    fullName: string;
    attending: boolean;
  }[];
}

export async function getEventAttendanceByGuestIds(db: Database, guestIds: number[]): Promise<EventAttendanceWithGuests[]> {
  const events = await db.select().from(schema.event);
  const attendanceRecords = await db
    .select()
    .from(schema.eventAttendance)
    .where(inArray(schema.eventAttendance.guestId, guestIds))
    .innerJoin(
      schema.guest,
      eq(schema.eventAttendance.guestId, schema.guest.id)
    );

  const attendanceMap: Record<number, EventAttendanceWithGuests> = {};

  for (const event of events) {
    attendanceMap[event.id] = {
      id: event.id,
      name: event.name,
      location: event.location,
      timestamp: event.timestamp,
      description: event.description,
      attendance: [],
    };
  }

  for (const record of attendanceRecords) {
    const eventAttendance = attendanceMap[record.event_attendance.eventId];
    if (eventAttendance) {
      eventAttendance.attendance.push({
        id: record.guest.id,
        fullName: record.guest.fullName,
        attending: record.event_attendance.attending,
      });
    }
  }

  return Object.values(attendanceMap);
}
