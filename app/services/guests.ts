import { and, eq, inArray, sql } from "drizzle-orm";
import type { Database } from "#db/index";
import * as schema from "#db/schema";
import { lower, type AttendanceStatus } from "#db/schema";

export interface GuestNotFoundError {
  name: "guest_not_found";
  message: "Guest not found.";
}

export class GuestNotFoundError extends Error {
  constructor() {
    super();
    this.name = "guest_not_found";
    this.message = "Guest not found.";
  }
}

export async function getPrimaryGuestByFullName(db: Database, name: string) {
  const primaryGuest = await db
    .select()
    .from(schema.guest)
    .where(
      and(eq(lower(schema.guest.fullName), name.trim().toLowerCase()), eq(schema.guest.isPrimary, true))
    )
    .limit(1);

  if (primaryGuest.length === 0) {
    throw new GuestNotFoundError();
  }

  const guest = primaryGuest[0];

  return guest;
}

export async function getPartyByGuestId(db: Database, partyId: number) {
  const party = await db
    .select()
    .from(schema.guest)
    .where(
      eq(schema.guest.partyId, partyId)
    );

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
    fullName: string | null;
    attending: AttendanceStatus;
  }[];
};

export async function getEventAttendanceByGuestIds(
  db: Database,
  guestIds: number[]
): Promise<EventAttendanceWithGuests[]> {
  const attendanceRecords = await db
    .select()
    .from(schema.eventAttendance)
    .where(inArray(schema.eventAttendance.guestId, guestIds))
    .innerJoin(
      schema.guest,
      eq(schema.eventAttendance.guestId, schema.guest.id)
    )
    .innerJoin(
      schema.event,
      eq(schema.eventAttendance.eventId, schema.event.id)
    );

  const attendanceMap: Record<number, EventAttendanceWithGuests> = {};

  for (const record of attendanceRecords) {
    if (!attendanceMap[record.event.id]) {
      attendanceMap[record.event.id] = {
        id: record.event.id,
        name: record.event.name,
        location: record.event.location,
        timestamp: record.event.timestamp,
        description: record.event.description,
        attendance: [],
      };
    }

    attendanceMap[record.event.id].attendance.push({
      id: record.guest.id,
      fullName: record.guest.fullName,
      attending: record.event_attendance.attending as AttendanceStatus,
    });
  }

  return Object.values(attendanceMap);
}

type UpdateAttendance = {
  guestId: number;
  eventId: number;
  attending: AttendanceStatus;
};

export async function updateGuestAttendance(
  db: Database,
  update: UpdateAttendance
) {
  await db
    .insert(schema.eventAttendance)
    .values(update)
    .onConflictDoUpdate({
      target: [schema.eventAttendance.guestId, schema.eventAttendance.eventId],
      set: { attending: update.attending },
    });
}

export async function searchGuestsByName(db: Database, searchTerm: string) {
  if (!searchTerm.trim()) {
    return [];
  }

  const results = await db
    .select({
      id: schema.guest.id,
      fullName: schema.guest.fullName,
      isPrimary: schema.guest.isPrimary,
      partyId: schema.guest.partyId,
      rank: sql<number>`rank`
    })
    .from(sql`guest_fts`)
    .innerJoin(schema.guest, sql`guest.id = guest_fts.rowid`)
    .where(
      and(sql`guest_fts MATCH ${searchTerm}`, eq(schema.guest.isPrimary, true))
    )
    .orderBy(sql`rank`)
    .limit(4);

  return results;
}

export async function writeSingleGuest(
  db: Database,
  name: string,
  events: string[]
) {
  // Create a new party with the provided name
  const [newParty] = await db
    .insert(schema.party)
    .values({ name })
    .returning();

  // Create a new guest with the provided name, linked to the party
  const [newGuest] = await db
    .insert(schema.guest)
    .values({
      fullName: name,
      isPrimary: true,
      isKid: false,
      partyId: newParty.id,
      userEntered: true,
    })
    .returning();

  // Get the events by name
  const eventRecords = await db
    .select()
    .from(schema.event)
    .where(inArray(schema.event.name, events));

  // Create attendance records for each event
  const attendanceValues = eventRecords.map(event => ({
    guestId: newGuest.id,
    eventId: event.id,
    attending: "UNKNOWN" as AttendanceStatus,
  }));

  if (attendanceValues.length > 0) {
    await db
      .insert(schema.eventAttendance)
      .values(attendanceValues);
  }

  return { party: newParty, guest: newGuest };
}
