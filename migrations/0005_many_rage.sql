CREATE TABLE `party` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_guest` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text,
	`is_primary` integer DEFAULT true NOT NULL,
	`is_kid` integer DEFAULT false NOT NULL,
	`party_id` integer
);
--> statement-breakpoint
INSERT INTO `__new_guest`("id", "full_name", "is_primary", "is_kid", "party_id") SELECT "id", "full_name", "is_primary", "is_kid", "party_id" FROM `guest`;--> statement-breakpoint
DROP TABLE `guest`;--> statement-breakpoint
ALTER TABLE `__new_guest` RENAME TO `guest`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `guest_full_name_unique` ON `guest` (`full_name`);--> statement-breakpoint
CREATE INDEX `idx_guest_party` ON `guest` (`party_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_guest_fullname` ON `guest` (lower(full_name));