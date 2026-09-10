CREATE TABLE IF NOT EXISTS `homepage_sections` (
  `id` int AUTO_INCREMENT NOT NULL,
  `sectionKey` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `isVisible` boolean NOT NULL DEFAULT true,
  `sortOrder` int NOT NULL DEFAULT 0,
  `content` json,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `homepage_sections_sectionKey_unique` (`sectionKey`)
);
