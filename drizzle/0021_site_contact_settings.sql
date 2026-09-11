CREATE TABLE IF NOT EXISTS `site_contact_settings` (
  `id` int NOT NULL,
  `email` varchar(320) NOT NULL DEFAULT '',
  `whatsappNumber` varchar(40) NOT NULL DEFAULT '',
  `emailBackgroundColor` varchar(32) NOT NULL DEFAULT '#f5f1e8',
  `emailTextColor` varchar(32) NOT NULL DEFAULT '#17251f',
  `whatsappBackgroundColor` varchar(32) NOT NULL DEFAULT '#e5ddce',
  `whatsappTextColor` varchar(32) NOT NULL DEFAULT '#17251f',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
