import { normalizeEditorialBlocks, type EditorialBlock } from './editorial-blocks';

export interface OurStoryPillar {
  title: string;
  text: string;
  image: string;
  layout?: 1 | 2 | 3 | 4;
}

export type OurStoryExtraSection =
  | ({ id: string; type: 'introduction' } & OurStoryPageContent['introduction'])
  | ({ id: string; type: 'quote' } & OurStoryPageContent['quote'])
  | ({ id: string; type: 'pillars' } & OurStoryPageContent['pillars'])
  | ({ id: string; type: 'closing' } & OurStoryPageContent['closing']);

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
  extraSections: OurStoryExtraSection[];
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
  contentBlocks: EditorialBlock[];
}

export const whyWeStartedPageContent: OurStoryPageContent = {
  hero: {
    eyebrow: 'Our Story / The Beginning',
    title: 'Why We Started',
    subtitle: 'We began by walking into villages, listening to the people who live there, and asking what might grow from what is already here.',
    image: '/images/why-we-started/entering-the-village.jpg',
  },
  introduction: {
    eyebrow: '01 — The Place Before the Project',
    title: 'We first noticed what was already there.',
    paragraphs: [
      'Many introductions to China begin with its cities and landmarks. Beyond those familiar routes, we found another rhythm: tiled roofs darkened by rain, paths between fields, open doorways, and neighbours who still know the history of a room by the marks left on its walls.',
      'These places were not empty, and they were not waiting to be rescued. They already held memory, knowledge, work, and everyday life. What they needed from us first was attention—the patience to look closely before deciding what a place could become.',
    ],
    image: '/images/why-we-started/life-already-here.jpg',
    backgroundColor: '#ebe5d9',
  },
  quote: {
    eyebrow: '02 — Before There Was a Plan',
    quote: 'We started by listening.',
    body: 'There was no finished itinerary and no ready-made answer. We walked the village lanes with local residents, stepped into old houses, looked carefully at unused rooms and public spaces, and sat down for conversations about what had changed—and what should remain. The first work was not to design. It was to understand.',
    image: '/images/why-we-started/before-the-plan.jpg',
    backgroundColor: '#17352d',
  },
  pillars: {
    eyebrow: '03 — What We Found',
    title: 'A different side of China',
    intro: 'The story became clearer through real places, real conversations, and the practical work of caring for what a village already holds.',
    backgroundColor: '#f7f3eb',
    items: [
      {
        title: 'A Different Side of China',
        text: 'Away from the fast routes are quieter places shaped by weather, seasonal work, family memory, and small routines. Rural China is not a backdrop. It is lived in, changing, and full of stories that deserve time.',
        image: '/images/why-we-started/rural-details.jpg', layout: 1,
      },
      {
        title: 'Before There Was a Plan',
        text: 'We enter on foot, ask questions, take photographs, measure spaces, and listen to the people who use them. A plan only begins after the village has had the chance to speak.',
        image: '/images/why-we-started/people-and-stories.jpg', layout: 2,
      },
      {
        title: 'Working With What Is Already Here',
        text: 'An old house carries more than timber and brick. We look at what can stay, what needs careful repair, what may change, and what local people want to see grow—reusing spaces without erasing their character.',
        image: '/images/why-we-started/what-is-already-here.jpg', layout: 3,
      },
      {
        title: 'More Than a Place to Visit',
        text: 'We imagine experiences built around participation: learning from residents, helping with considered projects, sharing skills, and spending enough time for exchange to feel genuine. The aim is not simply to pass through, but to take part with care.',
        image: '/images/why-we-started/rooms-and-memory.jpg', layout: 4,
      },
    ],
  },
  closing: {
    eyebrow: '04 — Still at the Beginning',
    title: 'This story is still being built.',
    paragraphs: [
      'TreeThousands is still at an early stage. There are rooms to assess, paths to walk again, and many more conversations to have. We do not arrive with a finished answer; we keep learning with the people and places involved.',
      'Over time, we hope residents, young people, visitors, schools, volunteers, and thoughtful partners can become part of this process—not to consume a completed village, but to contribute to a living one. Come closer. Take part. Grow together.',
    ],
    image: '/images/why-we-started/still-at-the-beginning.jpg',
    backgroundColor: '#d8c5aa',
  },
  extraSections: [],
  cta: {
    eyebrow: '',
    title: 'Come closer. Take part. Grow together.',
    buttonLabel: 'Join the Story',
    buttonHref: '/make-an-enquiry',
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
    description: 'Discover the ideas, people, and places that shape the way we work.',
    backgroundColor: '#e8e1d5',
  },
  contentBlocks: [],
};

