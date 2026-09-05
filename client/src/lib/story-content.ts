export const STORY_CATEGORIES = ['All Stories', 'Brand Stories', 'Village Notes', 'Local Life', 'Journal'] as const;
export type StoryCategory = Exclude<(typeof STORY_CATEGORIES)[number], 'All Stories'>;

export type EditorialStory = {
  id: number | string;
  slug: string;
  title: string;
  category: StoryCategory;
  date: string;
  location: string;
  excerpt: string;
  content: string;
  coverImage: string;
};

export const fallbackStories: EditorialStory[] = [
  {
    id: 'field-kitchen', slug: 'a-table-set-between-the-fields', title: 'A Table Set Between the Fields', category: 'Village Notes', date: '2026-07-18', location: 'Western Sichuan',
    excerpt: 'An afternoon meal, a family kitchen, and the quiet generosity that turns a stop along the road into a lasting memory.',
    coverImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1800&h=1200&fit=crop',
    content: `The road into the village narrowed beside the fields, then disappeared into a collection of stone paths and open courtyards.

We arrived without ceremony. A kettle was already warm, vegetables had just been brought in from the garden, and another chair was placed at the table as if it had always been waiting there.

> Hospitality is rarely announced. More often, it appears as an extra bowl, a shared story, and time made for a stranger.

The meal followed the landscape around us: greens from beside the house, preserved vegetables from the previous season, and rice served from a pot that seemed to belong at the centre of every conversation.

Nothing about the afternoon was arranged as a performance. That was precisely why it stayed with us.`,
  },
  {
    id: 'morning-path', slug: 'before-the-village-wakes', title: 'Before the Village Wakes', category: 'Local Life', date: '2026-06-29', location: 'Yunnan',
    excerpt: 'Following the first sounds of morning through lanes, courtyards, and fields at the edge of a mountain village.',
    coverImage: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1600&h=1200&fit=crop',
    content: `Morning begins softly here. A gate opens, water moves through a narrow channel, and footsteps pass beneath tiled roofs.

By the time the sun reaches the lower fields, the village is already in motion. Work and conversation overlap without hurry.

> To understand a place, begin with the hour before it expects to be seen.

We walk without a list, noticing how the ordinary routines of one morning reveal more than a hurried itinerary ever could.`,
  },
  {
    id: 'why-slowly', slug: 'why-we-travel-slowly', title: 'Why We Travel Slowly', category: 'Brand Stories', date: '2026-06-08', location: 'Tree Thousands Journal',
    excerpt: 'A note on attention, relationships, and why meaningful journeys need room for the unexpected.',
    coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1700&h=1100&fit=crop',
    content: `Slow travel is not simply about staying longer. It is about allowing a place to set the pace.

It leaves room for a conversation to continue, for weather to change a plan, and for curiosity to lead beyond the obvious route.

> The journey becomes richer when efficiency is no longer the only measure of a good day.

Tree Thousands began from this belief: that understanding grows through attention, and attention takes time.`,
  },
  {
    id: 'hands-craft', slug: 'what-the-hands-remember', title: 'What the Hands Remember', category: 'Local Life', date: '2026-05-17', location: 'Guizhou',
    excerpt: 'Inside a local workshop, knowledge passes between generations through gesture, repetition, and material.',
    coverImage: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1500&h=1200&fit=crop',
    content: `The tools are simple, worn smooth where they have been held for years. The knowledge is more difficult to see.

It lives in pressure, timing, and the practiced decision to pause. Watching the work means watching memory take physical form.

> Tradition survives when it remains useful, shared, and open to another pair of hands.

We came to document a craft and left thinking about the relationships that keep it alive.`,
  },
  {
    id: 'mist-road', slug: 'the-road-after-rain', title: 'The Road After Rain', category: 'Journal', date: '2026-04-26', location: 'Northern Guangxi',
    excerpt: 'Field notes from a quiet road through rain, mist, bamboo, and villages temporarily hidden by weather.',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1700&h=1200&fit=crop',
    content: `Rain changed the scale of the landscape. Distant mountains disappeared and the nearest bamboo leaves became vivid.

Plans became smaller too. We stopped looking toward the next destination and paid attention to the road directly ahead.

> Sometimes weather does not interrupt a journey. It reveals the journey you were moving too quickly to notice.

By evening, the mist lifted just enough to show the lights of another village across the valley.`,
  },
  {
    id: 'shared-tea', slug: 'tea-at-the-open-door', title: 'Tea at the Open Door', category: 'Village Notes', date: '2026-03-31', location: 'Anhui',
    excerpt: 'A brief invitation becomes an unhurried conversation about harvests, family, and the view from one doorway.',
    coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=1200&fit=crop',
    content: `The invitation was a gesture toward a wooden stool. Tea arrived before introductions were complete.

From the doorway, every passing neighbour became part of the conversation. News travelled slowly but nothing seemed unknown.

> A place becomes meaningful when someone shares their view of it with you.

We stayed for one cup, then another, and left with a different understanding of the valley below.`,
  },
  {
    id: 'seasons', slug: 'reading-the-season', title: 'Reading the Season', category: 'Local Life', date: '2026-03-05', location: 'Zhejiang',
    excerpt: 'How fields, kitchens, weather, and everyday work mark the passage of time in rural China.',
    coverImage: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600&h=1200&fit=crop',
    content: `In the village, the season is not an abstract date. It can be read in the colour of a field and tasted at the table.

Work changes with the weather, and recipes follow what the land offers. Time becomes visible in practical ways.

> The calendar tells us when a season begins. Daily life tells us what that season means.

These observations form a local knowledge carried forward through use rather than explanation.`,
  },
];

export function inferStoryCategory(title: string, index: number): StoryCategory {
  const value = title.toLowerCase();
  if (value.includes('brand') || value.includes('tree thousands') || value.includes('why')) return 'Brand Stories';
  if (value.includes('village') || value.includes('field')) return 'Village Notes';
  if (value.includes('life') || value.includes('people') || value.includes('food')) return 'Local Life';
  return (['Journal', 'Village Notes', 'Local Life', 'Brand Stories'] as StoryCategory[])[index % 4];
}

export function plainExcerpt(content: string | null | undefined, length = 175) {
  const clean = (content || '').replace(/[#>*_`\[\]()]/g, ' ').replace(/\s+/g, ' ').trim();
  return clean.length > length ? `${clean.slice(0, length).trim()}…` : clean;
}
