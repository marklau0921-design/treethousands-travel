import { normalizeEditorialBlocks, type EditorialBlock } from './editorial-blocks';

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
  contentBlocks: EditorialBlock[];
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

const forestTogetherImages = {
  hero: '/images/stories/into-the-forest-together/group-in-forest.jpg',
  arriving: '/images/stories/into-the-forest-together/arriving.jpg',
  bambooPath: '/images/stories/into-the-forest-together/bamboo-path.jpg',
  bird: '/images/stories/into-the-forest-together/bird.jpg',
  handsAtWork: '/images/stories/into-the-forest-together/hands-at-work.jpg',
  forestDevice: '/images/stories/into-the-forest-together/forest-device.jpg',
  lookingClosely: '/images/stories/into-the-forest-together/looking-closely.jpg',
  toolsInForest: '/images/stories/into-the-forest-together/tools-in-forest.jpg',
  together: '/images/stories/into-the-forest-together/together.jpg',
  landscape: '/images/stories/into-the-forest-together/forest-landscape.jpg',
};

const workingWithWhatExistsImages = {
  hero: '/images/stories/working-with-what-is-already-here/before-exterior.jpg',
  roofWide: '/images/stories/working-with-what-is-already-here/roof-wide.jpg',
  roofCheck: '/images/stories/working-with-what-is-already-here/roof-check.jpg',
  roofLadder: '/images/stories/working-with-what-is-already-here/roof-ladder.jpg',
  roofMountains: '/images/stories/working-with-what-is-already-here/roof-mountains.jpg',
  roofTogether: '/images/stories/working-with-what-is-already-here/roof-together.jpg',
  interiorLit: '/images/stories/working-with-what-is-already-here/interior-lit.jpg',
  worktable: '/images/stories/working-with-what-is-already-here/worktable.jpg',
  carpenterWindow: '/images/stories/working-with-what-is-already-here/carpenter-window.jpg',
  carpenterMachine: '/images/stories/working-with-what-is-already-here/carpenter-machine.jpg',
  transitionWall: '/images/stories/working-with-what-is-already-here/transition-wall.jpg',
  sandingWall: '/images/stories/working-with-what-is-already-here/sanding-wall.jpg',
};