export const whatWeBelievePageContent: OurStoryPageContent = {
  hero: {
    eyebrow: 'Our Story / What We Believe',
    title: 'What We Believe',
    subtitle: 'Travel should leave something meaningful behind.',
    image: '/images/what-we-believe/belief-hero.jpg',
  },
  introduction: {
    eyebrow: '01 / A Place Is Not a Product',
    title: 'A village is a living relationship.',
    paragraphs: [
      'A village is not a backdrop. It is a living relationship between land, memory, work, and people. Its fields, paths, homes, and shared spaces have been shaped by countless ordinary decisions over time.',
      'Before asking what a place can offer us, we try to understand what is already here. We arrive slowly, pay attention to the rhythms of daily life, and learn from the people whose knowledge has grown through seasons of care.',
    ],
    image: '/images/what-we-believe/place-is-not-a-product.jpg',
    backgroundColor: '#ffffff',
  },
  quote: {
    eyebrow: '02 / Learning From the Land',
    quote: 'The land teaches through repetition.',
    body: 'Planting, picking, carrying, waiting, and beginning again—local knowledge is held in movements repeated across generations.',
    image: '/images/what-we-believe/learning-from-the-land-01.jpg',
    backgroundColor: '#f3f3f1',
  },
  pillars: {
    eyebrow: '', title: '', intro: '', backgroundColor: '#ffffff', items: [],
  },
  closing: {
    eyebrow: '', title: '', paragraphs: [], image: '', backgroundColor: '#ffffff',
  },
  extraSections: [],
  cta: {
    eyebrow: '',
    title: 'What We’re Exploring',
    buttonLabel: 'Explore With Us',
    buttonHref: '/explore',
    backgroundColor: '#1f352d',
    textColor: '#ffffff',
    buttonBackgroundColor: '#111111',
    buttonTextColor: '#ffffff',
    textureImage: '',
    textureOpacity: 28,
  },
  recommendations: {
    eyebrow: 'Continue exploring',
    title: 'More of Our Story',
    description: 'Continue with the stories, people, and places that shape the way we work.',
    backgroundColor: '#f3f3f1',
  },
  contentBlocks: [
    {
      id: 'learning-from-the-land', type: 'story-photo-quote', eyebrow: '02 / Learning From the Land',
      title: 'Knowledge lives in repeated gestures', quote: 'The land teaches through repetition.',
      body: [
        'Planting, picking, carrying, waiting, and beginning again—local knowledge is held in movements repeated across generations.',
        'We come not only to see, but to listen, observe, and learn from the people who understand this land through daily practice.',
      ],
      images: ['/images/what-we-believe/learning-from-the-land-01.jpg', '/images/what-we-believe/learning-from-the-land-02.jpg'], captions: ['', ''],
      backgroundColor: '#f3f3f1', textColor: '#262a27', accentColor: '#60665f', imageSide: 'left', imageFit: 'cover', visible: true,
    },
    {
      id: 'participation-not-observation', type: 'our-story-mosaic', eyebrow: '03 / Participation, Not Observation',
      title: 'Taking part changes the journey', quote: '',
      body: [
        'To participate is to accept the pace of another place. It means working with our hands, listening before acting, and understanding that even a simple task carries knowledge.',
        'Building, farming, making, and restoring become ways of meeting—not activities arranged only for entertainment.',
      ],
      images: ['/images/what-we-believe/participation-01.jpg', '/images/what-we-believe/participation-02.jpg', '/images/what-we-believe/participation-03.jpg', '/images/what-we-believe/participation-04.jpg'], captions: ['', '', '', ''],
      backgroundColor: '#ffffff', textColor: '#262a27', accentColor: '#60665f', imageSide: 'left', imageFit: 'cover', visible: true,
    },
    {
      id: 'relationships-that-continue', type: 'magazine-contact-sheet', eyebrow: '04 / Relationships That Continue',
      title: 'A visit is not the end of the relationship', quote: '',
      body: [
        'A meaningful journey continues through the people we remember, the knowledge we carry, and the responsibilities we choose to share.',
        'We hope every visit becomes part of a longer relationship—between guests and hosts, cities and villages, people and the living world around them.',
      ],
      images: ['/images/what-we-believe/relationships-01.jpg', '/images/what-we-believe/relationships-02.png', '/images/what-we-believe/relationships-03.webp', '/images/what-we-believe/relationships-04.jpg', '/images/what-we-believe/relationships-05.jpg', '/images/what-we-believe/relationships-06.jpg'], captions: ['', '', '', '', '', ''],
      backgroundColor: '#f3f3f1', textColor: '#262a27', accentColor: '#60665f', imageSide: 'left', imageFit: 'cover', visible: true,
    },
    {
      id: 'travel-that-listens', type: 'explore-statement', eyebrow: 'Our Belief',
      title: 'We believe in travel that listens, respects what is already here, and asks how we can take part.', quote: '', body: [], images: [], captions: [],
      backgroundColor: '#ffffff', textColor: '#1f2521', accentColor: '#60665f', imageSide: 'left', imageFit: 'cover', visible: true,
    },
  ],
};

