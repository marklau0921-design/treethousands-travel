CREATE TABLE IF NOT EXISTS `explore_sections` (
  `id` int AUTO_INCREMENT NOT NULL,
  `slug` varchar(100) NOT NULL,
  `title` varchar(300) NOT NULL,
  `pageContent` json,
  `isVisible` boolean NOT NULL DEFAULT true,
  `sortOrder` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `explore_sections_slug_unique` (`slug`)
);
