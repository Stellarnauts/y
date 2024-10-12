CREATE TABLE `yeets` (
	`id` text PRIMARY KEY NOT NULL,
	`message` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
