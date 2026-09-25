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
  pageContent?: StoryDetailPageContent;
};

export interface StoryDetailPageContent {
  meta: { category: StoryCategory; location: string; publishedDate: string; excerpt: string };
  opening: { contextLabel: string; placeLabel: string; chapterLabel: string; recordedLabel: string; paragraphs: string[] };
  inside: { eyebrow: string; title: string; context: string; body: string; images: string[]; backgroundColor: string };
  quote: { eyebrow: string; quote: string; body: string; images: string[]; backgroundColor: string };
  closing: { eyebrow: string; title: string; paragraphs: string[]; image: string; backgroundColor: string };
  related: { eyebrow: string; title: string; backgroundColor: string };
  navigation: { previousLabel: string; nextLabel: string; backgroundColor: string; textColor: string };
  page: { backgroundColor: string; textColor: string; accentColor: string };
}

const patternStoryImages = {
  hero: '/images/stories/a-pattern-made-together/hero.jpg',
  leaf: '/images/stories/a-pattern-made-together/leaf-detail.jpg',
  table: '/images/stories/a-pattern-made-together/table-work.jpg',
  hands: '/images/stories/a-pattern-made-together/hands-at-work.jpg',
  together: '/images/stories/a-pattern-made-together/working-together.jpg',
  closing: '/images/stories/a-pattern-made-together/closing.jpg',
};

const beyondVisitingImages = {
  hero: '/images/why-we-started/before-the-plan.jpg',
  arriving: '/images/why-we-started/entering-the-village.jpg',
  listening: '/images/what-we-believe/listening-first.jpg',
  doorway: '/images/what-we-believe/at-the-doorway.jpg',
  villageRhythm: '/images/what-we-believe/preparing-together.jpg',
  closing: '/images/what-we-believe/everyday-company.jpg',
};

