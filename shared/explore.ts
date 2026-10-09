import { normalizeEditorialBlocks, type EditorialBlock } from './editorial-blocks';

export interface ExploreLinkCard { title: string; description: string; href: string; image: string }
export interface ExploreStoryCard { category: string; title: string; href: string; image: string }
export interface ExploreDetailCard { title: string; image: string }
export type ExploreActivityStatus = 'planning' | 'open' | 'seasonal' | 'full' | 'completed';
export interface ExploreActivityInfo {
  enabled: boolean;
  type: string;
  status: ExploreActivityStatus;
  statusLabel: string;
  dateLabel: string;
  duration: string;
  groupSize: string;
  difficulty: string;
  location: string;
  registrationLabel: string;
  registrationHref: string;
  note: string;
}

export interface ExplorePageContent {
  homepageCard: { title: string; image: string };
  activity: ExploreActivityInfo;
  hero: { eyebrow: string; title: string; subtitle: string; image: string; backgroundColor: string; overlayOpacity: number };
  introduction: { eyebrow: string; text: string; backgroundColor: string; textColor: string };
  visual: { eyebrow: string; title: string; paragraphs: string[]; images: string[]; backgroundColor: string };
  details: { eyebrow: string; title: string; description: string; backgroundColor: string; items: ExploreDetailCard[] };
  statement: { eyebrow: string; text: string; backgroundColor: string; textColor: string };
  perspectives: { eyebrow: string; title: string; backgroundColor: string; selectedStoryIds: number[]; items: ExploreLinkCard[] };
  stories: { eyebrow: string; title: string; viewAllLabel: string; viewAllHref: string; backgroundColor: string; selectedStoryIds: number[]; items: ExploreStoryCard[] };
  cta: { eyebrow: string; title: string; buttonLabel: string; buttonHref: string; backgroundColor: string; textColor: string; buttonBackgroundColor: string; buttonTextColor: string; textureImage: string; textureOpacity: number };
  contentBlocks: EditorialBlock[];
}

const images = [
  '', '', '', '', '', '',
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
  'build-with-what-is-already-here': {
    title: 'Build With What Is Already Here', subtitle: 'Take part in the careful repair of an existing village house, working with its materials, its character and the people who understand it.',
    introduction: 'This is an invitation to join work already taking place in the village. Rather than arriving to replace an old house with a new idea, we begin by reading what can remain, what needs attention and how the space might become useful again.',
    statement: 'To build together is first to understand what is already here.', details: ['Existing House', 'Roof & Structure', 'Local Materials', 'Working Hands', 'Shared Meals', 'Future Use'],
  },
};

export const defaultExploreSlugs = ['village-life', 'nature-landscape', 'people-culture', 'build-with-what-is-already-here'];

const emptyActivity: ExploreActivityInfo = {
  enabled: false, type: '', status: 'planning', statusLabel: 'By Arrangement', dateLabel: 'Arranged around the project and participants',
  duration: 'Flexible', groupSize: 'Small group', difficulty: 'Adapted to participants', location: 'Rural China',
  registrationLabel: 'Register Your Interest', registrationHref: '/join-us/contact',
  note: 'Participation is arranged according to the current stage of the work and the needs, interests and availability of each group.',
};

const houseImages = {
  hero: '/images/stories/working-with-what-is-already-here/before-exterior.jpg',
  roofWide: '/images/stories/working-with-what-is-already-here/roof-wide.jpg',
  roofCheck: '/images/stories/working-with-what-is-already-here/roof-check.jpg',
  roofTogether: '/images/stories/working-with-what-is-already-here/roof-together.jpg',
  interior: '/images/stories/working-with-what-is-already-here/interior-lit.jpg',
  worktable: '/images/stories/working-with-what-is-already-here/worktable.jpg',
  carpenterWindow: '/images/stories/working-with-what-is-already-here/carpenter-window.jpg',
  carpenterMachine: '/images/stories/working-with-what-is-already-here/carpenter-machine.jpg',
  transitionWall: '/images/stories/working-with-what-is-already-here/transition-wall.jpg',
  sandingWall: '/images/stories/working-with-what-is-already-here/sanding-wall.jpg',
};

