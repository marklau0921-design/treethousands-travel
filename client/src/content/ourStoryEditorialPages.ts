export type EditorialImage = { src: string; alt: string };

export type OurStoryEditorialContent = {
  hero: { image: string; alt: string; metaLeft: string; metaRight: string; title: string; subtitle: string };
  beginning: { eyebrow: string; title: string; paragraphs: string[]; images: [EditorialImage, EditorialImage, EditorialImage, EditorialImage] };
  turning: { eyebrow: string; title: string; leftParagraphs: string[]; rightParagraphs: string[]; images: [EditorialImage, EditorialImage, EditorialImage]; captions: [string, string] };
  action: { eyebrow: string; title: string; paragraphs: string[]; images: [EditorialImage, EditorialImage, EditorialImage] };
  belief: { eyebrow: string; title: string; paragraphs: string[]; sideParagraphs: string[]; quote: string; images: [EditorialImage, EditorialImage, EditorialImage] };
  closing: { eyebrow: string; title: string; paragraph: string; image: EditorialImage };
  recommendations: { title: string; description: string; backgroundImage: string };
  cta: { title: string; buttonLabel: string; buttonHref: string; image: string };
};

const whyAsset = '/images/why-we-started-editorial';

const whyWeStarted: OurStoryEditorialContent = {
  hero: { image: `${whyAsset}/01-opening.jpeg`, alt: 'Mountain village surrounded by forest and morning mist', metaLeft: 'TREE THOUSANDS / OUR STORIES', metaRight: '01 / ORIGINS', title: 'Why We Started.', subtitle: 'Every story begins somewhere. Ours begins with a place, its people, and a different way of seeing the world.' },
  beginning: {
    eyebrow: '01 / THE BEGINNING', title: 'It began with a place.',
    paragraphs: ['Before Tree Thousands became what it is today, there was a growing curiosity about the relationship between people and the places they call home.', 'In the mountains of Sichuan, forests, villages, and everyday traditions exist side by side. Here, nature is not simply a landscape to admire, but part of daily life.', 'Over time, these connections offered a different perspective: to understand a place, we must also understand the people who shape it and call it home.'],
    images: [
      { src: `${whyAsset}/02-person.jpeg`, alt: 'A villager carrying a woven basket' },
      { src: `${whyAsset}/02-village.jpeg`, alt: 'A narrow path between traditional village buildings' },
      { src: `${whyAsset}/02-life.jpeg`, alt: 'Children carrying branches along a village path' },
      { src: `${whyAsset}/02-detail.jpeg`, alt: 'Hands weaving a bamboo basket' },
    ],
  },
  turning: {
    eyebrow: '02 / THE TURNING POINT', title: 'A Different Way\nof Seeing.',
    leftParagraphs: ['Our early work focused on the natural world. From planting bamboo to removing invasive species, these experiences brought us closer to the landscapes we hoped to protect.', 'Yet the more time we spent in these places, the more we came to understand that nature and community were deeply connected.'],
    rightParagraphs: ['The people living alongside these forests carried knowledge, traditions, and ways of life shaped by generations of experience.', 'Our perspective began to expand. Protecting a place was not only about its environment, but also about recognizing the people whose lives were intertwined with it.'],
    images: [
      { src: `${whyAsset}/03-action.jpeg`, alt: 'People working together in a mountain field' },
      { src: `${whyAsset}/03-place.jpeg`, alt: 'An old village window framed by green leaves' },
      { src: `${whyAsset}/03-detail.jpeg`, alt: 'Hands carving and shaping bamboo' },
    ], captions: ['Learning by taking part.', 'Daily life leaves its traces.'],
  },
  action: {
    eyebrow: '03 / TAKING ACTION', title: 'Small actions.\nReal connections.',
    paragraphs: ['From planting bamboo and caring for the natural environment to working alongside villagers on shared spaces, our ideas began to take shape through real experiences.', 'These moments were not simply about completing a task. They created opportunities to learn from one another, exchange skills, and develop a deeper understanding of the places we had come to know.', 'What stayed with us was not only what we made or changed, but the relationships formed along the way.'],
    images: [
      { src: `${whyAsset}/04-detail.jpeg`, alt: 'People planting bamboo together in a forest' },
      { src: `${whyAsset}/04-action.jpeg`, alt: 'Two people repairing a shared wooden structure' },
      { src: `${whyAsset}/04-landscape.jpeg`, alt: 'Terraced fields and homes across a mountain valley' },
    ],
  },
  belief: {
    eyebrow: '04 / WHAT WE BELIEVE', title: 'A place is more\nthan a place.',
    paragraphs: ['It is the people who call it home, the traditions they carry, and the everyday moments that shape their lives.', 'Over time, we have come to value the simple exchanges that happen when people share a meal, learn a skill, or work together. These moments often reveal more about a place than any landmark or itinerary ever could.'],
    sideParagraphs: ['We believe meaningful travel begins with curiosity and grows through understanding. Not simply seeing somewhere new, but taking the time to connect with the people who make it what it is.'],
    quote: 'The most meaningful journeys bring us closer to people, not just places.',
    images: [
      { src: `${whyAsset}/05-life.jpeg`, alt: 'A family sharing a meal at home' },
      { src: `${whyAsset}/05-person.jpeg`, alt: 'An older villager standing in a carved wooden doorway' },
      { src: `${whyAsset}/05-craft.jpeg`, alt: 'A craftsperson weaving a bamboo basket' },
    ],
  },
  closing: { eyebrow: 'THE JOURNEY AHEAD', title: 'The Story\nContinues.', paragraph: 'What began with a simple curiosity continues to grow through the people we meet, the places we come to know, and the experiences we share along the way.', image: { src: `${whyAsset}/06-closing.jpeg`, alt: 'Two villagers sitting together outside a wooden home' } },
  recommendations: { title: 'What We Are Explore', description: 'Ongoing ways to join the work already taking place in the village.', backgroundImage: `${whyAsset}/06-closing.jpeg` },
  cta: { title: 'So, Ready to Take Part?', buttonLabel: 'Explore Activities', buttonHref: '/explore', image: `${whyAsset}/04-landscape.jpeg` },
};

