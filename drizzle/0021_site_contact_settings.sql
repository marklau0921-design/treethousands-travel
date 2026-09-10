CREATE TABLE IF NOT EXISTS `site_contact_settings` (
  `id` int NOT NULL,
  `email` varchar(320) NOT NULL DEFAULT '',
  `whatsappNumber` varchar(40) NOT NULL DEFAULT '',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
