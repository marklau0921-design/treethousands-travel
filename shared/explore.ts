import { normalizeEditorialBlocks, type EditorialBlock } from './editorial-blocks';

export interface ExploreLinkCard { title: string; description: string; href: string; image: string }
export interface ExploreStoryCard { category: string; title: string; href: string; image: string }
export interface ExploreDetailCard { title: string; image: string }
export const EXPLORE_CATEGORIES = ['Village Life', 'Nature & Landscape', 'People & Culture'] as const;
export type ExploreCategory = (typeof EXPLORE_CATEGORIES)[number];
export const exploreCategorySlug: Record<ExploreCategory, string> = { 'Village Life': 'village-life', 'Nature & Landscape': 'nature-landscape', 'People & Culture': 'people-culture' };
export type ExploreActivityStatus = 'planning' | 'open' | 'seasonal' | 'full' | 'completed';
export interface ExploreActivityDetail {
  category: ExploreCategory;
  excerpt: string;
  gallery: string[];
  purpose: { eyebrow: string; title: string; paragraphs: string[]; image: string };
  currentWork: { eyebrow: string; title: string; paragraphs: string[]; images: string[] };
  participation: { eyebrow: string; title: string; introduction: string; items: Array<{ title: string; description: string }> };
  fit: { eyebrow: string; title: string; introduction: string; items: string[] };
  flexibility: { eyebrow: string; title: string; paragraphs: string[]; points: string[]; image: string };
  people: { eyebrow: string; title: string; paragraphs: string[]; images: string[] };
  practical: { eyebrow: string; title: string; introduction: string; items: Array<{ title: string; description: string }> };
  principles: { eyebrow: string; title: string; items: string[] };
  closing: { eyebrow: string; title: string; paragraphs: string[]; image: string };
  roles: { eyebrow: string; title: string; footer: string; linkLabel: string; items: Array<{ title: string; description: string; icon: string }> };
  purposeStory: { eyebrow: string; title: string; paragraphs: string[]; quote: string; mainImage: string; insetImage: string };
  placeStory: { eyebrow: string; title: string; introduction: string; paragraphs: string[]; image: string };
}
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
  activityDetail?: ExploreActivityDetail;
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
  'pick-tea-with-local-growers': {
    title: 'Pick Tea With Local Growers', subtitle: 'Walk into the tea hills of Ya’an, learn how tender leaves are chosen and follow the journey from hillside to cup.',
    introduction: 'Tea begins long before it reaches a table. This seasonal activity follows the working rhythm of a tea-growing day: reading the slope, learning which leaves are ready, picking alongside local growers and seeing how fresh leaves begin their transformation.',
    statement: 'The landscape becomes more meaningful when we understand the hands and knowledge that continue to shape it.', details: ['Tea Hills', 'Seasonal Picking', 'Local Knowledge', 'Fresh Leaves', 'Traditional Making', 'Shared Tea'],
  },
  'walk-beneath-four-sisters': {
    title: 'Walk Beneath the Four Sisters', subtitle: 'A slow highland walk through Changping Valley, where forest, meadow and mountain weather set the pace.',
    introduction: 'This is a day hike shaped around attention rather than distance. We follow an official open route through Changping Valley, allowing time for the body to adjust to altitude and for the landscape to reveal itself gradually.',
    statement: 'The mountain is not a backdrop to conquer, but a place to enter with care.', details: ['Mountain Forest', 'Open Meadow', 'Changing Weather', 'Trail Lunch', 'Local Guidance', 'Slow Return'],
  },
};

export const defaultExploreSlugs = ['village-life', 'nature-landscape', 'people-culture', 'build-with-what-is-already-here', 'pick-tea-with-local-growers', 'walk-beneath-four-sisters'];

const emptyActivity: ExploreActivityInfo = {
  enabled: false, type: '', status: 'planning', statusLabel: 'By Arrangement', dateLabel: 'Arranged around the project and participants',
  duration: 'Flexible', groupSize: 'Small group', difficulty: 'Adapted to participants', location: 'Rural China',
  registrationLabel: 'Register Your Interest', registrationHref: '/join-us/contact',
  note: 'Participation is arranged according to the current stage of the work and the needs, interests and availability of each group.',
};