const beliefAsset = '/images/what-we-believe';

const whatWeBelieve: OurStoryEditorialContent = {
  hero: { image: `${beliefAsset}/belief-hero.jpg`, alt: 'People learning together in a Sichuan forest', metaLeft: 'TREE THOUSANDS / OUR STORIES', metaRight: '02 / OUR BELIEFS', title: 'What We Believe.', subtitle: 'Travel should leave something meaningful behind.' },
  beginning: {
    eyebrow: '01 / A PLACE IS NOT A PRODUCT', title: 'A village is a living relationship.',
    paragraphs: ['A village is not a backdrop. It is a living relationship between land, memory, work, and people. Its fields, paths, homes, and shared spaces have been shaped by countless ordinary decisions over time.', 'Before asking what a place can offer us, we try to understand what is already here.', 'We arrive slowly, pay attention to the rhythms of daily life, and learn from the people whose knowledge has grown through seasons of care.'],
    images: [
      { src: `${beliefAsset}/place-is-not-a-product.jpg`, alt: 'A farmer working in rural Sichuan' },
      { src: `${beliefAsset}/preparing-together.jpg`, alt: 'A quiet village road surrounded by green mountains' },
      { src: `${beliefAsset}/people-not-background.jpg`, alt: 'A smiling elder seated outside her village home' },
      { src: `${beliefAsset}/relationships-03.webp`, alt: 'A detail of rural craft and daily work' },
    ],
  },
  turning: {
    eyebrow: '02 / LEARNING FROM THE LAND', title: 'Knowledge lives\nin repeated gestures.',
    leftParagraphs: ['Planting, picking, carrying, waiting, and beginning again—local knowledge is held in movements repeated across generations.', 'The land is understood through attention: to weather, soil, water, plants, and the right moment to act.'],
    rightParagraphs: ['We come not only to see, but to listen, observe, and learn from the people who understand this land through daily practice.', 'Respect begins when we accept that knowledge already exists here, long before we arrive.'],
    images: [
      { src: `${beliefAsset}/learning-from-the-land-01.jpg`, alt: 'Learning from work on the land' },
      { src: `${beliefAsset}/learning-from-the-land-02.jpg`, alt: 'A rural landscape shaped by seasonal work' },
      { src: `${beliefAsset}/relationships-04.jpg`, alt: 'Hands and tools carrying local knowledge' },
    ], captions: ['Knowledge carried through practice.', 'The landscape remembers every season.'],
  },
  action: {
    eyebrow: '03 / PARTICIPATION, NOT OBSERVATION', title: 'Taking part\nchanges the journey.',
    paragraphs: ['To participate is to accept the pace of another place. It means working with our hands, listening before acting, and understanding that even a simple task carries knowledge.', 'Building, farming, making, and restoring become ways of meeting—not activities arranged only for entertainment.', 'The value lies not only in what is completed, but in the exchange created while doing it together.'],
    images: [
      { src: `${beliefAsset}/participation-01.jpg`, alt: 'People taking part in work together' },
      { src: `${beliefAsset}/participation-02.jpg`, alt: 'Shared work in a village setting' },
      { src: `${beliefAsset}/participation-03.jpg`, alt: 'Participants moving through a rural landscape' },
    ],
  },
  belief: {
    eyebrow: '04 / RELATIONSHIPS THAT CONTINUE', title: 'A visit is not\nthe end.',
    paragraphs: ['A meaningful journey continues through the people we remember, the knowledge we carry, and the responsibilities we choose to share.', 'We hope every visit becomes part of a longer relationship—between guests and hosts, cities and villages, people and the living world around them.'],
    sideParagraphs: ['The purpose is not to collect an experience and move on. It is to leave with greater understanding, remain connected, and recognize how our choices affect the places that welcome us.'],
    quote: 'We believe in travel that listens, respects what is already here, and asks how we can take part.',
    images: [
      { src: `${beliefAsset}/participation-04.jpg`, alt: 'People sharing an experience in the village' },
      { src: `${beliefAsset}/relationships-05.jpg`, alt: 'A portrait from everyday rural life' },
      { src: `${beliefAsset}/relationships-06.jpg`, alt: 'Local craft and relationships continuing through time' },
    ],
  },
  closing: { eyebrow: 'THE RELATIONSHIP AHEAD', title: 'Continue\nWith Care.', paragraph: 'What matters is not only where we go, but how we arrive, what we learn, and what remains after we leave. This belief continues to guide every story, activity, and relationship we build.', image: { src: `${beliefAsset}/the-work-stays-open.jpg`, alt: 'People walking through a quiet green mountain landscape' } },
  recommendations: { title: 'What We Are Explore', description: 'Ongoing ways to join the work already taking place in the village.', backgroundImage: `${beliefAsset}/relationships-03.webp` },
  cta: { title: 'So, Ready to Take Part?', buttonLabel: 'Explore Activities', buttonHref: '/explore', image: `${beliefAsset}/participation-03.jpg` },
};

