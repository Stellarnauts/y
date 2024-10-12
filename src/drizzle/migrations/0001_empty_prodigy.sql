PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_yeets` (
	`id` text PRIMARY KEY NOT NULL,
	`hash` text NOT NULL,
	`message` text NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_yeets`("id", "hash", "message", "created_by", "created_at") SELECT "id", "hash", "message", "created_by", "created_at" FROM `yeets`;--> statement-breakpoint
DROP TABLE `yeets`;--> statement-breakpoint
ALTER TABLE `__new_yeets` RENAME TO `yeets`;--> statement-breakpoint
PRAGMA foreign_keys=ON;