const wayOfTravelImages = {
  hero: '/images/stories/before-a-journey-becomes-a-route/forest-road.jpg',
  walking: '/images/stories/before-a-journey-becomes-a-route/walking-together.jpg',
  pause: '/images/stories/before-a-journey-becomes-a-route/trail-pause.jpg',
  village: '/images/stories/before-a-journey-becomes-a-route/documenting-village.jpg',
  forest: '/images/stories/before-a-journey-becomes-a-route/forest-steps.jpg',
  encounter: '/images/stories/before-a-journey-becomes-a-route/roadside-encounter.jpg',
  looking: '/images/stories/before-a-journey-becomes-a-route/looking-closely.jpg',
  entering: '/images/stories/before-a-journey-becomes-a-route/entering-village.jpg',
  waterfall: '/images/stories/before-a-journey-becomes-a-route/waterfall.jpg',
};

export const ourWayOfTravelPageContent: OurStoryPageContent = {
  hero: {
    eyebrow: 'Our Story / Our Approach',
    title: 'Our Way of Travel',
    subtitle: 'We begin on the ground—walking, listening and learning how a place lives before deciding how a journey should move through it.',
    image: wayOfTravelImages.hero,
  },
  introduction: {
    eyebrow: '01 — Before the Itinerary',
    title: 'The journey begins before there is a route.',
    paragraphs: [
      'Before we invite anyone to travel with us, we go ourselves. We walk the forest roads, enter the village lanes, notice where the pace changes and listen to the people who understand the place through everyday life.',
      'This first visit is not a rehearsal for a finished tour. It is fieldwork. It helps us understand what can be shared responsibly, what needs more time and what should remain part of ordinary life rather than becoming an attraction.',
    ],
    image: wayOfTravelImages.walking,
    backgroundColor: '#e4ddd1',
  },
  quote: {
    eyebrow: '02 — Listen First',
    quote: 'A meaningful journey is shaped with a place, not placed on top of it.',
    body: 'We do not begin with a list of attractions. We begin with conversations, changing weather, the condition of a path, the rhythm of local work and the practical boundaries people ask us to respect.',
    image: wayOfTravelImages.pause,
    backgroundColor: '#17352d',
  },
  pillars: {
    eyebrow: '03 — How We Shape a Journey',
    title: 'Four ways we travel with attention',
    intro: 'These principles guide the route, the pace and the relationships behind every TreeThousands journey.',
    backgroundColor: '#f3eee5',
    items: [
      {
        title: 'Walk the Ground',
        text: 'Maps tell us distance. Walking reveals effort, shade, weather, places to pause and the transitions between landscape and village life. We test the pace with our own bodies before asking others to follow it.',
        image: wayOfTravelImages.forest,
        layout: 1,
      },
      {
        title: 'Travel in Small Ways',
        text: 'Small groups make room for conversation, different walking speeds and changes of plan. They allow a journey to remain responsive instead of asking the place to fit a fixed performance.',
        image: wayOfTravelImages.walking,
        layout: 2,
      },
      {
        title: 'Respect Everyday Life',
        text: 'A village is somebody’s home and workplace. We photograph with permission, enter private spaces only when invited and do not turn ordinary routines into scenes arranged for visitors.',
        image: wayOfTravelImages.village,
        layout: 3,
      },
      {
        title: 'Leave Room for Change',
        text: 'Weather, seasons, local work and the needs of each group can change the day. We treat flexibility as part of responsible travel, not as a failure to follow the plan.',
        image: wayOfTravelImages.waterfall,
        layout: 4,
      },
    ],
  },
  closing: {
    eyebrow: '06 — A Longer Relationship',
    title: 'A journey should leave more than a photograph.',
    paragraphs: [
      'We want travel to create value in both directions. That means returning, keeping conversations open and connecting future visits with work and knowledge that local people consider useful.',
      'Our way of travel is still developing through every walk, shared meal, changed plan and honest conversation. The route may end, but the relationship should have room to continue.',
    ],
    image: wayOfTravelImages.entering,
    backgroundColor: '#cbd1c2',
  },
  extraSections: [
    {
      id: 'place-is-not-a-stage',
      type: 'introduction',
      eyebrow: '04 — The Place Is Not a Stage',
      title: 'We look closely without asking daily life to perform.',
      paragraphs: [
        'The most important moments are often unplanned: people meeting beside the road, a path becoming quieter beneath the trees, or a conversation continuing while work carries on nearby.',
        'We document what is present and explain the context around it. We do not add activities simply to fill an itinerary, and we accept that some encounters belong to the people living them rather than to the visitor.',
      ],
      image: wayOfTravelImages.encounter,
      backgroundColor: '#ded7ca',
    },
    {
      id: 'participation-changes-travel',
      type: 'pillars',
      eyebrow: '05 — From Seeing to Taking Part',
      title: 'Participation changes the relationship',
      intro: 'When appropriate, a journey can move beyond observation and create space to learn, contribute and spend time alongside others.',
      backgroundColor: '#ece5d9',
      items: [
        { title: 'Learn From the People Here', text: 'Local knowledge remains with the people who practise it. We create space for their explanations and decisions rather than speaking over them.', image: wayOfTravelImages.looking, layout: 1 },
        { title: 'Contribute Carefully', text: 'Participation may involve practical work, documentation or shared activity, but only when it is useful, appropriate and connected to something already underway.', image: wayOfTravelImages.encounter, layout: 2 },
        { title: 'Move at the Place’s Pace', text: 'Time to pause, look again and adjust allows people to understand more than a tightly scheduled sequence of stops can offer.', image: wayOfTravelImages.forest, layout: 3 },
        { title: 'Carry the Story Forward', text: 'We hope travellers leave with context, relationships and a reason to remain connected—not only a collection of images from a place they passed through.', image: wayOfTravelImages.entering, layout: 4 },
      ],
    },
  ],
  cta: {
    eyebrow: 'Travel With Us',
    title: 'Come closer. Take part. Grow together.',
    buttonLabel: 'Start a Conversation',
    buttonHref: '/make-an-enquiry',
    backgroundColor: '#93482f',
    textColor: '#ffffff',
    buttonBackgroundColor: '#111111',
    buttonTextColor: '#ffffff',
    textureImage: '',
    textureOpacity: 28,
  },
  recommendations: {
    eyebrow: 'Continue exploring',
    title: 'More of Our Story',
    description: 'Discover the ideas, people and places that continue to shape how we work.',
    backgroundColor: '#e6dfd4',
  },
  contentBlocks: [],
};

