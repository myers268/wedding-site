import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function createDb(d1Database: D1Database) {
  return drizzle(d1Database, { schema });
}

export type Database = ReturnType<typeof createDb>;

// Utility functions for seeding data
export async function seedEvents(db: Database) {
  const existingEvents = await db.select().from(schema.event);

  if (existingEvents.length === 0) {
    await db
      .insert(schema.event)
      .values([
        {
          name: "Wedding",
          location: "123 Main St, Washington, D.C. 22201",
          timestamp: new Date(2026, 0, 2, 17, 30, 0).getTime(),
          description: "",
        },
        {
          name: "Indiana Wedding Shower",
          location: "456 Country Rd, Kokomo, IN 46902",
          timestamp: new Date(2025, 7, 9, 14, 0, 0).getTime(),
          description: "",
        },
        {
          name: "Washington Wedding Shower",
          location: "642 River Blvd, Longview, WA 99999",
          timestamp: new Date(2025, 11, 9, 16, 0, 0).getTime(),
          description: "",
        },
      ]);
  }
}

export async function seedGuests(db: Database) {
  const existingGuests = await db.select().from(schema.guest);

  if (existingGuests.length === 0) {
    // Insert primary guests
    const [colby] = await db
      .insert(schema.guest)
      .values({
        fullName: "Colby Zarger",
        isPrimary: true,
      })
      .returning();

    await db
      .insert(schema.guest)
      .values({
        fullName: "Phil Shaheen",
        isPrimary: true,
      });

    // Insert additional guest for Colby
    await db.insert(schema.guest).values({
      fullName: "Sally Tucker",
      isPrimary: false,
      primaryGuestId: colby.id,
    });

    // Create default attendance records for all events
    const events = await db.select().from(schema.event);
    const guests = await db.select().from(schema.guest);

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
