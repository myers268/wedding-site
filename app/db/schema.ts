import {
  sqliteTable,
  text,
  integer,
  index,
  uniqueIndex,
  check,
} from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

// Enum values for attendance
export const ATTENDANCE_VALUES = ["UNKNOWN", "YES", "NO"] as const;
export type AttendanceStatus = (typeof ATTENDANCE_VALUES)[number];

// Events table
export const event = sqliteTable("event", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  location: text("location").notNull(),
  timestamp: integer("timestamp").notNull(),
  description: text("description").notNull(),
});

// Guests table (for both primary and additional guests)
export const guest = sqliteTable(
  "guest",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    fullName: text("full_name").notNull(),
    isPrimary: integer("is_primary", { mode: "boolean" })
      .notNull()
      .default(true),
    primaryGuestId: integer("primary_guest_id"),
  },
  (table) => [index("idx_guest_primary").on(table.primaryGuestId)]
);

// Event attendance junction table
export const eventAttendance = sqliteTable(
  "event_attendance",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    guestId: integer("guest_id").notNull(),
    eventId: integer("event_id").notNull(),
    attending: text("attending").notNull().default("UNKNOWN"),
  },
  (table) => [
    index("idx_attendance_guest").on(table.guestId),
    index("idx_attendance_event").on(table.eventId),
    uniqueIndex("idx_guest_event_attendance").on(table.guestId, table.eventId),
    check(
      "attending_enum",
      sql`attending IN (${sql.join(
        ATTENDANCE_VALUES.map((v) => sql`${v}`),
        sql`, `
      )})`
    ),
  ]
);

// Relations
export const eventsRelations = relations(event, ({ many }) => ({
  attendance: many(eventAttendance),
}));

export const guestsRelations = relations(guest, ({ one, many }) => ({
  primaryGuest: one(guest, {
    fields: [guest.primaryGuestId],
    references: [guest.id],
    relationName: "primaryGuest",
  }),
  additionalGuests: many(guest, {
    relationName: "primaryGuest",
  }),
  attendance: many(eventAttendance),
}));

export const eventAttendanceRelations = relations(
  eventAttendance,
  ({ one }) => ({
    guest: one(guest, {
      fields: [eventAttendance.guestId],
      references: [guest.id],
    }),
    event: one(event, {
      fields: [eventAttendance.eventId],
      references: [event.id],
    }),
  })
);

// Type exports for use in your application
export type Event = typeof event.$inferSelect;
export type NewEvent = typeof event.$inferInsert;

export type Guest = typeof guest.$inferSelect;
export type NewGuest = typeof guest.$inferInsert;

export type EventAttendance = typeof eventAttendance.$inferSelect;
export type NewEventAttendance = typeof eventAttendance.$inferInsert;
