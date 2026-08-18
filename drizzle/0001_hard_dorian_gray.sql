CREATE TABLE `partner_leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`office` varchar(180) NOT NULL,
	`email` varchar(320) NOT NULL,
	`whatsapp` varchar(32) NOT NULL,
	`bottleneck` varchar(64) NOT NULL,
	`status` enum('new','contacted','qualified') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `partner_leads_id` PRIMARY KEY(`id`)
);
