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

export const ourStoryEditorialPages: Record<string, OurStoryEditorialContent> = {
  'why-we-started': whyWeStarted,
  'what-we-believe': whatWeBelieve,
};