export const publishedEditorialStories: EditorialStory[] = [{
  id: 'a-pattern-made-together',
  slug: 'a-pattern-made-together',
  title: 'A Pattern Made Together',
  category: 'Local Life',
  date: '2026-09-23',
  location: 'Rural China',
  excerpt: 'Around a long wooden table, leaves, flowers, cloth bags and small mallets became the materials for an afternoon made together.',
  coverImage: patternStoryImages.hero,
  content: `The table was already covered when everyone sat down. Plain cloth bags lay beside green leaves and red flowers. Small dark mallets were passed from one pair of hands to another, and the first marks began to appear on the fabric.

At first, each person worked on a separate bag. Someone adjusted the position of a leaf. Someone else held the cloth steady. Before long, the table had become one shared working surface: people watched, compared, tried again and helped one another decide where the next mark should go.

The room did not need a formal stage. Its long table, open windows and old timber structure were enough. What gave the afternoon its shape was the activity happening inside it.`,
  pageContent: {
    meta: {
      category: 'Local Life',
      location: 'Rural China',
      publishedDate: '2026-09-23',
      excerpt: 'Around a long wooden table, leaves, flowers, cloth bags and small mallets became the materials for an afternoon made together.',
    },
    opening: {
      contextLabel: 'Story Context',
      placeLabel: 'Place',
      chapterLabel: 'Chapter',
      recordedLabel: 'Published',
      paragraphs: [
        'The table was already covered when everyone sat down. Plain cloth bags lay beside green leaves and red flowers. Small dark mallets were passed from one pair of hands to another, and the first marks began to appear on the fabric.',
        'At first, each person worked on a separate bag. Someone adjusted the position of a leaf. Someone else held the cloth steady. Before long, the table had become one shared working surface: people watched, compared, tried again and helped one another decide where the next mark should go.',
        'The room did not need a formal stage. Its long table, open windows and old timber structure were enough. What gave the afternoon its shape was the activity happening inside it.',
      ],
    },
    inside: {
      eyebrow: 'Inside the Story',
      title: 'What the hands discover',
      context: 'The process was simple to follow. A leaf or flower was placed on the cloth, covered and pressed with a mallet. Repeated strikes slowly transferred colour and shape onto the bag. No two impressions arrived in exactly the same way.',
      body: 'The differences were part of the pleasure. A leaf could leave a clear network of veins or only a soft field of green. A flower might hold its shape, spread beyond its edges or produce a mark no one expected. Each result prompted another look across the table, another small adjustment and another attempt.',
      images: [patternStoryImages.leaf, patternStoryImages.table],
      backgroundColor: '#ded8c9',
    },
    quote: {
      eyebrow: 'Around the Table',
      quote: 'The finished pattern belonged to one bag. The afternoon that produced it belonged to the whole table.',
      body: 'Hands moved constantly between individual work and shared attention. One person demonstrated a motion; another noticed where a flower had shifted. People could join by watching, by trying a single mark or by completing an entire design. Participation did not depend on arriving with specialist knowledge.',
      images: [patternStoryImages.hands, patternStoryImages.together],
      backgroundColor: '#f7f3ea',
    },
    closing: {
      eyebrow: 'Closing Reflection',
      title: 'An ordinary room, used together',
      paragraphs: [
        'By the end of the session, the table held a collection of different patterns. The same leaves, flowers and tools had produced results that carried the choices and movements of each person who made them.',
        'For TreeThousands, moments like this matter because they show what participation can look like at a human scale. It does not always begin with a large plan. Sometimes it begins with a table, a few materials and enough time for people to make something alongside one another.',
        'The bags could be taken away. The more important record was the room in use: neighbours seated together, knowledge moving across the table, and an existing village space holding a new shared activity.',
      ],
      image: patternStoryImages.closing,
      backgroundColor: '#cfd4c4',
    },
    related: { eyebrow: 'Continue Reading', title: 'Related Stories', backgroundColor: '#e8dfd0' },
    navigation: { previousLabel: '← Previous Story', nextLabel: 'Next Story →', backgroundColor: '#985e42', textColor: '#ffffff' },
    page: { backgroundColor: '#f4f0e7', textColor: '#1c2822', accentColor: '#985e42' },
  },
}, {
  id: 'beyond-visiting',
  slug: 'beyond-visiting',
  title: 'Beyond Visiting',
  category: 'Brand Stories',
  date: '2026-09-25',
  location: 'TreeThousands Field Notes',
  excerpt: 'For TreeThousands, immersive travel begins with time, attention and a willingness to take part—not simply passing through a place.',
  coverImage: beyondVisitingImages.hero,
  content: `There is a difference between arriving somewhere and beginning to understand it. The first can happen in a moment. The second asks for time.

For TreeThousands, immersive travel does not mean travelling farther or searching for somewhere untouched. It means becoming more present: walking without rushing, listening before explaining, and allowing everyday life to set the pace.

You remain a visitor, but not a distant observer. You begin to notice how a place is held together by people, work, weather, memory and the small routines that rarely appear on an itinerary.`,
  pageContent: {
    meta: {
      category: 'Brand Stories',
      location: 'TreeThousands Field Notes',
      publishedDate: '2026-09-25',
      excerpt: 'For TreeThousands, immersive travel begins with time, attention and a willingness to take part—not simply passing through a place.',
    },
    opening: {
      contextLabel: 'Travel Philosophy',
      placeLabel: 'Perspective',
      chapterLabel: 'Brand Story',
      recordedLabel: 'Published',
      paragraphs: [
        'There is a difference between arriving somewhere and beginning to understand it. The first can happen in a moment. The second asks for time.',
        'For TreeThousands, immersive travel does not mean travelling farther or searching for somewhere untouched. It means becoming more present: walking without rushing, listening before explaining, and allowing everyday life to set the pace.',
        'We do not travel deeper by going farther. We travel deeper by becoming more present.',
      ],
    },
    inside: {
      eyebrow: 'Arriving with Time',
      title: 'Life is not a performance',
      context: 'A village does not begin when a visitor arrives. Meals are prepared, work continues, doors open and close, neighbours speak, children move between homes, and weather changes the shape of the day. Local life is not something arranged for us. It is something we are invited to approach with care.',
      body: 'That care affects how we travel. Sometimes it means asking a question and staying long enough to hear the answer. Sometimes it means joining a task after being invited. At other times, it means standing back, putting the camera away and recognising that not every moment needs to become content. Immersion is not access without limits. It is attention guided by respect.',
      images: [beyondVisitingImages.arriving, beyondVisitingImages.listening],
      backgroundColor: '#ded7c8',
    },
    quote: {
      eyebrow: 'Taking Part',
      quote: 'You remain a visitor, but not a distant observer.',
      body: 'Participation changes the question from “What can I see here?” to “What is happening here, and how can I take part respectfully?” The answer may be found in a walk through the village, a conversation at a doorway, time shared around a table or practical work carried out alongside others. None of these moments needs to be made extraordinary. Their value comes from paying attention to what is already there.',
      images: [beyondVisitingImages.doorway, beyondVisitingImages.villageRhythm],
      backgroundColor: '#eee5d8',
    },
    closing: {
      eyebrow: 'What Stays',
      title: 'Learning through people',
      paragraphs: [
        'A village is never one story. It is many lives sharing the same place. To understand even a small part of it, we need to listen to different people and notice how their routines, knowledge and relationships shape the world around them.',
        'This is the kind of travel TreeThousands wants to create: not a performance of local life and not a promise that a short visit makes anyone an insider. It is a chance to come closer, to take part where participation is welcomed, and to leave with fewer assumptions than we brought with us.',
        'The value of an immersive journey is not how much of a place we can claim to know, but how carefully we learn to see it. Come closer. Take part. Leave with a deeper understanding—not a simplified story.',
      ],
      image: beyondVisitingImages.closing,
      backgroundColor: '#cbd1c1',
    },
    related: { eyebrow: 'Continue Reading', title: 'More from the Field', backgroundColor: '#e6ddcf' },
    navigation: { previousLabel: '← Previous Story', nextLabel: 'Next Story →', backgroundColor: '#17352d', textColor: '#ffffff' },
    page: { backgroundColor: '#f3efe6', textColor: '#1b2822', accentColor: '#8d5b3f' },
  },
}];

