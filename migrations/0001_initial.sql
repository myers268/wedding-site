CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `guests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`is_primary` integer DEFAULT true NOT NULL,
	`primary_guest_id` integer
);
--> statement-breakpoint
CREATE TABLE `event_attendance` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`guest_id` integer NOT NULL,
	`event_id` integer NOT NULL,
	`attending` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_guest_primary` ON `guests` (`primary_guest_id`);
--> statement-breakpoint
CREATE INDEX `idx_attendance_guest` ON `event_attendance` (`guest_id`);
--> statement-breakpoint
CREATE INDEX `idx_attendance_event` ON `event_attendance` (`event_id`);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_guest_event_attendance` ON `event_attendance` (`guest_id`, `event_id`);
