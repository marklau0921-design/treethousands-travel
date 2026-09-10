export interface OurStoryPillar {
  title: string;
  text: string;
  image: string;
}

export interface OurStoryPageContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: string;
  };
  introduction: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    image: string;
    backgroundColor: string;
  };
  quote: {
    eyebrow: string;
    quote: string;
    body: string;
    image: string;
    backgroundColor: string;
  };
  pillars: {
    eyebrow: string;
    title: string;
    intro: string;
    backgroundColor: string;
    items: OurStoryPillar[];
  };
  closing: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    image: string;
    backgroundColor: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    buttonLabel: string;
    buttonHref: string;
    backgroundColor: string;
    textColor: string;
    buttonBackgroundColor: string;
    buttonTextColor: string;
    textureImage: string;
    textureOpacity: number;
  };
  recommendations: {
    eyebrow: string;
    title: string;
    description: string;
    backgroundColor: string;
  };
}

const fallbackImages = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1800&h=1200&fit=crop',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1400&h=1200&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=1200&fit=crop',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1400&h=1200&fit=crop',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1400&h=1200&fit=crop',
  'https://images.unsplash.com/photo-1511497584788-876760111969?w=1400&h=1200&fit=crop',
];

export function createDefaultOurStoryPage(title: string, summary: string, image = ''): OurStoryPageContent {
  const isOriginal = title === 'Why We Started';
  return {
    hero: {
      eyebrow: isOriginal ? 'The beginning of TreeThousands' : 'The TreeThousands story',
      title,
      subtitle: isOriginal ? 'To share a China found not only in places, but in people, memory, and everyday life.' : summary,
      image: image || fallbackImages[0],
    },
    introduction: {
      eyebrow: isOriginal ? '01 — The Thought Behind Tree Thousands' : `01 — ${title}`,
      title: isOriginal ? 'Another side of China was waiting to be seen.' : `A closer look at ${title.toLowerCase()}.`,
      paragraphs: isOriginal
        ? ['China is often introduced through its great cities and celebrated landmarks. They are part of the story—but never the whole story.', 'We started TreeThousands to look beyond the familiar. Toward village lanes, family kitchens, mountain paths, local workshops, and conversations that cannot be scheduled into a conventional tour.']
        : [summary, 'We approach each journey with time, curiosity, and respect for the people and places that welcome us.'],
      image: fallbackImages[1],
      backgroundColor: '#ebe5d9',
    },
    quote: {
      eyebrow: '02 — More Than a Destination',
      quote: isOriginal ? 'A place becomes meaningful when someone shares their story with you.' : 'The most meaningful journeys begin by listening.',
      body: isOriginal ? 'For us, travel is not a checklist of destinations. It is an exchange—between visitor and host, landscape and memory, curiosity and understanding.' : summary,
      image: fallbackImages[2],
      backgroundColor: '#17352d',
    },
    pillars: {
      eyebrow: '03 — What We Want to Share',
      title: isOriginal ? 'The stories live in the details.' : 'The details shape the journey.',
      intro: 'Four threads guide the way we explore, listen, and tell stories about rural China.',
      backgroundColor: '#f7f3eb',
      items: [
        { title: 'Village', text: 'Places shaped by generations of memory, work, and belonging.', image: fallbackImages[3] },
        { title: 'People', text: 'The makers, farmers, hosts, and storytellers we meet along the way.', image: fallbackImages[4] },
        { title: 'Nature', text: 'Landscapes that invite us to slow down, listen, and look more closely.', image: fallbackImages[5] },
        { title: 'Culture', text: 'Living traditions found in food, craft, ritual, language, and daily life.', image: fallbackImages[1] },
      ],
    },
    closing: {
      eyebrow: '04 — Growing Together',
      title: isOriginal ? 'This is only the beginning.' : 'The story continues.',
      paragraphs: isOriginal
        ? ['TreeThousands is growing alongside the villages, communities, and local partners who make these stories possible.', 'Over time, more people, places, traditions, and experiences will become part of this living collection. We hope to grow carefully—with relationships first, and with value flowing back to the communities that welcome us.']
        : [summary, 'As TreeThousands grows, we want the people and places around us to grow with us.'],
      image: fallbackImages[0],
      backgroundColor: '#d8c5aa',
    },
    cta: {
      eyebrow: '',
      title: 'So, ready to start?',
      buttonLabel: 'Get in Touch',
      buttonHref: '/join-us',
      backgroundColor: '#a84900',
      textColor: '#ffffff',
      buttonBackgroundColor: '#111111',
      buttonTextColor: '#ffffff',
      textureImage: '',
      textureOpacity: 28,
    },
    recommendations: {
      eyebrow: 'Continue exploring',
      title: 'More of Our Story',
      description: 'Discover the ideas, people, and places that shape the way we travel.',
      backgroundColor: '#e8e1d5',
    },
  };
}

export function normalizeOurStoryPage(value: unknown, title: string, summary: string, image = ''): OurStoryPageContent {
  const defaults = createDefaultOurStoryPage(title, summary, image);
  if (typeof value === 'string') {
    try {
      value = JSON.parse(value);
    } catch {
      return defaults;
    }
  }
  if (!value || typeof value !== 'object') return defaults;
  const page = value as Partial<OurStoryPageContent>;
  return {
    hero: { ...defaults.hero, ...(page.hero ?? {}) },
    introduction: { ...defaults.introduction, ...(page.introduction ?? {}), paragraphs: page.introduction?.paragraphs ?? defaults.introduction.paragraphs },
    quote: { ...defaults.quote, ...(page.quote ?? {}) },
    pillars: { ...defaults.pillars, ...(page.pillars ?? {}), items: page.pillars?.items?.length ? page.pillars.items : defaults.pillars.items },
    closing: { ...defaults.closing, ...(page.closing ?? {}), paragraphs: page.closing?.paragraphs ?? defaults.closing.paragraphs },
    cta: { ...defaults.cta, ...(page.cta ?? {}) },
    recommendations: { ...defaults.recommendations, ...(page.recommendations ?? {}) },
  };
}
