export interface ExploreLinkCard { title: string; description: string; href: string; image: string }
export interface ExploreStoryCard { category: string; title: string; href: string; image: string }
export interface ExploreDetailCard { title: string; image: string }

export interface ExplorePageContent {
  hero: { eyebrow: string; title: string; subtitle: string; image: string; backgroundColor: string; overlayOpacity: number };
  introduction: { eyebrow: string; text: string; backgroundColor: string; textColor: string };
  visual: { eyebrow: string; title: string; paragraphs: string[]; images: string[]; backgroundColor: string };
  details: { eyebrow: string; title: string; description: string; backgroundColor: string; items: ExploreDetailCard[] };
  statement: { eyebrow: string; text: string; backgroundColor: string; textColor: string };
  perspectives: { eyebrow: string; backgroundColor: string; items: ExploreLinkCard[] };
  stories: { eyebrow: string; title: string; viewAllLabel: string; viewAllHref: string; backgroundColor: string; items: ExploreStoryCard[] };
  cta: { eyebrow: string; title: string; buttonLabel: string; buttonHref: string; backgroundColor: string; textColor: string; buttonBackgroundColor: string; buttonTextColor: string; textureImage: string; textureOpacity: number };
}

const images = [
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1900&h=1200&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1500&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1000&h=1400&fit=crop',
  'https://images.unsplash.com/photo-1511497584788-876760111969?w=1000&h=1400&fit=crop',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1300&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&h=1300&fit=crop',
];

const PAGE_COPY: Record<string, { title: string; subtitle: string; introduction: string; statement: string; details: string[] }> = {
  'village-life': {
    title: 'Village Life', subtitle: 'Small moments, everyday rhythms, and the people who make rural China feel alive.',
    introduction: 'Beyond the map, village life is shaped by familiar paths, open doors, seasonal work, and the quiet rituals of each day. We look closely—not for spectacle, but for the warmth and meaning found in ordinary moments.',
    statement: 'The places we remember are often made of ordinary moments.', details: ['Animals', 'Flowers', 'Doors', 'Roofs', 'Paths', 'Daily Objects'],
  },
  'nature-landscape': {
    title: 'Nature & Landscape', subtitle: 'Mountains, rivers, forests, and fields that shape both the journey and everyday life.',
    introduction: 'The landscapes of rural China are never simply a backdrop. They guide the seasons, shape local livelihoods, and hold generations of memory. We travel slowly enough to notice how people and place belong to one another.',
    statement: 'A landscape becomes a story when we understand how people live within it.', details: ['Mountains', 'Rivers', 'Forests', 'Fields', 'Seasons', 'Wildlife'],
  },
  'people-culture': {
    title: 'People & Culture', subtitle: 'Living traditions, shared knowledge, and the people who carry them forward.',
    introduction: 'Culture lives in people: in the way a meal is prepared, a craft is taught, a story is remembered, or a guest is welcomed. We meet communities with curiosity and respect, making space for their own voices and perspectives.',
    statement: 'The richest cultural encounters begin with time, trust, and listening.', details: ['People', 'Craft', 'Food', 'Ritual', 'Music', 'Memory'],
  },
};

export const defaultExploreSlugs = ['village-life', 'nature-landscape', 'people-culture'];

export function createDefaultExplorePage(slug: string): ExplorePageContent {
  const copy = PAGE_COPY[slug] ?? PAGE_COPY['village-life'];
  return {
    hero: { eyebrow: 'Explore', title: copy.title, subtitle: copy.subtitle, image: images[0], backgroundColor: '#17352d', overlayOpacity: 58 },
    introduction: { eyebrow: `Explore / ${copy.title}`, text: copy.introduction, backgroundColor: '#f5f1e8', textColor: '#17251f' },
    visual: { eyebrow: 'A closer look', title: 'Life happens between the landmarks.', paragraphs: ['A place reveals itself gradually: in footsteps at first light, a meal prepared without hurry, and neighbours stopping to exchange a few words.', 'These moments are small, but together they form the character of a place—and the feeling of being welcomed into it.'], images: [images[1], images[2], images[3]], backgroundColor: '#f5f1e8' },
    details: { eyebrow: 'Moments / Details', title: 'The small things', description: 'Fragments of daily life, noticed slowly and remembered long after.', backgroundColor: '#e5ddce', items: copy.details.map((title, index) => ({ title, image: images[(index + 1) % images.length] })) },
    statement: { eyebrow: 'A way of seeing', text: copy.statement, backgroundColor: '#17352d', textColor: '#f5f1e8' },
    perspectives: { eyebrow: 'Related Perspectives', backgroundColor: '#f7f3eb', items: [
      { title: 'Everyday Moments', description: 'The gestures, routines, and pauses that give each day its shape.', href: '/stories/local-life', image: images[2] },
      { title: 'People', description: 'Portraits of the people who hold local knowledge, memory, and humour.', href: '/explore/people-culture', image: images[3] },
      { title: 'Local Details', description: 'The textures and objects that make a place quietly distinctive.', href: '/stories/village-notes', image: images[4] },
    ] },
    stories: { eyebrow: 'From the journal', title: 'Related Stories', viewAllLabel: 'View all stories →', viewAllHref: '/stories', backgroundColor: '#ffffff', items: [
      { category: 'Village Notes', title: 'Morning begins before the village wakes', href: '/stories', image: images[1] },
      { category: 'Local Life', title: 'What a shared table can tell us', href: '/stories', image: images[4] },
      { category: 'Journal', title: 'Following the path home', href: '/stories', image: images[5] },
    ] },
    cta: { eyebrow: 'Continue the journey', title: 'There is always another side to discover.', buttonLabel: 'Explore More Stories', buttonHref: '/stories', backgroundColor: '#a16140', textColor: '#ffffff', buttonBackgroundColor: '#111111', buttonTextColor: '#ffffff', textureImage: '', textureOpacity: 25 },
  };
}

export function normalizeExplorePage(value: unknown, slug: string): ExplorePageContent {
  const defaults = createDefaultExplorePage(slug);
  if (typeof value === 'string') { try { value = JSON.parse(value); } catch { return defaults; } }
  if (!value || typeof value !== 'object') return defaults;
  const page = value as Partial<ExplorePageContent>;
  return {
    hero: { ...defaults.hero, ...(page.hero ?? {}) },
    introduction: { ...defaults.introduction, ...(page.introduction ?? {}) },
    visual: { ...defaults.visual, ...(page.visual ?? {}), paragraphs: page.visual?.paragraphs ?? defaults.visual.paragraphs, images: page.visual?.images ?? defaults.visual.images },
    details: { ...defaults.details, ...(page.details ?? {}), items: page.details?.items?.length ? page.details.items : defaults.details.items },
    statement: { ...defaults.statement, ...(page.statement ?? {}) },
    perspectives: { ...defaults.perspectives, ...(page.perspectives ?? {}), items: page.perspectives?.items?.length ? page.perspectives.items : defaults.perspectives.items },
    stories: { ...defaults.stories, ...(page.stories ?? {}), items: page.stories?.items?.length ? page.stories.items : defaults.stories.items },
    cta: { ...defaults.cta, ...(page.cta ?? {}) },
  };
}

export const defaultExploreSections = defaultExploreSlugs.map((slug, sortOrder) => ({ slug, title: PAGE_COPY[slug].title, pageContent: createDefaultExplorePage(slug), isVisible: true, sortOrder }));
