ALTER TABLE `stories` ADD COLUMN `pageContent` json;
CREATE TABLE IF NOT EXISTS `story_detail_seed_state` (
  `id` tinyint NOT NULL,
  `seededAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