export const publishedEditorialStories: EditorialStory[] = [{
  id: 'working-with-what-is-already-here',
  slug: 'working-with-what-is-already-here',
  title: 'Working With What Is Already Here',
  category: 'Journal',
  date: '2026-09-29',
  location: 'Rural China',
  excerpt: 'A field journal about repairing an old village house by first asking what should remain, what needs attention, and what might grow from here.',
  coverImage: workingWithWhatExistsImages.hero,
  content: `The house stood close to the village lane, its timber, plaster, windows and tiled roof carrying the marks of long use. Before thinking about what it might become, the first task was to look carefully at what was already there.

Repair began with practical questions. Which parts of the roof needed attention? Which timbers could continue to serve? How could new work meet the existing structure without making the house feel disconnected from its surroundings?

The answers emerged through work: tiles lifted and returned, timber measured and cut, old surfaces cleaned, and decisions made inside the space itself. The process was not about making the house appear untouched by time. It was about allowing its next use to grow from the life and materials it already held.`,
  pageContent: {
    meta: {
      category: 'Journal',
      location: 'Rural China',
      publishedDate: '2026-09-29',
      excerpt: 'A field journal about repairing an old village house by first asking what should remain, what needs attention, and what might grow from here.',
    },
    opening: {
      contextLabel: 'Field Journal', placeLabel: 'Place', chapterLabel: 'Chapter', recordedLabel: 'Published',
      paragraphs: [
        'The house stood close to the village lane, its timber, plaster, windows and tiled roof carrying the marks of long use. Before thinking about what it might become, the first task was to look carefully at what was already there.',
        'Repair began with practical questions. Which parts of the roof needed attention? Which timbers could continue to serve? How could new work meet the existing structure without making the house feel disconnected from its surroundings?',
        'The answers emerged through work: tiles lifted and returned, timber measured and cut, old surfaces cleaned, and decisions made inside the space itself.',
      ],
    },
    inside: {
      eyebrow: 'Inside the Work', title: 'Repair begins with attention',
      context: 'An existing house is not an empty surface. Its proportions, materials, marks of use and relationship with the lane already give it a character that new work must learn to meet.',
      body: 'The aim was not to erase the age of the building. It was to understand where careful repair could allow the house to remain useful without losing the qualities that made it part of this place.',
      images: [workingWithWhatExistsImages.roofWide, workingWithWhatExistsImages.worktable], backgroundColor: '#ded7c9',
    },
    quote: {
      eyebrow: 'A Working Question', quote: 'What should stay? What needs to change? What could grow from here?',
      body: 'These questions kept the work grounded in the house itself. Every decision had to respond to something already present: a roof line, a timber joint, a window opening or the way light entered the room.',
      images: [workingWithWhatExistsImages.carpenterWindow, workingWithWhatExistsImages.sandingWall], backgroundColor: '#ede4d7',
    },
    closing: {
      eyebrow: 'Still Taking Shape', title: 'Another use can begin without erasing the first',
      paragraphs: [
        'The work shown here is a process rather than a finished reveal. Materials remain on the floor, tools remain within reach, and the next decision is still connected to the one before it.',
        'For TreeThousands, this unfinished stage matters. It makes visible the people, judgement and labour that a polished final image can easily hide.',
        'A repaired house does not need to deny its age. Its future can grow from the structure, knowledge and relationships that have allowed it to remain here.',
      ],
      image: workingWithWhatExistsImages.transitionWall, backgroundColor: '#cbd1c2',
    },
    related: { eyebrow: 'Continue Reading', title: 'More from the Field', backgroundColor: '#e5ddcf' },
    navigation: { previousLabel: '← Previous Story', nextLabel: 'Next Story →', backgroundColor: '#17352d', textColor: '#ffffff' },
    page: { backgroundColor: '#f3efe6', textColor: '#1b2822', accentColor: '#8a5b3f' },
    contentBlocks: [
      {
        id: 'house-before-change', type: 'our-story-sheet', eyebrow: '01 — Before Any Change', title: 'The first step was to see the house as it was.',
        body: [
          'The house faced a narrow lane, held between neighbouring buildings, stone edges and the slope of the village. Its plaster, wooden windows and dark tiled roof showed the effects of weather and continued use.',
          'Nothing in this first view asked to be romanticised. It asked to be read carefully. Before plans and materials entered the space, the existing building was the most important source of information.',
        ], quote: '', images: [workingWithWhatExistsImages.hero], captions: ['The house before repair work began'], backgroundColor: '#e2ddd2', textColor: '#1b2822', accentColor: '#8a5b3f', imageSide: 'right', imageFit: 'cover', visible: true,
      },
      {
        id: 'house-reading-existing', type: 'magazine-columns', eyebrow: '02 — Reading the Existing House', title: 'The building itself became the first set of plans.',
        body: [
          'An old house contains decisions made over many years. Roof tiles overlap in a particular rhythm. Openings follow the needs of the rooms behind them. Beams, boards and plaster meet where different stages of work have left their trace.',
          'Reading these details does not mean preserving every part without question. It means understanding the consequences of change before making it. The task was to distinguish between what could continue, what required repair and what needed a careful new response.',
        ], quote: 'Working with an existing house begins by listening to what its materials can still do.', images: [workingWithWhatExistsImages.interiorLit], captions: ['Examining the existing doorway and interior structure'], backgroundColor: '#f3efe6', textColor: '#1b2822', accentColor: '#76503a', imageSide: 'left', imageFit: 'cover', visible: true,
      },
      {
        id: 'house-what-stays', type: 'story-spread', eyebrow: '03 — What Should Stay', title: 'Keeping something requires judgement, not nostalgia.',
        body: [
          'The dark timber surfaces, familiar window proportions and heavy roof line gave the house its presence within the village. Repair did not need to make those things disappear in order to prove that work had taken place.',
          'New plaster and prepared timber appeared beside older surfaces. The contrast made the process visible: not a return to an imagined past, and not a complete replacement, but a meeting between what remained sound and what had to be renewed.',
        ], quote: '', images: [workingWithWhatExistsImages.transitionWall, workingWithWhatExistsImages.sandingWall], captions: ['New work meeting the existing structure', 'Preparing an old timber wall for continued use'], backgroundColor: '#d5d2c6', textColor: '#1b2822', accentColor: '#7e5138', imageSide: 'right', imageFit: 'cover', visible: true,
      },
      {
        id: 'house-roof', type: 'our-story-mosaic', eyebrow: '04 — Beginning from the Roof', title: 'The most practical work came first.',
        body: [
          'A roof determines whether the rooms below can continue to be used. The repair began above the house, where workers moved across the slope, lifted old tiles and attended to the places that could no longer be left as they were.',
          'The photographs show the physical reality of the work: ladders against the eaves, stacks of tiles within reach, bodies balanced carefully on the roof and the mountain landscape rising beyond the village.',
        ], quote: '', images: [workingWithWhatExistsImages.roofWide, workingWithWhatExistsImages.roofCheck, workingWithWhatExistsImages.roofLadder, workingWithWhatExistsImages.roofMountains], captions: ['Repair across the tiled roof', 'Checking the existing tiles', 'Working from the ladder and roof line', 'The house within the mountain landscape'], backgroundColor: '#e7dece', textColor: '#1b2822', accentColor: '#8a5b3f', imageSide: 'left', imageFit: 'cover', visible: true,
      },
      {
        id: 'house-knowledge-hands', type: 'story-photo-quote', eyebrow: '05 — Knowledge in the Hands', title: 'Craft becomes visible through movement.',
        body: [
          'Inside the house, timber was measured, carried and worked in response to the dimensions of the existing rooms. The knowledge involved was practical: how to hold a long board, how to read its grain and how to shape it for the place where it would be used.',
          'This kind of experience is easy to overlook when a project is described only through drawings and finished photographs. Here, the carpenter and the material remain at the centre of the story.',
        ], quote: 'A plan can describe a dimension. A practiced hand knows how the material will answer.', images: [workingWithWhatExistsImages.carpenterWindow, workingWithWhatExistsImages.carpenterMachine], captions: ['Timber carried through the renewed window opening', 'Local carpentry underway inside the house'], backgroundColor: '#21372f', textColor: '#f4f0e7', accentColor: '#d4ad87', imageSide: 'left', imageFit: 'cover', visible: true,
      },
      {
        id: 'house-workshop', type: 'explore-visual', eyebrow: '06 — The House as a Workshop', title: 'Before it could hold a new use, the room held the work itself.',
        body: [
          'Boards rested across temporary supports. Measuring tools, clamps and machines stayed close to the place where they were needed. The room was not presented as a clean interior waiting for decoration; it was an active workshop.',
          'This stage reveals how change actually happens. A space is tested through labour before it is ready to receive daily life again. The unfinished room records choices in progress and the many hands required to carry them out.',
        ], quote: '', images: [workingWithWhatExistsImages.worktable, workingWithWhatExistsImages.interiorLit, workingWithWhatExistsImages.carpenterMachine], captions: ['Tools and timber across the worktable', 'Work continuing inside the old structure', 'Wood shavings on the floor of the temporary workshop'], backgroundColor: '#d9d2c5', textColor: '#1b2822', accentColor: '#7d5038', imageSide: 'right', imageFit: 'cover', visible: true,
      },
      {
        id: 'house-building-alongside', type: 'home-edge-rows', eyebrow: '07 — Building Alongside', title: 'The work belonged to more than one kind of knowledge.',
        body: [
          'Repair brought different forms of experience into the same place. Craftspeople understood the behaviour of timber and tile. Workers knew how to move safely through a difficult structure. Others documented, discussed and responded to what the work revealed.',
          'This was not a story about arriving with every answer. It was a process of building alongside people who already understood the materials, the house and the conditions of working here.',
        ], quote: '', images: [workingWithWhatExistsImages.roofTogether], captions: ['People working together across the existing roof'], backgroundColor: '#ece5d9', textColor: '#1b2822', accentColor: '#8a5b3f', imageSide: 'right', imageFit: 'cover', visible: true,
      },
      {
        id: 'house-next-use', type: 'our-story-closing', eyebrow: '08 — Still Taking Shape', title: 'A new use can grow from an existing place.',
        body: [
          'There is no finished reveal at the centre of this story. The house remains in progress, with tools nearby and further decisions still to be made. That unfinished condition is part of the record rather than something to hide.',
          'For TreeThousands, rural building is not about replacing everything that came before. It is about working with what is already here, allowing useful structures and local knowledge to remain part of whatever comes next.',
          'The measure of the work will not be how new the house appears. It will be whether the space can be used again while still belonging to the place around it.',
        ], quote: '', images: [workingWithWhatExistsImages.worktable], captions: ['The interior continuing to take shape'], backgroundColor: '#cbd1c2', textColor: '#1b2822', accentColor: '#76503a', imageSide: 'left', imageFit: 'cover', visible: true,
      },
    ],
  },
}, {
  id: 'into-the-forest-together',
  slug: 'into-the-forest-together',
  title: 'Into the Forest, Together',
  category: 'Journal',
  date: '2026-09-27',
  location: 'Rural China',
  excerpt: 'A group of young people move beyond observation and take part in the patient, practical work of caring for a local forest.',
  coverImage: forestTogetherImages.hero,
  content: `The forest received the group with wet ground, close-growing bamboo and a canopy that softened the daylight. Before any work began, there was time to gather, listen and understand how to move through the landscape with care.

Tools and gloves changed the nature of the visit. The young participants were no longer walking through the forest only to admire it. They were joining practical work already taking place there—learning by watching, asking and working alongside one another.

The day did not promise a dramatic transformation. Its value was found in smaller actions: looking closely, handling the forest carefully and discovering that protection depends on attention repeated over time.`,
  pageContent: {
    meta: {
      category: 'Journal',
      location: 'Rural China',
      publishedDate: '2026-09-27',
      excerpt: 'A group of young people move beyond observation and take part in the patient, practical work of caring for a local forest.',
    },
    opening: {
      contextLabel: 'Field Journal',
      placeLabel: 'Place',
      chapterLabel: 'Chapter',
      recordedLabel: 'Published',
      paragraphs: [
        'The forest received the group with wet ground, close-growing bamboo and a canopy that softened the daylight. Before any work began, there was time to gather, listen and understand how to move through the landscape with care.',
        'Tools and gloves changed the nature of the visit. The young participants were no longer walking through the forest only to admire it. They were joining practical work already taking place there—learning by watching, asking and working alongside one another.',
        'The day did not promise a dramatic transformation. Its value was found in smaller actions: looking closely, handling the forest carefully and discovering that protection depends on attention repeated over time.',
      ],
    },
    inside: {
      eyebrow: 'Inside the Forest',
      title: 'Learning begins with attention',
      context: 'A forest is not simply a view. It is a living system of trees, bamboo, ground plants, birds, insects, weather and countless relationships that are not immediately visible.',
      body: 'Moving carefully through it means learning to notice before deciding what to do. The work begins with listening to people who know the place and understanding that every action belongs to a much longer process.',
      images: [forestTogetherImages.arriving, forestTogetherImages.handsAtWork],
      backgroundColor: '#d9ddcf',
    },
    quote: {
      eyebrow: 'Taking Part',
      quote: 'Care becomes real when attention turns into participation.',
      body: 'The day was shaped by shared work rather than spectacle. Each person contributed through simple, practical actions and learned that caring for a landscape is rarely a single heroic gesture.',
      images: [forestTogetherImages.forestDevice, forestTogetherImages.toolsInForest],
      backgroundColor: '#e7dfd1',
    },
    closing: {
      eyebrow: 'What We Carry Back',
      title: 'Leaving with a different way of seeing',
      paragraphs: [
        'The forest did not become a finished story by the end of the day. It remained complex, living and larger than any one visit.',
        'What changed was the relationship of the participants to the place. Observation had become involvement, and a distant idea of conservation had become a series of real actions carried out together.',
        'For TreeThousands, this is what it means to come closer: not to claim a place, but to understand more of what it asks from us.',
      ],
      image: forestTogetherImages.landscape,
      backgroundColor: '#cbd2c2',
    },
    related: { eyebrow: 'Continue Reading', title: 'More from the Field', backgroundColor: '#e5ddcf' },
    navigation: { previousLabel: '← Previous Story', nextLabel: 'Next Story →', backgroundColor: '#17352d', textColor: '#ffffff' },
    page: { backgroundColor: '#f2eee5', textColor: '#1b2822', accentColor: '#7d583e' },
    contentBlocks: [
      {
        id: 'forest-entering', type: 'our-story-sheet', eyebrow: '01 — Entering the Forest', title: 'The day begins by slowing down.',
        body: [
          'The group arrived beneath a dense canopy after rain. Bamboo leaned over the narrow route, moss held moisture against the trunks, and the uneven ground asked everyone to pay attention to each step.',
          'Before tools were lifted, there was time to gather and listen. Entering the forest was not treated as an arrival at an attraction. It was the beginning of learning how to be present in a living place without assuming that it existed for us.',
        ], quote: '', images: [forestTogetherImages.arriving], captions: ['Gathering at the edge of the forest'], backgroundColor: '#dde0d3', textColor: '#1b2822', accentColor: '#76543b', imageSide: 'right', imageFit: 'cover', visible: true,
      },
      {
        id: 'forest-looking-closely', type: 'story-spread', eyebrow: '02 — Learning to Look More Closely', title: 'A forest reveals itself through relationships.',
        body: [
          'At first, the landscape seemed to be made almost entirely of green. Looking longer brought out its many layers: slender bamboo above the path, ferns close to the soil, moss on the trunks and brief movements among the leaves.',
          'The bird in the undergrowth was a reminder that human activity is only one part of the forest. Caring for this place begins with recognising the lives already moving through it, including those we may notice for only a moment.',
        ], quote: '', images: [forestTogetherImages.bambooPath, forestTogetherImages.bird], captions: ['Bamboo and ground plants along the route', 'A small forest resident among the leaves'], backgroundColor: '#f2eee5', textColor: '#1b2822', accentColor: '#7d583e', imageSide: 'left', imageFit: 'cover', visible: true,
      },
      {
        id: 'forest-participants', type: 'home-edge-rows', eyebrow: '03 — From Visitors to Participants', title: 'Gloves and tools change the meaning of the visit.',
        body: [
          'It is possible to walk through a forest and remain outside its story. Participation begins when observation is joined by responsibility: listening to instructions, handling plants carefully and contributing to the work that the day requires.',
          'No one needed to arrive as an expert. The group learned through demonstration and repetition, watching how others worked and finding a useful place within the shared task.',
        ], quote: '', images: [forestTogetherImages.handsAtWork], captions: ['Young participants working together on the forest floor'], backgroundColor: '#d4d8ca', textColor: '#1b2822', accentColor: '#76543b', imageSide: 'left', imageFit: 'cover', visible: true,
      },
      {
        id: 'forest-work-details', type: 'magazine-contact-sheet', eyebrow: '04 — The Work Is in the Details', title: 'Small actions, repeated with care.',
        body: [
          'Forest care is not a single dramatic gesture. It is made from practical movements: holding, clearing, carrying, checking and pausing to make sure the work is being done carefully.',
          'Seen up close, these actions show another side of environmental participation. Progress depends less on speed than on attention, cooperation and a willingness to keep learning from the place and from one another.',
        ], quote: '', images: [forestTogetherImages.handsAtWork, forestTogetherImages.lookingClosely, forestTogetherImages.forestDevice, forestTogetherImages.toolsInForest, forestTogetherImages.arriving, forestTogetherImages.bambooPath], captions: ['Working close to the ground', 'Reading the condition of the forest', 'Careful work around an existing tree', 'Tools carried into the forest', 'Gathering before the work', 'The landscape around the activity'], backgroundColor: '#ddd4c5', textColor: '#1b2822', accentColor: '#74482f', imageSide: 'right', imageFit: 'cover', visible: true,
      },
      {
        id: 'forest-what-belongs', type: 'our-story-quote', eyebrow: '05 — Working with What Is Here', title: 'Care begins before change.',
        body: [
          'The purpose of entering a forest is not to make it look tidier for a photograph. A healthy landscape has its own complexity, and meaningful work must begin by understanding what should remain, what requires attention and why.',
          'That is why participation needs guidance. The group followed the work already taking place rather than imposing a new plan on the forest. The day became an exercise in restraint as much as action.',
        ], quote: 'To care for a place, we first have to notice what already belongs there.', images: [forestTogetherImages.lookingClosely], captions: ['Looking closely before acting'], backgroundColor: '#1f382f', textColor: '#f3efe6', accentColor: '#d3aa86', imageSide: 'right', imageFit: 'cover', visible: true,
      },
      {
        id: 'forest-presence', type: 'our-story-closing', eyebrow: '06 — Protection Through Presence', title: 'Some work is quiet and meant to continue.',
        body: [
          'One small device fixed carefully to a tree suggested another part of caring for the forest: observation over time. Protection depends on returning, recording change and paying attention beyond the span of a single visit.',
          'The most visible part of the day was the group at work. The deeper lesson was that the forest will continue after everyone leaves. Responsible participation respects that longer timeline.',
        ], quote: '', images: [forestTogetherImages.forestDevice], captions: ['A device placed carefully against a forest tree'], backgroundColor: '#e8e1d5', textColor: '#1b2822', accentColor: '#7d583e', imageSide: 'left', imageFit: 'cover', visible: true,
      },
      {
        id: 'forest-shared-day', type: 'story-photo-quote', eyebrow: '07 — A Day Shared in the Forest', title: 'Work creates its own kind of connection.',
        body: [
          'Between instructions and practical tasks, the group found time to talk, laugh and encourage one another. These lighter moments did not sit outside the work; they helped make continued participation possible.',
          'A shared day in the forest allowed people to know the landscape through one another. Questions could be asked, uncertainty could be admitted, and unfamiliar work became something learned collectively rather than performed alone.',
        ], quote: 'Participation is not only what we do for a place. It is also how we learn to work alongside others.', images: [forestTogetherImages.together, forestTogetherImages.toolsInForest], captions: ['A pause between tasks', 'The group together among the trees'], backgroundColor: '#263a31', textColor: '#f4f0e7', accentColor: '#d3aa86', imageSide: 'left', imageFit: 'cover', visible: true,
      },
      {
        id: 'forest-carry-back', type: 'magazine-full-bleed', eyebrow: '08 — What We Carry Back', title: 'The forest remains larger than a single day.',
        body: [], quote: '', images: [forestTogetherImages.landscape], captions: ['The wider forest beyond the day’s work'], backgroundColor: '#cbd2c2', textColor: '#f4f0e7', accentColor: '#d3aa86', imageSide: 'right', imageFit: 'cover', visible: true,
      },
    ],
  },
}, {
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
    contentBlocks: [],
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
    contentBlocks: [
      {
        id: 'beyond-arriving-with-time', type: 'our-story-sheet', eyebrow: '01 — Arriving with Time', title: 'Understanding begins after arrival.',
        body: [
          'There is a difference between reaching a place and beginning to understand it. Arrival can be measured by distance and time. Understanding grows more slowly, through attention to the road, the weather, the work of the day, and the people who already know this place as home.',
          'For TreeThousands, immersive travel does not mean travelling farther in search of somewhere untouched. It means giving a place enough time to become more than a view. We walk without rushing, listen before explaining, and allow everyday life to set the pace.',
        ], quote: '', images: ['/images/why-we-started/entering-the-village.jpg'], captions: ['Entering the village on foot'], backgroundColor: '#e3ddd0', textColor: '#1b2822', accentColor: '#8d5b3f', imageSide: 'right', imageFit: 'cover', visible: true,
      },
      {
        id: 'beyond-itinerary', type: 'home-edge-rows', eyebrow: '02 — Beyond the Itinerary', title: 'A route can guide us. It cannot tell the whole story.',
        body: [
          'An itinerary can name the next stop, but it cannot predict which details will make a place memorable. A change in weather may slow the walk. A doorway may become the beginning of a conversation. A road that appears ordinary on a map may reveal how homes, fields and forests belong to one another.',
          'Travelling deeply means leaving room for these moments. The aim is not to collect more places in a day, but to notice what a faster journey would have passed without seeing.',
        ], quote: '', images: ['/images/what-we-believe/documenting-the-process.jpg'], captions: ['Walking and recording along the road'], backgroundColor: '#f3efe6', textColor: '#1b2822', accentColor: '#8d5b3f', imageSide: 'left', imageFit: 'cover', visible: true,
      },
      {
        id: 'beyond-not-performance', type: 'story-spread', eyebrow: '03 — Life Is Not a Performance', title: 'The village continues before and after we pass through.',
        body: [
          'Meals are prepared, work continues, neighbours speak, animals cross the road, and doors open and close throughout the day. None of this begins for the benefit of a visitor. Local life is not something arranged for us. It is something we are invited to approach with care.',
          'That distinction matters. We are not looking for a staged version of rural China. We are learning to notice the place as it is already being lived, without turning every ordinary moment into a spectacle.',
        ], quote: '', images: ['/images/what-we-believe/preparing-together.jpg', '/images/what-we-believe/place-and-life.jpg'], captions: ['', ''], backgroundColor: '#d7d8cc', textColor: '#1b2822', accentColor: '#74482f', imageSide: 'left', imageFit: 'cover', visible: true,
      },
      {
        id: 'beyond-listening', type: 'our-story-closing', eyebrow: '04 — Listening Before Photographing', title: 'Attention comes before the record.',
        body: [
          'A camera can preserve a scene, but it cannot replace the conversation around it. Before photographing, we need to understand whether a moment is ours to record and how the people within it wish to be seen.',
          'Sometimes care means asking a question and staying long enough to hear the answer. Sometimes it means waiting for an invitation. At other times, it means putting the camera away. Immersion is not access without limits; it is attention guided by respect.',
        ], quote: '', images: ['/images/what-we-believe/listening-first.jpg'], captions: ['A roadside conversation'], backgroundColor: '#eee5d8', textColor: '#1b2822', accentColor: '#8d5b3f', imageSide: 'right', imageFit: 'cover', visible: true,
      },
      {
        id: 'beyond-taking-part', type: 'explore-visual', eyebrow: '05 — Taking Part', title: 'From seeing what is here to understanding what is happening.',
        body: [
          'Participation changes the question from “What can I see here?” to “What is happening here, and how can I take part respectfully?” The answer might be found in a walk through the village, a conversation at a doorway, time shared around a table, or practical work carried out alongside others.',
          'Taking part does not mean pretending to become local. We remain visitors. The difference is that we are no longer satisfied with observing from a distance when there is an appropriate way to listen, contribute and learn.',
        ], quote: '', images: ['/images/what-we-believe/taking-part.jpg', '/images/what-we-believe/at-the-doorway.jpg', '/images/what-we-believe/already-here.jpg'], captions: ['', '', ''], backgroundColor: '#f4f0e7', textColor: '#1b2822', accentColor: '#8d5b3f', imageSide: 'left', imageFit: 'cover', visible: true,
      },
      {
        id: 'beyond-ordinary-story', type: 'explore-details', eyebrow: '06 — The Ordinary Holds the Story', title: 'Meaning gathers in the moments between destinations.',
        body: [
          'A meaningful day does not require a dramatic event. It may be held in the time spent at a doorway, in people gathering inside a familiar room, or in the changing relationship between a road, a house and the landscape around them.',
          'These moments are easy to overlook because they are ordinary. Seen together, they reveal how a place is used, remembered and shared. They also remind us that travelling deeply is less about seeking spectacle than learning how to pay attention.',
        ], quote: '', images: ['/images/what-we-believe/everyday-company.jpg', '/images/what-we-believe/people-not-background.jpg', '/images/what-we-believe/the-work-stays-open.jpg', '/images/what-we-believe/preparing-together.jpg', '/images/what-we-believe/place-and-life.jpg', '/images/what-we-believe/already-here.jpg'], captions: ['Time shared indoors', 'People within the place', 'The road through the village', 'Everyday life along the road', 'Homes within the landscape', 'An existing space seen closely'], backgroundColor: '#ddd3c4', textColor: '#1b2822', accentColor: '#74482f', imageSide: 'right', imageFit: 'cover', visible: true,
      },
      {
        id: 'beyond-learning-through-people', type: 'story-photo-quote', eyebrow: '07 — Learning Through People', title: 'Many lives share the same place.',
        body: [
          'No village can be reduced to a single image or a single explanation. Different generations, households and experiences meet within the same landscape. Listening to people does not give us ownership of their stories; it helps us recognise how partial our own view has been.',
          'The goal is not to leave believing that a short visit has explained everything. It is to understand more carefully, hold several perspectives at once, and resist replacing a complex place with one convenient story.',
        ], quote: 'A village is never one story. It is many lives sharing the same place.', images: ['/images/what-we-believe/at-the-doorway.jpg', '/images/what-we-believe/listening-first.jpg'], captions: ['Conversation at a village doorway', 'Listening before recording'], backgroundColor: '#20392f', textColor: '#f4f0e7', accentColor: '#d3aa86', imageSide: 'left', imageFit: 'cover', visible: true,
      },
      {
        id: 'beyond-what-stays', type: 'story-closing', eyebrow: '08 — What Stays After the Journey', title: 'Leave with a deeper understanding—not a simplified story.',
        body: [
          'The value of an immersive journey is not how much of a place we can claim to know, but how carefully we learn to see it. A thoughtful visit should leave us with more detail, more respect and fewer assumptions than we brought with us.',
          'This is the kind of travel TreeThousands wants to make possible: coming closer without claiming ownership, taking part where participation is welcomed, and allowing what we learn to change the way we understand rural China.',
          'Come closer. Take part. Carry the complexity of the place with you.',
        ], quote: '', images: ['/images/what-we-believe/everyday-company.jpg'], captions: ['Everyday life continuing in a familiar room'], backgroundColor: '#cbd1c1', textColor: '#1b2822', accentColor: '#74482f', imageSide: 'left', imageFit: 'cover', visible: true,
      },
    ],
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
    contentBlocks: [],
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
    navigation: { ...defaults.navigation, ...(page.navigation ?? {}) }, page: { ...defaults.page, ...(page.page ?? {}) }, contentBlocks: normalizeEditorialBlocks(page.contentBlocks),
  };
}
