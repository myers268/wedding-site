CREATE TABLE `party` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text
);
--> statement-breakpoint
ALTER TABLE `guest` ADD `is_kid` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `guest` ADD `party_id` integer;--> statement-breakpoint
CREATE INDEX `idx_guest_party` ON `guest` (`party_id`);--> statement-breakpoint
DROP INDEX IF EXISTS `idx_guest_primary`;--> statement-breakpoint
ALTER TABLE `guest` DROP COLUMN `primary_guest_id`;