export function createDefaultExplorePage(slug: string): ExplorePageContent {
  const copy = PAGE_COPY[slug] ?? PAGE_COPY['village-life'];
  const pageIndex = Math.max(0, defaultExploreSlugs.indexOf(slug));
  if (slug === 'build-with-what-is-already-here') return {
    homepageCard: { title: 'Build Together', image: houseImages.hero },
    activity: { ...emptyActivity, enabled: true, type: 'Build Together', status: 'open', statusLabel: 'Ongoing · By Arrangement', location: 'A village in rural China' },
    hero: { eyebrow: 'Explore / Build Together', title: copy.title, subtitle: copy.subtitle, image: houseImages.hero, backgroundColor: '#17352d', overlayOpacity: 48 },
    introduction: { eyebrow: 'An invitation to take part', text: copy.introduction, backgroundColor: '#f3efe6', textColor: '#17251f' },
    visual: { eyebrow: 'The work in context', title: 'Repair begins with attention.', paragraphs: [], images: [], backgroundColor: '#f3efe6' },
    details: { eyebrow: 'Activity Details', title: 'What participation involves', description: 'The content and pace are adapted to the current work and to each participating group.', backgroundColor: '#e5ddce', items: copy.details.map(title => ({ title, image: houseImages.hero })) },
    statement: { eyebrow: 'A way of working', text: copy.statement, backgroundColor: '#17352d', textColor: '#f5f1e8' },
    perspectives: { eyebrow: 'Continue Exploring', title: 'How We Work', backgroundColor: '#f7f3eb', selectedStoryIds: [], items: [
      { title: 'The Existing House', description: 'Read the field story behind the repair process and the decisions already underway.', href: '/stories/article/working-with-what-is-already-here', image: houseImages.interior },
      { title: 'Village Life', description: 'Look more closely at the everyday spaces and rhythms surrounding the work.', href: '/explore/village-life', image: houseImages.hero },
      { title: 'People & Culture', description: 'Meet living knowledge through people, materials and practiced hands.', href: '/explore/people-culture', image: houseImages.carpenterWindow },
    ] },
    stories: { eyebrow: 'From the Journal', title: 'Related Stories', viewAllLabel: 'View all stories →', viewAllHref: '/stories', backgroundColor: '#ffffff', selectedStoryIds: [], items: [
      { category: 'Journal', title: 'Working With What Is Already Here', href: '/stories/article/working-with-what-is-already-here', image: houseImages.hero },
    ] },
    cta: { eyebrow: 'Take Part', title: 'Interested in building alongside us?', buttonLabel: 'Register Your Interest', buttonHref: '/join-us/contact', backgroundColor: '#a16140', textColor: '#ffffff', buttonBackgroundColor: '#111111', buttonTextColor: '#ffffff', textureImage: '', textureOpacity: 25 },
    contentBlocks: [
      { id:'build-why-here',type:'our-story-sheet',eyebrow:'01 — Why This House',title:'The activity begins with a place already carrying a history of use.',body:['The house stands within the existing fabric of the village. Its roof, timber, windows and plaster have been shaped by weather, repair and everyday life. Before inviting others to participate, we first ask what the building can still tell us.','This activity is connected to ongoing work rather than created as a one-day performance. Participants will enter a real process whose priorities are set by the condition of the house and the people working with it.'],quote:'',images:[houseImages.hero],captions:['The existing village house before repair work'],backgroundColor:'#ddd8cc',textColor:'#1b2822',accentColor:'#805b3e',imageSide:'right',imageFit:'cover',visible:true },
      { id:'build-what-doing',type:'story-spread',eyebrow:'02 — What We Are Doing',title:'Repairing what can remain and preparing the house for another use.',body:['The work includes understanding the roof and structure, preparing existing surfaces, working with timber and organising the space as each stage develops. The exact tasks change with the condition of the building.','Participation will follow the real sequence of the work. No task will be added simply to entertain visitors, and specialist work will remain with experienced craftspeople.'],quote:'',images:[houseImages.roofWide,houseImages.transitionWall],captions:['Repair work beginning at the roof','New work meeting the existing interior'],backgroundColor:'#f2ece2',textColor:'#1b2822',accentColor:'#76503a',imageSide:'left',imageFit:'cover',visible:true },
      { id:'build-participation',type:'explore-visual',eyebrow:'03 — How You May Take Part',title:'Useful participation starts with listening and working within clear limits.',body:['Depending on the stage of work, participants may help organise reusable materials, prepare simple surfaces, support site documentation or assist with practical tasks identified by the project team.','A briefing will explain the house, the day’s work and which tasks are appropriate. Activities involving structural risk, machinery or specialist judgement will not be assigned to general participants.'],quote:'',images:[houseImages.worktable,houseImages.sandingWall,houseImages.roofTogether],captions:['Materials and tools within the working room','Preparing an existing surface','Working together on the roof'],backgroundColor:'#d5d3c8',textColor:'#1b2822',accentColor:'#7c5c3e',imageSide:'right',imageFit:'cover',visible:true },
      { id:'build-day',type:'magazine-columns',eyebrow:'04 — Shaping Your Participation',title:'The arrangement follows the work, the weather and the needs of the group.',body:['Participation can be shaped around the time available, the current stage of the house and what each person is comfortable contributing. A visit may combine a site introduction, practical work, observation, documentation and a shared break.','There is no single fixed programme. Before arrival, we discuss the group’s interests, physical needs and expectations, then match them with work that is genuinely useful and appropriate at that moment.'],quote:'The aim is not to complete the most tasks, but to contribute carefully to work that continues after the visit ends.',images:[houseImages.interior],captions:['The house functioning as an active work site'],backgroundColor:'#e8e0d3',textColor:'#1b2822',accentColor:'#805b3e',imageSide:'left',imageFit:'cover',visible:true },
      { id:'build-knowledge',type:'story-photo-quote',eyebrow:'05 — Working Alongside Knowledge',title:'The people who understand the materials remain at the centre.',body:['Local craftspeople and project workers bring practical knowledge of timber, tile, tools and the existing building. Participation means working within that knowledge rather than arriving with ready-made solutions.','Observation is part of the activity. Watching how a board is read, how an opening is measured or how an old surface is prepared can reveal why responsible repair depends on judgement as much as effort.'],quote:'Building together does not mean everyone does the same work. It means every role respects the knowledge the work requires.',images:[houseImages.carpenterWindow,houseImages.carpenterMachine],captions:['Timber carried through the existing structure','Carpentry work inside the house'],backgroundColor:'#21372f',textColor:'#f4f0e7',accentColor:'#d4ae89',imageSide:'left',imageFit:'cover',visible:true },
      { id:'build-prepare',type:'explore-details',eyebrow:'06 — Before You Join',title:'Preparation is part of taking care of the place and one another.',body:['Participants should expect an active work site, uneven surfaces, dust and changing weather. Closed footwear, practical clothing and attention to the site briefing will be essential. Final physical requirements and equipment will be confirmed for each date.','Photography must respect the people working nearby and the private spaces around the house. Participation does not grant automatic access to every room, home or village interaction.'],quote:'',images:[houseImages.roofCheck,houseImages.worktable,houseImages.interior,houseImages.sandingWall,houseImages.carpenterWindow,houseImages.transitionWall],captions:['Checking existing roof materials','Tools and materials in use','An active interior work space','Preparing an older surface','Working with timber','Old and new surfaces meeting'],backgroundColor:'#eee7db',textColor:'#1b2822',accentColor:'#79583c',imageSide:'right',imageFit:'cover',visible:true },
      { id:'build-principles',type:'explore-statement',eyebrow:'07 — Our Shared Principle',title:'We are not arriving to replace a village with our idea of what it should become.',body:[],quote:'',images:[],captions:[],backgroundColor:'#17352d',textColor:'#f5f1e8',accentColor:'#d4ae89',imageSide:'left',imageFit:'cover',visible:true },
      { id:'build-future',type:'story-closing',eyebrow:'08 — What Comes After',title:'Each visit contributes to work that continues over time.',body:['A co-building activity is one moment within a longer process. The work begins before participants arrive and continues after they leave. Its purpose is not a dramatic before-and-after image, but a house that can support another chapter of use.','Registering interest begins a conversation rather than reserving a fixed departure. We learn about your available time, group, interests and practical needs, then suggest a form of participation that fits the project’s current stage.','To build together is to contribute without taking over—to leave the house more useful while allowing it to remain part of the place around it.'],quote:'',images:[houseImages.transitionWall],captions:['The repaired space continuing to take shape'],backgroundColor:'#c8d0c1',textColor:'#1b2822',accentColor:'#76503a',imageSide:'left',imageFit:'cover',visible:true },
    ],
  };
  return {
    homepageCard: { title: copy.title, image: images[(pageIndex % 3) + 1] },
    activity: { ...emptyActivity },
    hero: { eyebrow: 'Explore', title: copy.title, subtitle: copy.subtitle, image: images[0], backgroundColor: '#17352d', overlayOpacity: 58 },
    introduction: { eyebrow: `Explore / ${copy.title}`, text: copy.introduction, backgroundColor: '#f5f1e8', textColor: '#17251f' },
    visual: { eyebrow: 'A closer look', title: 'Life happens between the landmarks.', paragraphs: ['A place reveals itself gradually: in footsteps at first light, a meal prepared without hurry, and neighbours stopping to exchange a few words.', 'These moments are small, but together they form the character of a place—and the feeling of being welcomed into it.'], images: [images[1], images[2], images[3]], backgroundColor: '#f5f1e8' },
    details: { eyebrow: 'Moments / Details', title: 'The small things', description: 'Fragments of daily life, noticed slowly and remembered long after.', backgroundColor: '#e5ddce', items: copy.details.map((title, index) => ({ title, image: images[(index + 1) % images.length] })) },
    statement: { eyebrow: 'A way of seeing', text: copy.statement, backgroundColor: '#17352d', textColor: '#f5f1e8' },
    perspectives: { eyebrow: 'Explore Further', title: 'Related Perspectives', backgroundColor: '#f7f3eb', selectedStoryIds: [], items: [
      { title: 'Everyday Moments', description: 'The gestures, routines, and pauses that give each day its shape.', href: '/stories/local-life', image: images[2] },
      { title: 'People', description: 'Portraits of the people who hold local knowledge, memory, and humour.', href: '/explore/people-culture', image: images[3] },
      { title: 'Local Details', description: 'The textures and objects that make a place quietly distinctive.', href: '/stories/village-notes', image: images[4] },
    ] },
    stories: { eyebrow: 'From the journal', title: 'Related Stories', viewAllLabel: 'View all stories →', viewAllHref: '/stories', backgroundColor: '#ffffff', selectedStoryIds: [], items: [
      { category: 'Village Notes', title: 'Morning begins before the village wakes', href: '/stories', image: images[1] },
      { category: 'Local Life', title: 'What a shared table can tell us', href: '/stories', image: images[4] },
      { category: 'Journal', title: 'Following the path home', href: '/stories', image: images[5] },
    ] },
    cta: { eyebrow: 'Continue the journey', title: 'There is always another side to discover.', buttonLabel: 'Explore More Stories', buttonHref: '/stories', backgroundColor: '#a16140', textColor: '#ffffff', buttonBackgroundColor: '#111111', buttonTextColor: '#ffffff', textureImage: '', textureOpacity: 25 },
    contentBlocks: [],
  };
}

