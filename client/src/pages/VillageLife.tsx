import ExploreTemplate, { type ExploreTemplateContent } from '@/components/ExploreTemplate';

const villageLife: ExploreTemplateContent = {
  slug: 'village-life',
  title: 'Village Life',
  heroText: 'Small moments, everyday rhythms, and the people who make rural China feel alive.',
  introduction: 'Beyond the map, village life is shaped by familiar paths, open doors, seasonal work, and the quiet rituals of each day. We look closely—not for spectacle, but for the warmth and meaning found in ordinary moments.',
  statement: 'The places we remember are often made of ordinary moments.',
  visualNotes: [
    'A village reveals itself gradually: in footsteps at first light, a meal prepared without hurry, and neighbours stopping to exchange a few words.',
    'These moments are small, but together they form the character of a place—and the feeling of being welcomed into it.',
  ],
  details: ['Animals', 'Flowers', 'Doors', 'Roofs', 'Paths', 'Daily Objects'],
  perspectives: [
    { title: 'Everyday Moments', description: 'The gestures, routines, and pauses that give each day its shape.', href: '/stories/local-life' },
    { title: 'People', description: 'Portraits of the people who hold local knowledge, memory, and humour.', href: '/explore/people-culture' },
    { title: 'Local Details', description: 'The textures and objects that make a place quietly distinctive.', href: '/stories/village-notes' },
  ],
  cta: { label: 'Explore More Stories', href: '/stories' },
  fallbackImages: [
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1900&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1500&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1000&h=1400&fit=crop',
    'https://images.unsplash.com/photo-1511497584788-876760111969?w=1000&h=1400&fit=crop',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1300&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&h=1300&fit=crop',
  ],
};

export default function VillageLife() {
  return <ExploreTemplate content={villageLife} />;
}
