import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// Events table
export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

// Guests table (for both primary and additional guests)
export const guests = sqliteTable("guests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  isPrimary: integer("is_primary", { mode: "boolean" }).notNull().default(true),
  primaryGuestId: integer("primary_guest_id"),
});

// Event attendance junction table
export const eventAttendance = sqliteTable("event_attendance", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  guestId: integer("guest_id").notNull(),
  eventId: integer("event_id").notNull(),
  attending: integer("attending", { mode: "boolean" }).notNull().default(false),
});

// Relations
export const eventsRelations = relations(events, ({ many }) => ({
  attendance: many(eventAttendance),
}));

export const guestsRelations = relations(guests, ({ one, many }) => ({
  primaryGuest: one(guests, {
    fields: [guests.primaryGuestId],
    references: [guests.id],
    relationName: "primaryGuest",
  }),
  additionalGuests: many(guests, {
    relationName: "primaryGuest",
  }),
  attendance: many(eventAttendance),
}));

export const eventAttendanceRelations = relations(
  eventAttendance,
  ({ one }) => ({
    guest: one(guests, {
      fields: [eventAttendance.guestId],
      references: [guests.id],
    }),
    event: one(events, {
      fields: [eventAttendance.eventId],
      references: [events.id],
    }),
  })
);

// Type exports for use in your application
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

export type Guest = typeof guests.$inferSelect;
export type NewGuest = typeof guests.$inferInsert;

export type EventAttendance = typeof eventAttendance.$inferSelect;
export type NewEventAttendance = typeof eventAttendance.$inferInsert;