const travelAsset = '/images/our-way-of-travel';

const ourWayOfTravel: OurStoryEditorialContent = {
  hero: {
    image: `${travelAsset}/hero.jpg`,
    alt: 'A quiet forest road in rural Sichuan',
    metaLeft: 'TREE THOUSANDS / OUR STORIES',
    metaRight: '',
    title: 'Our Way of Travel.',
    subtitle: 'We begin on the ground—walking, listening, and learning how a place lives before deciding how a journey should move through it.',
  },
  beginning: {
    eyebrow: '01 / BEFORE THE ITINERARY',
    title: 'The journey begins before there is a route.',
    paragraphs: [
      'Before we invite anyone to travel with us, we go ourselves. We walk the forest roads, enter village lanes, notice where the pace changes, and listen to the people who understand the place through everyday life.',
      'This first visit is not a rehearsal for a finished tour. It is fieldwork—a way to understand what can be shared responsibly, what needs more time, and what should remain part of ordinary life rather than becoming an attraction.',
      'The route grows from what we learn on the ground, not from a checklist prepared somewhere else.',
    ],
    images: [
      { src: `${travelAsset}/walking-together.jpg`, alt: 'A small group walking through a forest landscape' },
      { src: `${travelAsset}/documenting-village.jpg`, alt: 'Documenting details along a village lane' },
      { src: `${travelAsset}/forest-steps.jpg`, alt: 'People climbing a shaded path through the forest' },
      { src: `${travelAsset}/bamboo-stick-detail.jpg`, alt: 'A bamboo walking stick touching the ground' },
    ],
  },
  turning: {
    eyebrow: '02 / LISTEN BEFORE WE PLAN',
    title: 'A route is shaped\nwith a place.',
    leftParagraphs: [
      'We do not begin with a list of attractions. We begin with conversations, changing weather, the condition of a path, and the rhythm of local work.',
      'Walking reveals effort, shade, distance, places to pause, and the small transitions between landscape and village life.',
    ],
    rightParagraphs: [
      'Listening also reveals boundaries: where photography is welcome, when a visit would interrupt daily life, and what local people would rather keep for themselves.',
      'These details determine not only where a journey goes, but how it should behave when it arrives.',
    ],
    images: [
      { src: `${travelAsset}/listening-on-trail.jpg`, alt: 'A group pausing to listen during a field visit' },
      { src: `${travelAsset}/mountain-vegetation.jpg`, alt: 'Mountain vegetation observed during route research' },
      { src: `${travelAsset}/looking-closely.jpg`, alt: 'Participants looking closely at the surrounding environment' },
    ],
    captions: ['Listen first. Plan second.', 'Attention changes what we notice.'],
  },
  action: {
    eyebrow: '03 / TRAVEL IN SMALL WAYS',
    title: 'Move slowly.\nStay responsive.',
    paragraphs: [
      'Small groups make room for conversation, different walking speeds, and changes of plan. They allow a journey to remain responsive instead of asking the place to fit a fixed performance.',
      'Weather, seasons, local work, and the needs of each group can change the day. We treat flexibility as part of responsible travel, not as a failure to follow the plan.',
      'Covering less ground often creates more space to understand where we are.',
    ],
    images: [
      { src: `${travelAsset}/trail-ascent.jpg`, alt: 'A small group ascending a village trail' },
      { src: `${travelAsset}/bamboo-trail-group.jpg`, alt: 'People moving together through a bamboo trail' },
      { src: `${travelAsset}/waterfall.jpg`, alt: 'Water moving through a shaded forest' },
    ],
  },
  belief: {
    eyebrow: '04 / FROM SEEING TO TAKING PART',
    title: 'The place is not\na stage.',
    paragraphs: [
      'A village is somebody’s home and workplace. We photograph with permission, enter private spaces only when invited, and do not turn ordinary routines into scenes arranged for visitors.',
      'When participation is appropriate, building, farming, making, and conservation work become ways of meeting—not activities arranged only for entertainment.',
    ],
    sideParagraphs: [
      'Taking part means accepting the pace of another place, listening before acting, and understanding that even a simple task carries knowledge. The value lies not only in what is completed, but in the exchange created while doing it together.',
    ],
    quote: 'A meaningful journey is shaped with a place, not placed on top of it.',
    images: [
      { src: `${travelAsset}/roadside-encounter.jpg`, alt: 'A spontaneous encounter beside a rural road' },
      { src: `${travelAsset}/documenting-village.jpg`, alt: 'A traveler documenting village life with attention' },
      { src: `${travelAsset}/looking-closely.jpg`, alt: 'Learning by observing closely in the field' },
    ],
  },
  closing: {
    eyebrow: 'THE RELATIONSHIP CONTINUES',
    title: 'Leave More Than\na Photograph.',
    paragraph: 'We want travel to create value in both directions. The route may end, but the relationship should have room to continue through return visits, shared work, open conversations, and support for what local people are already building.',
    image: { src: `${travelAsset}/entering-village.jpg`, alt: 'A small group entering a mountain village on foot' },
  },
  recommendations: {
    title: 'What We Are Explore',
    description: 'Ongoing ways to move from seeing a place to taking part with care.',
    backgroundImage: `${travelAsset}/bamboo-trail-group.jpg`,
  },
  cta: {
    title: 'So, Ready to Travel Differently?',
    buttonLabel: 'Explore Activities',
    buttonHref: '/explore',
    image: `${travelAsset}/waterfall.jpg`,
  },
};

