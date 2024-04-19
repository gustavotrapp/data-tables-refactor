-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `tema` (
	`id` text PRIMARY KEY NOT NULL,
	`nome` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `subtema` (
	`id` text PRIMARY KEY NOT NULL,
	`nome` text NOT NULL,
	`temaId` text NOT NULL,
	FOREIGN KEY (`temaId`) REFERENCES `tema`(`id`) ON UPDATE cascade ON DELETE restrict
);

*/