export function mergePublishedStories(databaseStories: EditorialStory[]) {
  const databaseSlugs = new Set(databaseStories.map((story) => story.slug));
  return [...publishedEditorialStories.filter((story) => !databaseSlugs.has(story.slug)), ...databaseStories];
}

export const fallbackStories: EditorialStory[] = [
  {
    id: 'field-kitchen', slug: 'a-table-set-between-the-fields', title: 'A Table Set Between the Fields', category: 'Village Notes', date: '2026-07-18', location: 'Western Sichuan',
    excerpt: 'An afternoon meal, a family kitchen, and the quiet generosity that turns a stop along the road into a lasting memory.',
    coverImage: '',
    content: `The road into the village narrowed beside the fields, then disappeared into a collection of stone paths and open courtyards.

We arrived without ceremony. A kettle was already warm, vegetables had just been brought in from the garden, and another chair was placed at the table as if it had always been waiting there.

> Hospitality is rarely announced. More often, it appears as an extra bowl, a shared story, and time made for a stranger.

The meal followed the landscape around us: greens from beside the house, preserved vegetables from the previous season, and rice served from a pot that seemed to belong at the centre of every conversation.

Nothing about the afternoon was arranged as a performance. That was precisely why it stayed with us.`,
  },
  {
    id: 'morning-path', slug: 'before-the-village-wakes', title: 'Before the Village Wakes', category: 'Local Life', date: '2026-06-29', location: 'Yunnan',
    excerpt: 'Following the first sounds of morning through lanes, courtyards, and fields at the edge of a mountain village.',
    coverImage: '',
    content: `Morning begins softly here. A gate opens, water moves through a narrow channel, and footsteps pass beneath tiled roofs.

By the time the sun reaches the lower fields, the village is already in motion. Work and conversation overlap without hurry.

> To understand a place, begin with the hour before it expects to be seen.

We walk without a list, noticing how the ordinary routines of one morning reveal more than a hurried itinerary ever could.`,
  },
  {
    id: 'why-slowly', slug: 'why-we-travel-slowly', title: 'Why We Travel Slowly', category: 'Brand Stories', date: '2026-06-08', location: 'Tree Thousands Journal',
    excerpt: 'A note on attention, relationships, and why meaningful journeys need room for the unexpected.',
    coverImage: '',
    content: `Slow travel is not simply about staying longer. It is about allowing a place to set the pace.

It leaves room for a conversation to continue, for weather to change a plan, and for curiosity to lead beyond the obvious route.

> The journey becomes richer when efficiency is no longer the only measure of a good day.

Tree Thousands began from this belief: that understanding grows through attention, and attention takes time.`,
  },
  {
    id: 'hands-craft', slug: 'what-the-hands-remember', title: 'What the Hands Remember', category: 'Local Life', date: '2026-05-17', location: 'Guizhou',
    excerpt: 'Inside a local workshop, knowledge passes between generations through gesture, repetition, and material.',
    coverImage: '',
    content: `The tools are simple, worn smooth where they have been held for years. The knowledge is more difficult to see.

It lives in pressure, timing, and the practiced decision to pause. Watching the work means watching memory take physical form.

> Tradition survives when it remains useful, shared, and open to another pair of hands.

We came to document a craft and left thinking about the relationships that keep it alive.`,
  },
  {
    id: 'mist-road', slug: 'the-road-after-rain', title: 'The Road After Rain', category: 'Journal', date: '2026-04-26', location: 'Northern Guangxi',
    excerpt: 'Field notes from a quiet road through rain, mist, bamboo, and villages temporarily hidden by weather.',
    coverImage: '',
    content: `Rain changed the scale of the landscape. Distant mountains disappeared and the nearest bamboo leaves became vivid.

Plans became smaller too. We stopped looking toward the next destination and paid attention to the road directly ahead.

> Sometimes weather does not interrupt a journey. It reveals the journey you were moving too quickly to notice.

By evening, the mist lifted just enough to show the lights of another village across the valley.`,
  },
  {
    id: 'shared-tea', slug: 'tea-at-the-open-door', title: 'Tea at the Open Door', category: 'Village Notes', date: '2026-03-31', location: 'Anhui',
    excerpt: 'A brief invitation becomes an unhurried conversation about harvests, family, and the view from one doorway.',
    coverImage: '',
    content: `The invitation was a gesture toward a wooden stool. Tea arrived before introductions were complete.

From the doorway, every passing neighbour became part of the conversation. News travelled slowly but nothing seemed unknown.

> A place becomes meaningful when someone shares their view of it with you.

We stayed for one cup, then another, and left with a different understanding of the valley below.`,
  },
  {
    id: 'seasons', slug: 'reading-the-season', title: 'Reading the Season', category: 'Local Life', date: '2026-03-05', location: 'Zhejiang',
    excerpt: 'How fields, kitchens, weather, and everyday work mark the passage of time in rural China.',
    coverImage: '',
    content: `In the village, the season is not an abstract date. It can be read in the colour of a field and tasted at the table.

Work changes with the weather, and recipes follow what the land offers. Time becomes visible in practical ways.

> The calendar tells us when a season begins. Daily life tells us what that season means.

These observations form a local knowledge carried forward through use rather than explanation.`,
  },
  {
    id: 'beginnings', slug: 'the-thought-behind-tree-thousands', title: 'The Thought Behind Tree Thousands', category: 'Brand Stories', date: '2026-02-20', location: 'Tree Thousands Journal',
    excerpt: 'Why we began with people, patience, and a wish to share a less familiar side of China.',
    coverImage: '',
    content: `Tree Thousands began with a simple question: what becomes visible when travel leaves more room for listening?

We wanted to share a China found not only in famous places, but in villages, working landscapes, family histories, and daily life.

> A journey can introduce a destination. A relationship can change the way we understand it.

That thought continues to guide how we travel, who we work with, and the stories we choose to tell.`,
  },
  {
    id: 'relationships-first', slug: 'relationships-before-routes', title: 'Relationships Before Routes', category: 'Brand Stories', date: '2026-01-28', location: 'Tree Thousands Journal',
    excerpt: 'A route may begin on a map, but its meaning comes from the people willing to open a door.',
    coverImage: '',
    content: `The strongest journeys do not begin with a list of attractions. They begin with trust.

Local partners help us understand what should be shared, how slowly we should move, and when a camera should remain in the bag.

> The quality of a journey depends on the quality of the relationships behind it.

Routes change. Relationships deepen. We build from the second and allow the first to follow.`,
  },
  {
    id: 'courtyard', slug: 'an-afternoon-in-the-courtyard', title: 'An Afternoon in the Courtyard', category: 'Village Notes', date: '2025-12-16', location: 'Jiangxi',
    excerpt: 'Sunlight moves across old walls while conversation, work, and play share the same courtyard.',
    coverImage: '',
    content: `The courtyard changed purpose throughout the afternoon. It was a workshop, a kitchen, a playground, and a place to sit in the last warm light.

No single activity defined it. Its character came from the way different generations moved through the same space.

> Some places tell their story through architecture. Others tell it through use.

We stayed until the light left the wall and the evening meal moved everyone indoors.`,
  },
  {
    id: 'field-note-river', slug: 'notes-from-the-river-road', title: 'Notes from the River Road', category: 'Journal', date: '2025-11-09', location: 'Fujian',
    excerpt: 'A day of unplanned stops along a road that follows water through tea fields and small settlements.',
    coverImage: '',
    content: `The road stayed close to the river, curving whenever the water disappeared behind trees.

We stopped for tea, for a bridge, and once because the sound of work from an open doorway made us curious.

> Field notes preserve the details a schedule would have asked us to ignore.

By the end of the day, the distance travelled mattered less than the number of times we had decided to stop.`,
  },
  {
    id: 'returning', slug: 'what-changes-when-we-return', title: 'What Changes When We Return', category: 'Journal', date: '2025-10-21', location: 'Sichuan',
    excerpt: 'On returning to a familiar village and discovering that memory is never a fixed version of place.',
    coverImage: '',
    content: `Returning creates a different kind of attention. We no longer search for first impressions; we notice what has moved, grown, or disappeared.

Familiar faces make room for longer conversations. Familiar paths reveal changes too small for a first-time visitor to see.

> A place is not the same place twice, and neither is the person who returns.

This is why our journal leaves room for second visits and unfinished stories.`,
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

const detailCopy: Record<StoryCategory, { title: string; context: string; reflection: string }> = {
  'Brand Stories': { title: 'The thought behind the journey', context: 'The ideas behind Tree Thousands are shaped on the road. Each encounter asks us to think again about how stories are shared, how trust is built, and what responsible curiosity can look like.', reflection: 'We keep returning to the same belief: travel becomes meaningful when attention turns into understanding.' },
  'Village Notes': { title: 'Observed along the way', context: 'Village life rarely presents itself as a single scene. Meaning accumulates through familiar paths, open courtyards, seasonal work, and conversations that continue while the day moves around them.', reflection: 'A village is never a single view. It is a collection of small moments held together by memory and daily use.' },
  'Local Life': { title: 'Details of the everyday', context: 'Daily life carries knowledge in practical forms: a recipe adjusted by season, a tool held in a familiar way, or a custom repeated without needing to be explained.', reflection: 'Culture remains alive when it belongs to everyday life—in gestures, work, humour, and hospitality.' },
  Journal: { title: 'From the field notebook', context: 'A field journal makes room for what falls between destinations: changing weather, an unexpected stop, a half-finished conversation, or a landscape seen differently on the return journey.', reflection: 'Field notes remind us that the unexpected is often the journey itself.' },
};

export function createDefaultStoryDetail(story: Pick<EditorialStory, 'title'|'category'|'date'|'location'|'excerpt'|'content'|'coverImage'>): StoryDetailPageContent {
  const paragraphs = story.content.split(/\n\s*\n/).filter(Boolean);
  const quote = paragraphs.find(p => p.trim().startsWith('>'))?.replace(/^>\s*/, '') || story.excerpt;
  const prose = paragraphs.filter(p => !p.trim().startsWith('>'));
  const copy = detailCopy[story.category];
  return {
    meta: { category: story.category, location: story.location, publishedDate: story.date.slice(0,10), excerpt: story.excerpt },
    opening: { contextLabel: 'Story Context', placeLabel: 'Place', chapterLabel: 'Chapter', recordedLabel: 'Recorded', paragraphs: prose.slice(0,2) },
    inside: { eyebrow: 'Inside the Story', title: copy.title, context: copy.context, body: prose[2] || story.excerpt, images: [story.coverImage, story.coverImage], backgroundColor: '#e9e3d7' },
    quote: { eyebrow: 'A line to remember', quote, body: copy.context, images: [story.coverImage, story.coverImage], backgroundColor: '#f8f5ee' },
    closing: { eyebrow: 'Closing Reflection', title: copy.reflection, paragraphs: prose.slice(3), image: story.coverImage, backgroundColor: '#e9e3d7' },
    related: { eyebrow: 'Continue reading', title: 'Related Stories', backgroundColor: '#e5ddce' },
    navigation: { previousLabel: '← Previous Story', nextLabel: 'Next Story →', backgroundColor: '#9b5e3d', textColor: '#ffffff' },
    page: { backgroundColor: '#f5f1e8', textColor: '#17251f', accentColor: '#9b5e3d' },
  };
}

export function normalizeStoryDetail(value: unknown, story: Pick<EditorialStory, 'title'|'category'|'date'|'location'|'excerpt'|'content'|'coverImage'>): StoryDetailPageContent {
  const defaults = createDefaultStoryDetail(story);
  if (typeof value === 'string') { try { value = JSON.parse(value); } catch { return defaults; } }
  if (!value || typeof value !== 'object') return defaults;
  const page = value as Partial<StoryDetailPageContent>;
  return {
    meta: { ...defaults.meta, ...(page.meta ?? {}) }, opening: { ...defaults.opening, ...(page.opening ?? {}), paragraphs: page.opening?.paragraphs ?? defaults.opening.paragraphs },
    inside: { ...defaults.inside, ...(page.inside ?? {}), images: page.inside?.images ?? defaults.inside.images }, quote: { ...defaults.quote, ...(page.quote ?? {}), images: page.quote?.images ?? defaults.quote.images },
    closing: { ...defaults.closing, ...(page.closing ?? {}), paragraphs: page.closing?.paragraphs ?? defaults.closing.paragraphs }, related: { ...defaults.related, ...(page.related ?? {}) },
    navigation: { ...defaults.navigation, ...(page.navigation ?? {}) }, page: { ...defaults.page, ...(page.page ?? {}) },
  };
}
