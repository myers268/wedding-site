import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

// This will be injected by Cloudflare Workers environment
export function createDb(d1Database: D1Database) {
  return drizzle(d1Database, { schema });
}

// Type for the database instance
export type Database = ReturnType<typeof createDb>;

// Utility functions for seeding data
export async function seedEvents(db: Database) {
  const existingEvents = await db.select().from(schema.events);

  if (existingEvents.length === 0) {
    await db
      .insert(schema.events)
      .values([
        { name: "Wedding" },
        { name: "Indiana Wedding Shower" },
        { name: "Washington Wedding Shower" },
      ]);
  }
}

export async function seedGuests(db: Database) {
  const existingGuests = await db.select().from(schema.guests);

  if (existingGuests.length === 0) {
    // Insert primary guests
    const [colby] = await db
      .insert(schema.guests)
      .values({
        fullName: "Colby Zarger",
        isPrimary: true,
      })
      .returning();

    const [phil] = await db
      .insert(schema.guests)
      .values({
        fullName: "Phil Shaheen",
        isPrimary: true,
      })
      .returning();

    // Insert additional guest for Colby
    await db.insert(schema.guests).values({
      fullName: "Sally Tucker",
      isPrimary: false,
      primaryGuestId: colby.id,
    });

    // Create default attendance records for all events
    const events = await db.select().from(schema.events);
    const guests = await db.select().from(schema.guests);

    const attendanceRecords = [];
    for (const guest of guests) {
      for (const event of events) {
        attendanceRecords.push({
          guestId: guest.id,
          eventId: event.id,
          attending: false,
        });
      }
    }

    await db.insert(schema.eventAttendance).values(attendanceRecords);
  }
}