const fallbackImages = [
  '', '', '', '', '', '',
];

export function createDefaultOurStoryPage(title: string, summary: string, image = ''): OurStoryPageContent {
  if (title === 'Our Way of Travel') return ourWayOfTravelPageContent;
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
        { title: 'Village', text: 'Places shaped by generations of memory, work, and belonging.', image: fallbackImages[3], layout: 1 },
        { title: 'People', text: 'The makers, farmers, hosts, and storytellers we meet along the way.', image: fallbackImages[4], layout: 2 },
        { title: 'Nature', text: 'Landscapes that invite us to slow down, listen, and look more closely.', image: fallbackImages[5], layout: 3 },
        { title: 'Culture', text: 'Living traditions found in food, craft, ritual, language, and daily life.', image: fallbackImages[1], layout: 4 },
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
    extraSections: [],
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
    contentBlocks: [],
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
    pillars: {
      ...defaults.pillars,
      ...(page.pillars ?? {}),
      items: (page.pillars?.items?.length ? page.pillars.items : defaults.pillars.items)
        .map((item, index) => ({ ...item, layout: item.layout ?? ((index % 4) + 1) as 1 | 2 | 3 | 4 })),
    },
    closing: { ...defaults.closing, ...(page.closing ?? {}), paragraphs: page.closing?.paragraphs ?? defaults.closing.paragraphs },
    extraSections: Array.isArray(page.extraSections) ? page.extraSections : defaults.extraSections,
    cta: { ...defaults.cta, ...(page.cta ?? {}) },
    recommendations: { ...defaults.recommendations, ...(page.recommendations ?? {}) },
    contentBlocks: normalizeEditorialBlocks(page.contentBlocks),
  };
}
