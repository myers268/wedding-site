PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_event_attendance` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`guest_id` integer NOT NULL,
	`event_id` integer NOT NULL,
	`attending` text DEFAULT 'UNKNOWN' NOT NULL,
	CONSTRAINT "attending_enum" CHECK(attending IN ('UNKNOWN', 'YES', 'NO'))
);
--> statement-breakpoint
INSERT INTO `__new_event_attendance`("id", "guest_id", "event_id", "attending") SELECT "id", "guest_id", "event_id", CASE WHEN "attending" = 'DEFAULT' THEN 'UNKNOWN' ELSE "attending" END FROM `event_attendance`;--> statement-breakpoint
DROP TABLE `event_attendance`;--> statement-breakpoint
ALTER TABLE `__new_event_attendance` RENAME TO `event_attendance`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `idx_attendance_guest` ON `event_attendance` (`guest_id`);--> statement-breakpoint
CREATE INDEX `idx_attendance_event` ON `event_attendance` (`event_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_guest_event_attendance` ON `event_attendance` (`guest_id`,`event_id`);