const defaultActivityDetail: ExploreActivityDetail = {
  category: 'Village Life', excerpt: '', gallery: [],
  purpose: { eyebrow: 'Why This Work Exists', title: '', paragraphs: [], image: '' },
  currentWork: { eyebrow: 'What Is Happening Here', title: '', paragraphs: [], images: [] },
  participation: { eyebrow: 'Ways to Take Part', title: '', introduction: '', items: [] },
  fit: { eyebrow: 'Is This for You?', title: '', introduction: '', items: [] },
  flexibility: { eyebrow: 'Shaped Around You', title: '', paragraphs: [], points: [], image: '' },
  people: { eyebrow: 'Working Alongside', title: '', paragraphs: [], images: [] },
  practical: { eyebrow: 'Before You Join', title: '', introduction: '', items: [] },
  principles: { eyebrow: 'Our Shared Principles', title: '', items: [] },
  closing: { eyebrow: 'Begin a Conversation', title: '', paragraphs: [], image: '' },
  roles: { eyebrow: 'Bring What You Know', title: 'There Is More Than One Way to Help', footer: 'Not sure where you fit? Start with a conversation.', linkLabel: 'Tell Us What You Can Bring →', items: [] },
  purposeStory: { eyebrow: 'Why We Do This', title: '', paragraphs: [], quote: '', mainImage: '', insetImage: '' },
  placeStory: { eyebrow: 'The Place Around the Activity', title: '', introduction: '', paragraphs: [], image: '' },
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

const buildTogetherGallery = Array.from({ length: 12 }, (_, index) => {
  const names = ['house-setting', 'opening-work', 'material-sorting', 'material-detail', 'working-together', 'craft-detail', 'roof-work', 'guided-work', 'hands-material', 'group-roof', 'restoration-progress', 'shared-process'];
  return `/images/explore/build-together/reference/${String(index + 1).padStart(2, '0')}-${names[index]}.jpg`;
});

const teaActivityAsset = '/images/explore/tea-with-growers';
const teaActivityGallery = [
  'YT-20-tea-hills-aerial.png', 'YT-21-learning-to-pick.png', 'YT-22-misty-tea-harvest.png', 'YT-23-group-tea-harvest.png', 'YT-24-spring-field-picking.png',
  'YT-25-wide-tea-landscape.png', 'YT-26-traditional-tea-fire.png', 'YT-27-spreading-fresh-leaves.png', 'YT-28-reading-processed-leaves.png', 'YT-29-tea-maker-portrait.png',
].map(name => `${teaActivityAsset}/${name}`);

const fourSistersActivityAsset = '/images/explore/walk-beneath-four-sisters';
const fourSistersActivityGallery = [
  '01-misty-meadow-hike.jpg', '02-mountain-trail.jpg', '03-moss-forest.jpg', '04-stream-pause.jpg',
  '05-alpine-meadow.jpg', '06-hiking-together.jpg', '07-winter-boardwalk.jpg',
].map(name => `${fourSistersActivityAsset}/${name}`);

export function createDefaultExplorePage(slug: string): ExplorePageContent {
  const copy = PAGE_COPY[slug] ?? PAGE_COPY['village-life'];
  const pageIndex = Math.max(0, defaultExploreSlugs.indexOf(slug));
  if (slug === 'walk-beneath-four-sisters') return {
    homepageCard: { title: 'Walk Beneath the Four Sisters', image: fourSistersActivityGallery[0] },
    activity: {
      ...emptyActivity, enabled: true, type: 'Highland Hiking', status: 'seasonal', statusLabel: 'Seasonal · By Arrangement',
      dateLabel: 'April–November · Weather Dependent', duration: '5–6 hours', groupSize: '4–8 participants', difficulty: 'Moderate · High Altitude',
      location: 'Changping Valley, Xiaojin County, Western Sichuan',
      note: 'A guided day walk on an official open route. The final distance and turning point are confirmed around weather, trail conditions and the group’s response to altitude.',
    },
    activityDetail: {
      category: 'Nature & Landscape',
      excerpt: 'Walk slowly through the forests and meadows of Changping Valley, learning how altitude, weather and attention change the way we meet a mountain landscape.',
      gallery: fourSistersActivityGallery,
      purpose: {
        eyebrow: 'Why This Walk Exists', title: 'A mountain becomes meaningful when we give it time.',
        paragraphs: ['The Four Sisters are often encountered as an image: four sharp summits rising above the valleys of western Sichuan. This walk begins lower down, where water, forest, meadow and changing weather shape the experience long before any distant peak appears.', 'We walk to understand the landscape at human pace. Distance is secondary to acclimatisation, observation and the shared responsibility of moving safely through a highland environment.'],
        image: fourSistersActivityGallery[4],
      },
      currentWork: {
        eyebrow: 'What You Will Experience', title: 'Follow the valley from forest shade toward open mountain light.',
        paragraphs: ['The day begins gently, with time to settle into the altitude and meet the guide. We enter the forest, follow water and timber paths, then continue toward more open ground as weather and group condition allow.', 'A simple trail lunch creates a natural pause. The return begins with enough time for changing afternoon conditions, following the same principle that shapes the whole day: notice first, then move.'],
        images: [fourSistersActivityGallery[2], fourSistersActivityGallery[3]],
      },
      participation: {
        eyebrow: 'The Rhythm of the Day', title: 'Five moments, with room for the mountain to change the plan.', introduction: 'The sequence is consistent, while the exact route and turning point remain responsive to real conditions.',
        items: [
          { title: 'Begin Slowly', description: 'Meet the guide, check equipment and allow breathing and pace to settle at altitude.' },
          { title: 'Enter the Forest', description: 'Walk beneath conifers and moss, listening for water and noticing how the valley holds moisture.' },
          { title: 'Walk With the Landscape', description: 'Move toward open meadow without treating distance or a photo point as the measure of success.' },
          { title: 'Share a Trail Lunch', description: 'Pause somewhere suitable, keep food simple and carry every item back out.' },
          { title: 'Return Before Conditions Turn', description: 'Leave time for a calm descent before afternoon weather or temperature changes.' },
        ],
      },
      fit: {
        eyebrow: 'Is This for You?', title: 'A steady pace matters more than hiking speed.', introduction: 'This is suitable for active travellers who can manage uneven highland paths and are willing to let safety and weather shape the day.',
        items: ['You can walk for several hours on uneven ground with regular pauses.', 'You understand that altitude affects each person differently.', 'You are comfortable changing the route or turning back when the guide advises it.', 'You prefer observation and conversation to rushing between viewpoints.', 'You will remain on the agreed route and respect grazing animals, vegetation and other trail users.'],
      },
      flexibility: {
        eyebrow: 'Shaped Around the Mountain', title: 'The turning point is a decision, not a promise.',
        paragraphs: ['Changping Valley changes quickly. Rain, snow, wind, trail condition and each participant’s response to altitude may shorten or reshape the route. A responsible day leaves space for those decisions.', 'We confirm the plan close to departure and adjust the pace on the trail. The experience remains complete even when the group turns earlier than expected: the purpose is to encounter the valley well, not to collect distance.'],
        points: ['Weather and trail notices', 'Altitude response', 'Group walking pace', 'Daylight and temperature', 'Official route access', 'Transport and meal needs'], image: fourSistersActivityGallery[6],
      },
      people: {
        eyebrow: 'Walking Together', title: 'The group moves at the pace that keeps everyone present.',
        paragraphs: ['A small group makes it possible to notice changes in weather, energy and breathing without turning the walk into a race. The guide sets safety boundaries and helps interpret the route, while every participant communicates honestly about how they feel.', 'Walking together also means making space for quiet. Conversation, photography and rest all belong to the day, but none should interrupt local life or place pressure on another person to keep moving.'],
        images: [fourSistersActivityGallery[0], fourSistersActivityGallery[5]],
      },
      practical: {
        eyebrow: 'Before You Join', title: 'Prepare for altitude and four seasons in one day.', introduction: 'Final guidance is confirmed before departure. These points apply to most walks in Changping Valley.',
        items: [
          { title: 'Physical Level', description: 'Moderate: approximately 7–10 km and 250–350 m of ascent over 5–6 hours, adjusted to conditions.' },
          { title: 'Altitude', description: 'The walk is generally around 3,200–3,500 m. Tell us about medical concerns and never hide symptoms.' },
          { title: 'Weather', description: 'Sun, cloud, rain, wind or snow can arrive quickly. The route may change or be cancelled.' },
          { title: 'What to Wear', description: 'Layered clothing, waterproof outerwear and supportive non-slip walking shoes.' },
          { title: 'What to Bring', description: 'Water, trail lunch, sun protection, warm layer, personal medication and a small day pack.' },
          { title: 'Age & Access', description: 'Recommended from age 14. The route is not wheelchair accessible and is unsuitable for very young children.' },
        ],
      },
      principles: { eyebrow: 'Our Shared Principles', title: 'Walk lightly and leave the valley whole.', items: ['Follow the guide and official open route.', 'Do not approach or feed grazing animals.', 'Carry out everything you carry in.', 'Keep drones and intrusive photography away.', 'Turn back early when conditions require it.'] },
      closing: {
        eyebrow: 'Begin a Conversation', title: 'Tell us when you hope to walk in western Sichuan.',
        paragraphs: ['Share your travel dates, group size, hiking experience and any health or dietary needs. We will check current access and conditions before suggesting the most suitable form of the day.', 'This is not a summit programme, an overnight camp or the Changping-to-Bipeng traverse. It is a carefully paced day inside the open valley, designed to help people meet the mountain with attention.'],
        image: fourSistersActivityGallery[1],
      },
      roles: {
        eyebrow: 'Ways to Join the Day', title: 'There Is More Than One Way to Pay Attention', footer: 'You do not need to be an expert hiker. Bring curiosity, honest communication and respect for the route.', linkLabel: 'Tell Us About Your Group →',
        items: [
          { title: 'Steady Walker', description: 'Move at a sustainable pace and help the group remain together.', icon: 'hands' },
          { title: 'Landscape Observer', description: 'Notice water, forest, weather and seasonal changes along the valley.', icon: 'plant' },
          { title: 'Photographer', description: 'Document the day without leaving the route or directing people and animals.', icon: 'camera' },
          { title: 'Writer / Storyteller', description: 'Record how the landscape changes when it is experienced slowly.', icon: 'writer' },
          { title: 'Naturalist', description: 'Share careful observations while avoiding disturbance or unsupported claims.', icon: 'research' },
          { title: 'Translator', description: 'Help route guidance and conversation remain clear across languages.', icon: 'languages' },
          { title: 'Group Support', description: 'Notice energy, encourage honest rest and help maintain a calm rhythm.', icon: 'group' },
          { title: 'Quiet Companion', description: 'Walk, listen and make space for other people to experience the valley.', icon: 'leaf' },
          { title: 'Trail Lunch Host', description: 'Help make the shared pause simple, low-waste and considerate.', icon: 'cook' },
          { title: 'First-time Highland Walker', description: 'Learn how to pace, layer and communicate at altitude.', icon: 'maker' },
        ],
      },
      purposeStory: {
        eyebrow: 'Why We Walk This Way', title: 'The Mountain Is Not a Backdrop to Conquer.',
        paragraphs: ['Highland travel is often described through achievement: kilometres completed, viewpoints reached and photographs collected. Those measures can make a place feel interchangeable, as if the mountain exists only to confirm that we arrived.', 'This walk offers another relationship. We begin with the body adjusting to altitude, with the sound of water under trees and with attention to weather that may revise every plan. Slowing down is not a compromise; it is how the valley becomes legible.', 'The route passes through a living landscape rather than an empty wilderness. Grazing animals, local knowledge, protected habitats and official access rules all remind us that visitors are temporary. Our freedom to walk depends on accepting boundaries.', 'Tree Thousands designs the day around small groups, honest pacing and the possibility of turning back. A meaningful journey is not defined by how far we reach, but by whether our presence leaves the place—and one another—undiminished.'],
        quote: 'We do not walk through the valley to claim it. We walk so that attention can replace conquest.', mainImage: fourSistersActivityGallery[4], insetImage: fourSistersActivityGallery[2],
      },
      placeStory: {
        eyebrow: 'The Place Around the Walk', title: 'Changping Valley Changes With Altitude, Water and Weather.',
        introduction: 'At the foot of the Four Sisters, a single day can move between moss-dark forest, open meadow, bright sun and sudden mountain cloud.',
        paragraphs: ['The lower valley gathers water beneath conifers and along timber paths. As the canopy opens, broader views appear between meadow, shrubs and grazing ground, but the mountains remain partly concealed and change with every turn in the weather.', 'Altitude makes the landscape physically present. Breathing, temperature and pace become part of how the valley is understood. This is why the route is planned conservatively and why a shorter walk can still hold a complete experience.', 'Season alters both access and character. Spring and summer bring moisture and green growth; autumn sharpens colour and light; early or late snow can transform familiar paths. Every visit must respond to the valley that is actually there that day.'], image: fourSistersActivityGallery[0],
      },
    },
    hero: { eyebrow: 'Explore / Nature & Landscape', title: copy.title, subtitle: copy.subtitle, image: fourSistersActivityGallery[0], backgroundColor: '#ffffff', overlayOpacity: 0 },
    introduction: { eyebrow: 'A slow highland day', text: copy.introduction, backgroundColor: '#ffffff', textColor: '#171717' },
    visual: { eyebrow: 'The experience', title: 'Forest, meadow and changing light.', paragraphs: [], images: [], backgroundColor: '#f5f5f5' },
    details: { eyebrow: 'Activity Details', title: 'What the day may hold', description: 'The route remains responsive to altitude, weather and the group.', backgroundColor: '#f5f5f5', items: copy.details.map((title, index) => ({ title, image: fourSistersActivityGallery[index % fourSistersActivityGallery.length] })) },
    statement: { eyebrow: 'A way of walking', text: copy.statement, backgroundColor: '#111111', textColor: '#ffffff' },
    perspectives: { eyebrow: 'Continue Exploring', title: 'Walk Further Into the Landscape', backgroundColor: '#ffffff', selectedStoryIds: [], items: [
      { title: 'Nature & Landscape', description: 'Explore other activities shaped by forest, water, season and terrain.', href: '/explore/nature-landscape', image: fourSistersActivityGallery[2] },
      { title: 'Our Way of Travel', description: 'Learn why pace, attention and local context matter to every Tree Thousands journey.', href: '/our-story/our-way-of-travel', image: fourSistersActivityGallery[3] },
      { title: 'Village Life', description: 'Look beyond the mountain view toward the everyday lives held within rural landscapes.', href: '/explore/village-life', image: fourSistersActivityGallery[4] },
    ] },
    stories: { eyebrow: 'From the Journal', title: 'Related Stories', viewAllLabel: 'View all stories →', viewAllHref: '/stories', backgroundColor: '#ffffff', selectedStoryIds: [], items: [
      { category: 'Journal', title: 'Walking at the Pace of the Valley', href: '/stories', image: fourSistersActivityGallery[1] },
    ] },
    cta: { eyebrow: 'Take Part', title: 'Ready to walk beneath the Four Sisters?', buttonLabel: 'Register Your Interest', buttonHref: '/join-us/contact', backgroundColor: '#f5569b', textColor: '#ffffff', buttonBackgroundColor: '#111111', buttonTextColor: '#ffffff', textureImage: '', textureOpacity: 25 },
    contentBlocks: [],
  };
  if (slug === 'pick-tea-with-local-growers') return {
    homepageCard: { title: 'Pick Tea With Local Growers', image: teaActivityGallery[1] },
    activity: {
      ...emptyActivity, enabled: true, type: 'Tea & Seasonal Work', status: 'seasonal', statusLabel: 'Seasonal · By Arrangement',
      dateLabel: 'Arranged during suitable picking periods', duration: 'Half day or full day', groupSize: '2–8 participants', difficulty: 'Light to moderate',
      location: 'Ya’an, Sichuan', note: 'The exact experience follows the weather, the tea season and the work taking place when you visit.',
    },
    activityDetail: {
      category: 'People & Culture',
      excerpt: 'Spend time on the tea hills of Ya’an, learning how local growers read the season, select fresh leaves and begin the process that carries tea from hillside to cup.',
      gallery: teaActivityGallery,
      purpose: {
        eyebrow: 'Why This Experience Exists', title: 'Tea is a working relationship between people, season and land.',
        paragraphs: ['The green terraces of Ya’an are often seen first as a landscape. Their form, however, comes from repeated work: tending bushes, reading weather, selecting leaves and returning to the same slopes through changing seasons.', 'This activity creates time to understand that relationship. Rather than treating the tea garden as a backdrop, participants enter carefully, follow local guidance and learn through the real rhythm of the day.'],
        image: teaActivityGallery[5],
      },
      currentWork: {
        eyebrow: 'What You Will Experience', title: 'Follow the leaf from the hillside toward the cup.',
        paragraphs: ['Begin with the mountain itself: its paths, changing weather and the way rows follow the contour. A local grower introduces the tea bushes and demonstrates how to recognise leaves suitable for the day’s picking.', 'Depending on season and local work, the visit may continue with sorting, spreading, observing a traditional making stage or sharing freshly prepared tea. The sequence remains responsive rather than staged.'],
        images: [teaActivityGallery[2], teaActivityGallery[6]],
      },
      participation: {
        eyebrow: 'Ways to Take Part', title: 'Learn by watching closely, then working with your hands.', introduction: 'The activity is adjusted to the season, the group and the work genuinely useful that day.',
        items: [
          { title: 'Read the Tea Garden', description: 'Learn how slope, weather, shade and new growth affect the day’s work.' },
          { title: 'Learn to Pick', description: 'Follow a grower’s demonstration and practise selecting appropriate tender leaves.' },
          { title: 'Sort Fresh Leaves', description: 'Look closely at what has been gathered and understand why leaves are handled differently.' },
          { title: 'Meet the Making Process', description: 'Observe an available stage of spreading, heating or handling without interrupting production.' },
          { title: 'Share Tea Together', description: 'Finish with tea, conversation and time to reflect on what the landscape now reveals.' },
        ],
      },
      fit: {
        eyebrow: 'Is This for You?', title: 'Curiosity matters more than experience.', introduction: 'No tea knowledge is required. A good fit begins with patience, mobility on rural ground and respect for a working landscape.',
        items: ['You would like to understand where tea comes from beyond a tasting room.', 'You are comfortable walking on narrow, uneven or damp paths.', 'You can follow picking guidance and accept that the day changes with weather and season.', 'You value conversation and observation as much as completing an activity.', 'You will ask before photographing people, homes or working spaces.'],
      },
      flexibility: {
        eyebrow: 'Shaped Around the Season', title: 'The mountain—not a fixed timetable—sets the pace.',
        paragraphs: ['Tea growth, rain, temperature and the needs of local growers determine what can happen on any visit. We confirm the most appropriate activity after learning about your dates, group and interests.', 'Some visits may focus more on the landscape and picking; others may include additional time with sorting, making or tasting. This flexibility keeps the experience connected to real work.'],
        points: ['Season and recent weather', 'Available half or full day', 'Group size and ages', 'Walking and mobility needs', 'Interest in picking or making', 'Transport and meal arrangements'], image: teaActivityGallery[0],
      },
      people: {
        eyebrow: 'Learning Alongside', title: 'Local knowledge leads the experience.',
        paragraphs: ['Growers understand the tea hills through repeated attention: the feel of a leaf, the speed of new growth, the arrival of rain and the right moment to move to another row.', 'Participation means learning within that knowledge. Guests do not direct the harvest or turn workers into performers; they follow, ask and contribute at an appropriate pace.'],
        images: [teaActivityGallery[8], teaActivityGallery[9]],
      },
      practical: {
        eyebrow: 'Before You Join', title: 'Prepare for a real working landscape.', introduction: 'Final guidance is confirmed for each visit. These points apply to most tea-hill days.',
        items: [
          { title: 'Physical Level', description: 'Light to moderate walking on slopes, narrow paths and uneven ground.' },
          { title: 'Weather', description: 'Mist and rain are common in Ya’an; the plan may change with field conditions.' },
          { title: 'What to Wear', description: 'Closed non-slip shoes, practical layers and rain or sun protection.' },
          { title: 'What to Bring', description: 'Water, a small day bag and any personal medication.' },
          { title: 'Children', description: 'Suitability depends on age, supervision, weather and the condition of the paths.' },
          { title: 'Photography & Respect', description: 'Ask before photographing people or private spaces and never interrupt working routines.' },
        ],
      },
      principles: { eyebrow: 'Our Shared Principles', title: 'Enter the tea hills with care.', items: ['Listen before picking.', 'Let the season shape the plan.', 'Respect working time and private life.', 'Photograph only with permission.', 'Leave the paths, plants and place as you found them.'] },
      closing: {
        eyebrow: 'Begin a Conversation', title: 'Tell us when you hope to visit the tea hills.',
        paragraphs: ['Share your travel dates, group, available time and any walking or dietary needs. We will check the season and local work before suggesting the right form of participation.', 'The aim is not to promise the same programme every day. It is to create a meaningful encounter with the landscape, knowledge and people already here.'],
        image: teaActivityGallery[3],
      },
      roles: {
        eyebrow: 'How You Can Take Part', title: 'There Is More Than One Way to Join the Tea Day', footer: 'You do not need tea experience. Tell us what you are curious about and how you like to learn.', linkLabel: 'Tell Us How You Would Like to Join →',
        items: [
          { title: 'Tea Learner', description: 'Begin with no prior knowledge—observe, ask and practise the day’s suitable tasks.', icon: 'leaf' },
          { title: 'Helping Hands', description: 'Support picking, carrying or sorting at a pace guided by local growers.', icon: 'hands' },
          { title: 'Photographer', description: 'Document landscape and work respectfully, always asking before photographing people.', icon: 'camera' },
          { title: 'Filmmaker', description: 'Record movement, sound and seasonal work without directing the day for the camera.', icon: 'video' },
          { title: 'Writer / Storyteller', description: 'Listen closely and help communicate the knowledge held in an ordinary working day.', icon: 'writer' },
          { title: 'Translator', description: 'Help conversation move naturally between local growers and international guests.', icon: 'languages' },
          { title: 'Plant Observer', description: 'Notice growth, weather, insects and the wider ecology surrounding the tea garden.', icon: 'plant' },
          { title: 'Tea Host / Cook', description: 'Support the shared table, tasting and conversations that bring the day together.', icon: 'cook' },
          { title: 'Cultural Researcher', description: 'Explore how tea connects landscape, livelihood, memory and changing rural life.', icon: 'research' },
          { title: 'Group Facilitator', description: 'Help a small group participate patiently, safely and with attention to local rhythms.', icon: 'group' },
        ],
      },
      purposeStory: {
        eyebrow: 'Why We Do This', title: 'A Tea Landscape Is Kept Alive Through Knowledge and Work.',
        paragraphs: [
          'The terraces of Ya’an are easy to admire as a finished view. Yet their form is never finished. Each season depends on pruning, tending, watching the weather and returning to the slope at the moment new leaves are ready.',
          'That repeated attention is a form of local knowledge. It lives in judgement that can be difficult to capture in instructions: the feel of a tender leaf, the effect of last night’s rain, the difference between one side of the hill and another.',
          'Tree Thousands creates this activity so that travel can move beyond looking. By entering the tea garden carefully, participants begin to understand how landscape, livelihood and daily practice remain connected.',
          'Participation is not a performance arranged around visitors. The work remains real, the grower’s knowledge leads, and the day may change when weather or production requires it. Accepting those limits is part of learning how to travel with respect.',
        ],
        quote: 'We do not visit the tea hills only to see their beauty. We come to understand the care that allows that beauty to continue.',
        mainImage: teaActivityGallery[5], insetImage: teaActivityGallery[9],
      },
      placeStory: {
        eyebrow: 'The Landscape Behind the Leaf', title: 'Rain, Altitude and Repeated Hands Shape Every Harvest.',
        introduction: 'Ya’an’s tea is inseparable from a mountain climate where mist, rain, changing light and steep ground influence how leaves grow and when people can work.',
        paragraphs: [
          'The terraces follow the contour because the slope determines movement. Narrow paths connect rows, baskets travel by hand and a short distance on the map can require slow, careful walking. The landscape establishes the physical rhythm of the activity before any itinerary does.',
          'Frequent moisture supports the vivid growth associated with the region, but it also makes paths slippery and picking windows uncertain. A visit may shift from the hillside to sorting, making or conversation because responding to conditions is part of tea knowledge—not an interruption to the experience.',
          'The tea garden is also an economic and social landscape. It holds family work, seasonal income, practiced skills and decisions about how rural livelihoods continue. Understanding the leaf means noticing this larger system rather than separating a product from the place and people that produce it.',
        ], image: teaActivityGallery[2],
      },
    },
    hero: { eyebrow: 'Explore / People & Culture', title: copy.title, subtitle: copy.subtitle, image: teaActivityGallery[1], backgroundColor: '#ffffff', overlayOpacity: 0 },
    introduction: { eyebrow: 'An invitation to take part', text: copy.introduction, backgroundColor: '#ffffff', textColor: '#171717' },
    visual: { eyebrow: 'The experience', title: 'From hillside to cup.', paragraphs: [], images: [], backgroundColor: '#f5f5f5' },
    details: { eyebrow: 'Activity Details', title: 'What the day may hold', description: 'Each visit follows the tea season and local work.', backgroundColor: '#f5f5f5', items: copy.details.map((title, index) => ({ title, image: teaActivityGallery[index] })) },
    statement: { eyebrow: 'A way of travelling', text: copy.statement, backgroundColor: '#111111', textColor: '#ffffff' },
    perspectives: { eyebrow: 'Continue Exploring', title: 'Understand the Landscape', backgroundColor: '#ffffff', selectedStoryIds: [], items: [
      { title: 'Where the Tea Hills Begin', description: 'Read the field story behind Ya’an’s working tea landscape.', href: '/stories/article/where-the-tea-hills-begin', image: teaActivityGallery[0] },
      { title: 'People & Culture', description: 'Discover other activities shaped by living knowledge and practiced hands.', href: '/explore/people-culture', image: teaActivityGallery[9] },
      { title: 'Nature & Landscape', description: 'Explore how mountains, forests and cultivated land shape everyday life.', href: '/explore/nature-landscape', image: teaActivityGallery[2] },
    ] },
    stories: { eyebrow: 'From the Journal', title: 'Related Stories', viewAllLabel: 'View all stories →', viewAllHref: '/stories', backgroundColor: '#ffffff', selectedStoryIds: [], items: [
      { category: 'Village Notes', title: 'Where the Tea Hills Begin', href: '/stories/article/where-the-tea-hills-begin', image: teaActivityGallery[0] },
    ] },
    cta: { eyebrow: 'Take Part', title: 'Ready to walk into the tea hills?', buttonLabel: 'Register Your Interest', buttonHref: '/join-us/contact', backgroundColor: '#f5569b', textColor: '#ffffff', buttonBackgroundColor: '#111111', buttonTextColor: '#ffffff', textureImage: '', textureOpacity: 25 },
    contentBlocks: [],
  };
  if (slug === 'build-with-what-is-already-here') return {
    homepageCard: { title: 'Build Together', image: '/images/explore/build-together/reference/10-group-roof.jpg' },
    activity: { ...emptyActivity, enabled: true, type: 'Build Together', status: 'open', statusLabel: 'Ongoing · By Arrangement', location: 'A village in rural China' },
    activityDetail: {
      category: 'Village Life',
      excerpt: 'Take part in the careful repair of an existing village house, with each visit shaped around the work currently underway and the needs of the participating group.',
      gallery: buildTogetherGallery,
      purpose: { eyebrow: 'Why This Work Exists', title: 'Another use can grow from what the house already holds.', paragraphs: ['The house stands within the existing fabric of the village. Its roof, timber, windows and plaster carry the marks of weather, repair and everyday life.', 'The aim is not to erase those layers or impose a finished idea from outside. The work begins by understanding what can remain, what needs attention and how the house might become useful again.'], image: houseImages.hero },
      currentWork: { eyebrow: 'What Is Happening Here', title: 'Repair follows the condition of the building.', paragraphs: ['The project moves through practical stages: examining the roof and structure, preparing existing surfaces, working with timber and organising the interior as each decision becomes clear.', 'The precise work changes over time. Participants enter a real process already underway; activities are not added merely to create a visitor experience.'], images: [houseImages.roofWide, houseImages.transitionWall] },
      participation: { eyebrow: 'Ways to Take Part', title: 'Different forms of participation can support the same work.', introduction: 'Appropriate tasks are selected after we understand the project stage, the group and what each participant hopes to learn or contribute.', items: [
        { title: 'Practical Support', description: 'Help organise reusable materials, prepare simple surfaces or assist with suitable non-specialist tasks.' },
        { title: 'Observe & Learn', description: 'Follow the decisions of craftspeople and understand how existing materials respond to repair.' },
        { title: 'Document the Process', description: 'Support careful visual or written documentation without directing the work for the camera.' },
        { title: 'Share the Day', description: 'Take part in the ordinary rhythm around the work, including pauses, meals and reflection.' },
      ] },
      fit: { eyebrow: 'Is This for You?', title: 'A good fit begins with the right expectations.', introduction: 'You do not need professional building experience. Curiosity, flexibility and respect for the working environment matter more than arriving with a particular skill.', items: ['You are interested in how existing buildings are repaired and reused.', 'You are comfortable with an active, unfinished work environment.', 'You can accept that the useful task may change with the project stage.', 'You value learning from local knowledge rather than directing the outcome.', 'You are willing to follow practical, safety and privacy boundaries.'] },
      flexibility: { eyebrow: 'Shaped Around Your Needs', title: 'There is no fixed programme to purchase.', paragraphs: ['Registering interest begins a conversation. We learn about your available time, group, interests, physical needs and expectations, then match these with work that is genuinely useful at that moment.', 'The arrangement can place more emphasis on practical contribution, learning, documentation or a balanced combination. Weather, materials and the advice of craftspeople continue to set the pace.'], points: ['Available time', 'Individual or group', 'Interests and experience', 'Physical needs', 'Learning or practical focus', 'Transport, food and other requirements'], image: houseImages.interior },
      people: { eyebrow: 'Working Alongside', title: 'Knowledge remains with the people who practise it.', paragraphs: ['Local craftspeople and project workers bring practical knowledge of timber, tile, tools and the existing building. Participation means working within that knowledge rather than arriving with ready-made solutions.', 'Specialist, structural or machinery-based work remains with experienced people. Building together does not mean everyone performs the same task; it means every role respects what the work requires.'], images: [houseImages.carpenterWindow, houseImages.carpenterMachine] },
      practical: { eyebrow: 'Before You Join', title: 'Preparation protects the place and the people in it.', introduction: 'Specific guidance is agreed for each visit. The following principles apply throughout the activity.', items: [
        { title: 'Working Environment', description: 'Expect uneven surfaces, dust, tools and conditions that change with the weather and project stage.' },
        { title: 'Clothing & Equipment', description: 'Closed footwear and practical clothing are essential. Any additional equipment will be confirmed beforehand.' },
        { title: 'Safety Boundaries', description: 'Participants follow the site briefing and do not enter specialist work areas without guidance.' },
        { title: 'Photography', description: 'People and private spaces are photographed only with permission; the work is not rearranged for an image.' },
        { title: 'Children & Groups', description: 'Suitability is discussed according to age, supervision, group size and the work underway.' },
        { title: 'Practical Arrangements', description: 'Transport, meals, duration and any contribution are confirmed after the participation plan is agreed.' },
      ] },
      principles: { eyebrow: 'Our Shared Principles', title: 'Contribute without taking over.', items: ['Begin by listening.', 'Work with what is already here.', 'Respect local knowledge and private life.', 'Do not turn ordinary work into a performance.', 'Allow the place and the work to set the pace.'] },
      closing: { eyebrow: 'Begin a Conversation', title: 'Tell us how you would like to take part.', paragraphs: ['Share your available time, the people you hope to come with, what interests you and any practical needs. We will respond with a participation approach connected to the house’s current stage.', 'Each visit is one moment in a longer process. The work begins before participants arrive and continues after they leave.'], image: houseImages.transitionWall },
      roles: {
        eyebrow: 'Bring What You Know', title: 'There Is More Than One Way to Help', footer: 'Not sure where you fit? Start with a conversation.', linkLabel: 'Tell Us What You Can Bring →',
        items: [
          { title: 'Designer / Architect', description: 'Help think through space, function, materials and future use.', icon: 'design' },
          { title: 'Carpenter / Maker', description: 'Work with timber, repair details and practical construction.', icon: 'maker' },
          { title: 'Photographer', description: 'Document the people, landscape and changing life of the project.', icon: 'camera' },
          { title: 'Filmmaker', description: 'Turn the building process and village stories into moving images.', icon: 'video' },
          { title: 'Cook', description: 'Prepare food, share recipes and bring people together at the table.', icon: 'cook' },
          { title: 'Gardener / Ecologist', description: 'Help us understand plants, land, water and the local environment.', icon: 'plant' },
          { title: 'Writer / Storyteller', description: 'Record local knowledge and communicate the meaning of the work.', icon: 'writer' },
          { title: 'Translator', description: 'Help villagers and international participants understand one another.', icon: 'languages' },
          { title: 'Workshop Facilitator', description: 'Share a useful skill or help organise collaborative activities.', icon: 'group' },
          { title: 'Helping Hands', description: 'No experience required—observe, learn and join suitable everyday tasks.', icon: 'hands' },
        ],
      },
      purposeStory: {
        eyebrow: 'Why We Do This', title: 'A House Holds More Than Its Walls',
        paragraphs: ['A village house is never only a structure. It carries the marks of the people who built it, the materials available around it and the ordinary lives that have passed through its rooms.', 'Rather than replacing what has aged, this project begins by looking carefully at what remains. Timber, tile, earth and stone each tell us something about how the house was made—and how it may continue to be useful.', 'Participants join a real project already in progress. The work changes with the condition of the house, the weather and the knowledge of the people involved.', 'This is not about arriving with a ready-made solution. It is about learning how to notice, working alongside others and contributing with care.'],
        quote: 'We are not rebuilding an image of village life. We are helping an existing place continue its story.', mainImage: '/images/explore/build-together/place/sichuan-rural-house.jpg', insetImage: '/images/explore/build-together/place/bamboo-courtyard-house.jpg',
      },
      placeStory: {
        eyebrow: 'The Place Around the House', title: 'A Landscape Shaped by Rain, Forest and Everyday Work', introduction: 'The activity belongs to a wider landscape. Understanding the house also means noticing the climate, cultivated land and daily rhythms that have shaped it.',
        paragraphs: ['Around Ya’an, forested hills, deep valleys and frequent rain give the countryside its particular texture. From the lower tea-growing slopes to the snow mountains and cloud seas beyond them, the land changes quickly with altitude and weather.', 'Village life is not arranged as a performance for visitors. We ask participants to enter its rhythm slowly: to observe before photographing, to listen before acting and to remember that the village is first of all someone’s home.'], image: '/images/explore/build-together/place/yaan-mountain-panorama.jpg',
      },
    },
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
    activityDetail: undefined,
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
    activityDetail: page.activityDetail ? { ...defaultActivityDetail, ...defaults.activityDetail, ...page.activityDetail, gallery: page.activityDetail.gallery?.length ? page.activityDetail.gallery : defaults.activityDetail?.gallery ?? [] } : defaults.activityDetail,
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