export function normalizeExplorePage(value: unknown, slug: string): ExplorePageContent {
  const defaults = createDefaultExplorePage(slug);
  if (typeof value === 'string') { try { value = JSON.parse(value); } catch { return defaults; } }
  if (!value || typeof value !== 'object') return defaults;
  const page = value as Partial<ExplorePageContent>;
  return {
    homepageCard: { ...defaults.homepageCard, ...(page.homepageCard ?? {}) },
    activity: { ...defaults.activity, ...(page.activity ?? {}) },
    hero: { ...defaults.hero, ...(page.hero ?? {}) },
    introduction: { ...defaults.introduction, ...(page.introduction ?? {}) },
    visual: { ...defaults.visual, ...(page.visual ?? {}), paragraphs: page.visual?.paragraphs ?? defaults.visual.paragraphs, images: page.visual?.images ?? defaults.visual.images },
    details: { ...defaults.details, ...(page.details ?? {}), items: page.details?.items?.length ? page.details.items : defaults.details.items },
    statement: { ...defaults.statement, ...(page.statement ?? {}) },
    perspectives: { ...defaults.perspectives, ...(page.perspectives ?? {}), selectedStoryIds: page.perspectives?.selectedStoryIds ?? [], items: page.perspectives?.items?.length ? page.perspectives.items : defaults.perspectives.items },
    stories: { ...defaults.stories, ...(page.stories ?? {}), selectedStoryIds: page.stories?.selectedStoryIds ?? [], items: page.stories?.items?.length ? page.stories.items : defaults.stories.items },
    cta: { ...defaults.cta, ...(page.cta ?? {}) },
    contentBlocks: normalizeEditorialBlocks(page.contentBlocks),
  };
}

export const defaultExploreSections = defaultExploreSlugs.map((slug, sortOrder) => ({ slug, title: PAGE_COPY[slug].title, pageContent: createDefaultExplorePage(slug), isVisible: true, sortOrder }));
