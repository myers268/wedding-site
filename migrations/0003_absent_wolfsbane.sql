CREATE UNIQUE INDEX `guest_full_name_unique` ON `guest` (`full_name`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_guest_fullname` ON `guest` (lower("full_name"));