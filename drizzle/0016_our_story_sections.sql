CREATE TABLE `our_story_sections` (
  `id` int AUTO_INCREMENT NOT NULL,
  `slug` varchar(100) NOT NULL,
  `eyebrow` varchar(200),
  `title` varchar(300) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(512),
  `ctaLabel` varchar(100) NOT NULL DEFAULT 'Discover More',
  `ctaBgColor` varchar(32) NOT NULL DEFAULT '#000000',
  `ctaTextColor` varchar(32) NOT NULL DEFAULT '#ffffff',
  `isVisible` boolean NOT NULL DEFAULT true,
  `sortOrder` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `our_story_sections_id` PRIMARY KEY(`id`),
  CONSTRAINT `our_story_sections_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
INSERT INTO `our_story_sections` (`slug`, `eyebrow`, `title`, `content`, `image`, `ctaLabel`, `ctaBgColor`, `ctaTextColor`, `isVisible`, `sortOrder`) VALUES
  ('why-we-started', 'Our Beginning', 'Why We Started', 'TreeThousands began with a simple belief: China is best understood slowly, through the people and places that give it life. We wanted to create journeys that move beyond familiar landmarks and make room for genuine encounters, shared meals, and stories that stay with you.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1354&h=900&fit=crop', 'Discover More', '#000000', '#ffffff', true, 0),
  ('what-we-believe', 'Our Values', 'What We Believe', 'We believe meaningful travel begins with curiosity and respect. A journey should feel personal rather than prescribed, connecting travelers with local culture while honoring the communities, traditions, and landscapes that welcome us.', 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1354&h=900&fit=crop', 'Discover More', '#000000', '#ffffff', true, 1),
  ('our-way-of-travel', 'Our Approach', 'Our Way of Travel', 'Our journeys are thoughtfully paced and shaped around real human connection. We listen first, travel in small and considered ways, and work with people who know their home deeply. The result is less about covering ground and more about experiencing a place with attention.', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1354&h=900&fit=crop', 'Discover More', '#000000', '#ffffff', true, 2),
  ('why-rural-china', 'Our Focus', 'Why Rural China', 'Beyond the cities is a China of mountain paths, working villages, living traditions, and extraordinary everyday knowledge. Rural China offers a different rhythm and perspective—one that reveals how culture, land, and community remain closely connected.', 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1354&h=900&fit=crop', 'Discover More', '#000000', '#ffffff', true, 3),
  ('growing-together', 'Our Commitment', 'Growing Together', 'Travel can create value in both directions. We aim to build long-term relationships with local partners, support community-led experiences, and keep learning from every journey. As TreeThousands grows, we want the people and places around us to grow with us.', 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1354&h=900&fit=crop', 'Discover More', '#000000', '#ffffff', true, 4);