const patternAsset = '/images/stories/a-pattern-made-together';

const aPatternMadeTogether: OurStoryEditorialContent = {
  hero: {
    image: `${patternAsset}/hero.jpg`,
    alt: 'People gathered around a long table making botanical prints together',
    metaLeft: 'TREE THOUSANDS / LOCAL LIFE',
    metaRight: '',
    title: 'A Pattern Made Together.',
    subtitle: 'Leaves, flowers, cloth and patient hands turned an ordinary village room into a place for making, learning and sharing.',
  },
  beginning: {
    eyebrow: '01 / A TABLE BECOMES A MEETING PLACE',
    title: 'It began with simple materials.',
    paragraphs: [
      'The table was already covered when everyone sat down. Plain cloth bags lay beside green leaves and red flowers, while small dark mallets passed from one pair of hands to another.',
      'At first, each person worked on a separate bag. Someone adjusted the position of a leaf. Someone else held the cloth steady. Before long, individual work became shared attention.',
      'The room needed no formal stage. Its old timber, open windows and long table were enough. What gave the afternoon its shape was the life unfolding inside it.',
    ],
    images: [
      { src: `${patternAsset}/hands-at-work.jpg`, alt: 'Hands arranging leaves and flowers on cloth' },
      { src: `${patternAsset}/working-together.jpg`, alt: 'Participants making botanical prints together' },
      { src: `${patternAsset}/table-work.jpg`, alt: 'The shared work table during the activity' },
      { src: `${patternAsset}/leaf-detail.jpg`, alt: 'A close detail of a leaf prepared for printing' },
    ],
  },
  turning: {
    eyebrow: '02 / LEARNING THROUGH THE HANDS',
    title: 'Every mark arrived\ndifferently.',
    leftParagraphs: [
      'The process was easy to enter. A leaf or flower was placed on the cloth, covered, and pressed with a mallet. Repeated strikes slowly transferred colour and shape onto the bag.',
      'No two impressions appeared in exactly the same way. A leaf might leave a clear network of veins or only a soft field of green.',
    ],
    rightParagraphs: [
      'The differences became part of the pleasure. Each unexpected mark prompted another look across the table, another adjustment and another attempt.',
      'Knowledge moved through demonstration rather than instruction alone: watching a hand, hearing a suggestion, then finding a rhythm of one’s own.',
    ],
    images: [
      { src: `${patternAsset}/leaf-detail.jpg`, alt: 'Botanical material ready to leave a pattern' },
      { src: `${patternAsset}/hands-at-work.jpg`, alt: 'Hands transferring plant colour onto cloth' },
      { src: `${patternAsset}/table-work.jpg`, alt: 'Tools and materials spread across the table' },
    ],
    captions: ['A pattern begins with attention.', 'Learning moves from hand to hand.'],
  },
  action: {
    eyebrow: '03 / MAKING ALONGSIDE ONE ANOTHER',
    title: 'Separate pieces.\nOne shared afternoon.',
    paragraphs: [
      'Hands moved constantly between individual work and shared attention. One person demonstrated a motion; another noticed where a flower had shifted; someone nearby offered to hold the fabric still.',
      'People could join by watching, by trying a single mark or by completing an entire design. Participation did not depend on arriving with specialist knowledge.',
      'The activity created an easy reason to sit together. Conversation, concentration and laughter accumulated around the same working surface.',
    ],
    images: [
      { src: `${patternAsset}/leaf-detail.jpg`, alt: 'Leaves and flowers used as printing material' },
      { src: `${patternAsset}/working-together.jpg`, alt: 'A group sharing the work around the table' },
      { src: `${patternAsset}/table-work.jpg`, alt: 'A long table filled with people, cloth and botanical materials' },
    ],
  },
  belief: {
    eyebrow: '04 / WHAT THE ROOM HELD',
    title: 'The pattern was\nmore than an object.',
    paragraphs: [
      'By the end of the session, the table held a collection of different patterns. The same leaves, flowers and tools had produced results shaped by the choices and movements of each maker.',
      'The finished bags could be carried away, but the deeper record remained in the room: neighbours seated together, knowledge moving across the table and an existing village space holding a new shared activity.',
    ],
    sideParagraphs: [
      'For TreeThousands, participation can begin at this human scale. It does not always need a large plan. Sometimes a table, a few materials and enough unhurried time are all that people need to begin making something together.',
    ],
    quote: 'The finished pattern belonged to one bag. The afternoon that produced it belonged to the whole table.',
    images: [
      { src: `${patternAsset}/working-together.jpg`, alt: 'Participants gathered in an old village room' },
      { src: `${patternAsset}/hands-at-work.jpg`, alt: 'Close view of shared work at the table' },
      { src: `${patternAsset}/leaf-detail.jpg`, alt: 'The natural detail behind each printed pattern' },
    ],
  },
  closing: {
    eyebrow: 'THE MAKING CONTINUES',
    title: 'Made By Hand.\nRemembered Together.',
    paragraph: 'What stayed was not only what each person made, but the exchange created while making it: attention offered freely, knowledge shared without ceremony, and an ordinary room made lively through use.',
    image: { src: `${patternAsset}/closing.jpg`, alt: 'The village room after an afternoon of making together' },
  },
  recommendations: {
    title: 'What We Are Explore',
    description: 'Ongoing ways to learn, make and take part alongside local communities.',
    backgroundImage: `${patternAsset}/table-work.jpg`,
  },
  cta: {
    title: 'So, Ready to Make Something Together?',
    buttonLabel: 'Explore Activities',
    buttonHref: '/explore',
    image: `${patternAsset}/working-together.jpg`,
  },
};

export const ourStoryEditorialPages: Record<string, OurStoryEditorialContent> = {
  'why-we-started': whyWeStarted,
  'what-we-believe': whatWeBelieve,
  'our-way-of-travel': ourWayOfTravel,
  'a-pattern-made-together': aPatternMadeTogether,
};
