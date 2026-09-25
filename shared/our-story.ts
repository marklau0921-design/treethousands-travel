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
    subtitle: 'A village is not simply a place to see. It is a place to approach with time, attention, and a willingness to take part.',
    image: '/images/what-we-believe/listening-first.jpg',
  },
  introduction: {
    eyebrow: '01 — Begin With What Is Real',
    title: 'Belief begins with paying attention.',
    paragraphs: [
      'Our understanding of a village begins with what is already happening there: people opening their doors in the morning, work continuing through changing seasons, meals shared around a table, and old spaces still carrying traces of the lives lived inside them.',
      'We do not begin by deciding what a village should become. We begin by walking through it, meeting the people who live there, and learning how the place works from day to day. Only then can we ask what should stay, what could change, and what might grow from here.',
    ],
    image: '/images/what-we-believe/at-the-doorway.jpg',
    backgroundColor: '#e4ddd1',
  },
  quote: {
    eyebrow: '02 — Come Closer',
    quote: 'You are not simply visiting the village. You become part of its story.',
    body: 'To come closer means spending enough time to notice the ordinary things: how a room is used, where neighbours stop to talk, what changes after the rain, and which parts of village life matter to the people who call it home. Participation begins with observation, conversation, and respect.',
    image: '/images/what-we-believe/everyday-company.jpg',
    backgroundColor: '#203a32',
  },
  pillars: {
    eyebrow: '03 — The Principles We Work By',
    title: 'Seven ways of working with a place',
    intro: 'These principles guide how we enter a village, work alongside local people, document what happens, and invite others to participate.',
    backgroundColor: '#f3eee5',
    items: [
      {
        title: 'The Place Is More Than a View',
        text: 'Fields, roads, old houses, animals, plants, weather, and changing seasons are not simply scenery. Together, they form the setting of everyday life. We photograph and write about these details so that people can understand how a place feels—not only how it looks.',
        image: '/images/what-we-believe/place-and-life.jpg',
        layout: 1,
      },
      {
        title: 'People Are Not Background Characters',
        text: 'The people who live in a village are not supporting figures in someone else’s journey. Their routines, knowledge, relationships, and decisions shape the place itself. We want our work to make room for their presence without turning them into symbols or stories they did not choose.',
        image: '/images/what-we-believe/people-not-background.jpg',
        layout: 2,
      },
      {
        title: 'Start by Listening',
        text: 'Before plans, designs, or activities take shape, we walk, look, and ask questions. We sit down with residents, visit existing spaces, and try to understand what is useful, remembered, overlooked, or still needed. Listening is not a preliminary task. It is part of the work.',
        image: '/images/what-we-believe/listening-first.jpg',
        layout: 3,
      },
      {
        title: 'Work With What Is Already Here',
        text: 'An unused room, an old doorway, or a shared outdoor space may already hold practical value and personal memory. We do not want to replace everything with something new. We look carefully at what can remain, what needs repair, and how an existing place might be used again without losing its character.',
        image: '/images/what-we-believe/already-here.jpg',
        layout: 4,
      },
    ],
  },
  closing: {
    eyebrow: '07 — Growing Together',
    title: 'The work stays open.',
    paragraphs: [
      'TreeThousands is still learning how these ideas can take form in real places. Some days involve walking through old houses. Others are spent talking around a table, clearing a room, recording local life, or reconsidering what should happen next.',
      'We want the project to grow through these real encounters—not through a fixed idea imposed from outside. As more people take part, the story can hold more perspectives, more practical work, and more possibilities for the places involved.',
    ],
    image: '/images/what-we-believe/the-work-stays-open.jpg',
    backgroundColor: '#d6cabe',
  },
  extraSections: [
    {
      id: 'document-the-process',
      type: 'quote',
      eyebrow: '04 — Document the Process',
      quote: 'The unfinished moments are part of the story.',
      body: 'The work does not begin when a space is finished. It is already happening while people clear a room, measure a wall, discuss an idea, prepare a meal, or change a plan after another conversation. These unfinished moments show how a project is really made, and they deserve to be recorded.',
      image: '/images/what-we-believe/documenting-the-process.jpg',
      backgroundColor: '#5b463b',
    },
    {
      id: 'build-alongside',
      type: 'introduction',
      eyebrow: '05 — Build Alongside, Not For',
      title: 'Different experience, shared decisions.',
      paragraphs: [
        'We are not arriving to save a village or decide its future from the outside. Local residents, young participants, visitors, and partners bring different experience to the same process.',
        'The most useful possibilities are built through practical work, shared decisions, and learning from one another. Working alongside people changes both the result and the relationships behind it.',
      ],
      image: '/images/what-we-believe/preparing-together.jpg',
      backgroundColor: '#dfe3d7',
    },
    {
      id: 'participation-changes-the-journey',
      type: 'pillars',
      eyebrow: '06 — Participation Changes the Journey',
      title: 'More than observing from the edge',
      intro: 'A visit changes when there is time to learn, contribute, work alongside others, and remain present for the ordinary moments in between.',
      backgroundColor: '#eee7db',
      items: [
        {
          title: 'Learn From a Resident',
          text: 'Understanding begins with direct conversation and with listening to the people who know the place through everyday life.',
          image: '/images/what-we-believe/at-the-doorway.jpg',
          layout: 1,
        },
        {
          title: 'Prepare a Shared Space',
          text: 'Participation can be practical: looking closely at an existing room, preparing it carefully, and considering how it may be used again.',
          image: '/images/what-we-believe/already-here.jpg',
          layout: 2,
        },
        {
          title: 'Work Alongside Others',
          text: 'Shared work makes room for different skills and perspectives without placing one group above another.',
          image: '/images/what-we-believe/preparing-together.jpg',
          layout: 3,
        },
        {
          title: 'Stay for the Conversation',
          text: 'Sometimes taking part simply means staying long enough for an ordinary conversation to become part of the experience.',
          image: '/images/what-we-believe/everyday-company.jpg',
          layout: 4,
        },
      ],
    },
  ],
  cta: {
    eyebrow: '',
    title: 'Come closer. Take part. Grow together.',
    buttonLabel: 'Join the Story',
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
    description: 'Discover the ideas, people, and places that shape the way we work.',
    backgroundColor: '#e6dfd4',
  },
  contentBlocks: [],
};

const fallbackImages = [
  '', '', '', '', '', '',
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
