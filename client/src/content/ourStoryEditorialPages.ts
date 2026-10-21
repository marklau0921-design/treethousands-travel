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

const routeStoryAsset = '/images/our-way-of-travel';

const beforeAJourneyBecomesARoute: OurStoryEditorialContent = {
  hero: {
    image: '/images/stories/before-a-journey-becomes-a-route/forest-road.jpg',
    alt: 'A quiet road leading into a forest in rural China',
    metaLeft: 'TREE THOUSANDS / BRAND STORIES',
    metaRight: '',
    title: 'Before a Journey Becomes a Route.',
    subtitle: 'Before we share a journey, we walk it ourselves—to understand its pace, its people and what deserves closer attention.',
  },
  beginning: {
    eyebrow: '01 / WE BEGIN ON FOOT',
    title: 'The first route is walked, not written.',
    paragraphs: [
      'A route begins long before it appears on an itinerary. We walk it first: along forest roads, through bamboo paths, over uneven ground and into the lanes where everyday village life continues.',
      'This is not a preview of a finished product. It is fieldwork—a way to learn where the journey opens, where it becomes demanding and how people naturally move together through the terrain.',
      'Maps can show distance and direction. Walking reveals effort, rhythm, changing light and the places where attention naturally slows down.',
    ],
    images: [
      { src: `${routeStoryAsset}/walking-together.jpg`, alt: 'A small group beginning a route on foot' },
      { src: `${routeStoryAsset}/mountain-vegetation.jpg`, alt: 'Mountain vegetation observed during the field walk' },
      { src: `${routeStoryAsset}/bamboo-trail-group.jpg`, alt: 'The group moving through a bamboo trail' },
      { src: `${routeStoryAsset}/bamboo-stick-detail.jpg`, alt: 'A bamboo walking stick meeting the wet ground' },
    ],
  },
  turning: {
    eyebrow: '02 / READING THE LANDSCAPE',
    title: 'A route is shaped by\nmore than distance.',
    leftParagraphs: [
      'Forest edges, dense bamboo, water and changes in elevation each create a different rhythm. We look at how these conditions connect rather than treating the landscape as scenery between attractions.',
      'Time on the ground also reveals the pauses, narrow passages and changes of energy that a line on a map cannot show.',
    ],
    rightParagraphs: [
      'These observations later become practical decisions: how long a journey needs, where people can rest, what preparation is required and how the route can welcome different walking speeds.',
      'We measure a route not only in kilometres, but in effort, attention and time to pause.',
    ],
    images: [
      { src: `${routeStoryAsset}/trail-ascent.jpg`, alt: 'Participants ascending an uneven forest trail' },
      { src: `${routeStoryAsset}/waterfall.jpg`, alt: 'Water moving through the shaded forest' },
      { src: `${routeStoryAsset}/forest-steps.jpg`, alt: 'Stone steps beneath trees along the route' },
    ],
    captions: ['Walking reveals the true pace of a route.', 'Water and shade reshape the journey.'],
  },
  action: {
    eyebrow: '03 / LOOKING BEYOND THE VIEW',
    title: 'Small conditions change\nthe whole experience.',
    paragraphs: [
      'Route research depends on close observation. We notice the condition of the ground, where water collects, how sunlight changes the temperature and where a group can stop without blocking the way.',
      'We document materials, light and spatial relationships that written notes can miss. The camera records what is present; it does not ask the place to perform.',
      'These ordinary details shape safety, comfort and the quality of attention. They help us decide not only where a journey goes, but how it should behave.',
    ],
    images: [
      { src: `${routeStoryAsset}/looking-closely.jpg`, alt: 'Participants stopping to look closely at the landscape' },
      { src: `${routeStoryAsset}/documenting-village.jpg`, alt: 'Documenting an existing village lane without staging it' },
      { src: `${routeStoryAsset}/mountain-vegetation.jpg`, alt: 'A wide mountain landscape encountered along the route' },
    ],
  },
  belief: {
    eyebrow: '04 / FROM FOREST TO VILLAGE',
    title: 'Local life is not\nscenery on a route.',
    paragraphs: [
      'The forest path does not exist separately from the settlements around it. As the route enters village lanes, trees give way to walls, doorways, working spaces and the traces of daily routines.',
      'A lived place asks for a different kind of awareness. Not every encounter should become an activity, and not everything we notice needs to become a stop.',
    ],
    sideParagraphs: [
      'We listen before deciding what can be shared, photograph with restraint and consider whether future interactions can happen naturally and respectfully. The route must remain connected to the life already taking place around it.',
    ],
    quote: 'A meaningful route is discovered through attention, not assembled from a list of attractions.',
    images: [
      { src: `${routeStoryAsset}/entering-village.jpg`, alt: 'A group walking from the forest into a village lane' },
      { src: `${routeStoryAsset}/roadside-encounter.jpg`, alt: 'An everyday roadside encounter during fieldwork' },
      { src: `${routeStoryAsset}/looking-closely.jpg`, alt: 'Learning to observe without intervening' },
    ],
  },
  closing: {
    eyebrow: 'FROM FIELD NOTES TO JOURNEY',
    title: 'Let The Route Follow\nThe Place.',
    paragraph: 'After the walking, photographs and notes become decisions. We begin not by asking how much can be added, but by understanding what is already here—and how others might approach it with care.',
    image: { src: `${routeStoryAsset}/forest-steps.jpg`, alt: 'The group continuing together through the forest' },
  },
  recommendations: {
    title: 'What We Are Explore',
    description: 'Ongoing ways to walk, observe and take part with care.',
    backgroundImage: `${routeStoryAsset}/bamboo-trail-group.jpg`,
  },
  cta: {
    title: 'So, Ready to Follow a Different Route?',
    buttonLabel: 'Explore Activities',
    buttonHref: '/explore',
    image: `${routeStoryAsset}/waterfall.jpg`,
  },
};

const clayStoryAsset = '/images/stories/the-rhythm-of-clay';

const theRhythmOfClay: OurStoryEditorialContent = {
  hero: {
    image: `${clayStoryAsset}/craftsman-with-lids.jpg`,
    alt: 'A craftsman refining clay lids inside a rural pottery workshop',
    metaLeft: 'TREE THOUSANDS / LOCAL LIFE',
    metaRight: '',
    title: 'The Rhythm of Clay.',
    subtitle: 'Inside a rural pottery workshop, repeated gestures turn clay into objects made for everyday hands.',
  },
  beginning: {
    eyebrow: '01 / INSIDE THE WORKSHOP',
    title: 'The room was already shaped by work.',
    paragraphs: [
      'The workshop was already in motion when we entered. Shelves held rows of cups and lids, clay dust softened the floor, and finished forms waited beside objects still being worked by hand.',
      'Nothing had been arranged as a demonstration. One person prepared clay while another refined the edge of a lid. Vessels moved between tables, racks and carts according to the condition of the material—not the pace of a visitor.',
      'The working order of the room told us how the day moved. Every shelf, board and open space supported a process that had begun long before we arrived.',
    ],
    images: [
      { src: `${clayStoryAsset}/workshop-courtyard.jpg`, alt: 'The old brick exterior of the pottery workshop' },
      { src: `${clayStoryAsset}/workshop-storage.jpg`, alt: 'A craftsperson preparing clay inside the workshop' },
      { src: `${clayStoryAsset}/workshop-shelves.jpg`, alt: 'Rows of vessels filling the workshop shelves' },
      { src: `${clayStoryAsset}/clay-detail.jpg`, alt: 'A close detail of clay marked by heat and handling' },
    ],
  },
  turning: {
    eyebrow: '02 / CLAY BEFORE FORM',
    title: 'Every vessel begins\nbefore its shape appears.',
    leftParagraphs: [
      'Before there is a cup, teapot or lid, the material must be prepared for the hand. Too much resistance, too little structure or an uneven texture will travel into everything that follows.',
      'The preparation can look repetitive from a distance. Up close, it is a sequence of judgements—when to continue, when to add pressure and when the clay is ready for another stage.',
    ],
    rightParagraphs: [
      'The same movement becomes more precise over time. Practical knowledge lives in pressure that is difficult to measure, in the angle of a tool and in knowing when another movement would improve the form—or disturb it.',
      'Experience is visible not only in what the hand does, but in knowing when to stop.',
    ],
    images: [
      { src: `${clayStoryAsset}/preparing-clay.jpg`, alt: 'Preparing the raw clay at a working table' },
      { src: `${clayStoryAsset}/finishing-by-hand.jpg`, alt: 'A craftsman refining a lid by hand' },
      { src: `${clayStoryAsset}/animal-detail.jpg`, alt: 'A small animal motif formed into a clay vessel' },
    ],
    captions: ['The day begins with the material.', 'Knowledge gathers through repetition.'],
  },
  action: {
    eyebrow: '03 / ONE FORM, MANY DIFFERENCES',
    title: 'Repetition makes\nthe details visible.',
    paragraphs: [
      'Placed together, the cups and teapots form a repeated pattern. Shared proportions make them recognisable as a family of objects, while small differences reveal how each one arrived there.',
      'A handle sits slightly higher. A rim carries a different pressure. A lid meets its vessel through tiny adjustments. These are not effects added to make the work appear handmade; they are the natural record of the process.',
      'Similarity does not erase the maker. It makes the evidence of each decision easier to see.',
    ],
    images: [
      { src: `${clayStoryAsset}/animal-detail.jpg`, alt: 'A detailed clay surface and formed handle' },
      { src: `${clayStoryAsset}/teapots.jpg`, alt: 'Rows of teapots with handles, spouts and lids' },
      { src: `${clayStoryAsset}/cups-in-sunlight.jpg`, alt: 'Newly formed cups gathered in sunlight' },
    ],
  },
  belief: {
    eyebrow: '04 / TIME DOES PART OF THE WORK',
    title: 'Waiting is part\nof making.',
    paragraphs: [
      'Newly formed vessels occupy every available surface. Some wait close together on racks; others travel outside on carts where air and sunlight change their condition gradually.',
      'Moving faster would not make the next stage arrive sooner. The workshop follows the pace of the material, allowing moisture, heat and time to do work that hands alone cannot complete.',
    ],
    sideParagraphs: [
      'The finished vessel will enter another routine: held, poured from, placed on a table, washed and used again. Craft remains alive because the object continues its relationship with everyday life.',
    ],
    quote: 'The form returns. The hand never makes it in exactly the same way twice.',
    images: [
      { src: `${clayStoryAsset}/cups-on-racks.jpg`, alt: 'Rows of vessels waiting across workshop racks' },
      { src: `${clayStoryAsset}/cups-on-carts.jpg`, alt: 'Carts carrying newly formed vessels into sunlight' },
      { src: `${clayStoryAsset}/craftsman-with-lids.jpg`, alt: 'The craftsman working among repeated clay forms' },
    ],
  },
  closing: {
    eyebrow: 'WHAT THE HANDS CARRY FORWARD',
    title: 'Made For Everyday\nHands.',
    paragraph: 'A craft continues not because it remains unchanged, but because it remains useful, practised and connected to daily life. Its knowledge moves forward through material, repetition and the people still working here today.',
    image: { src: `${clayStoryAsset}/workshop-sign.jpg`, alt: 'The pottery workshop and its old sign beneath a tiled roof' },
  },
  recommendations: {
    title: 'What We Are Explore',
    description: 'Ongoing ways to learn through material, practice and local knowledge.',
    backgroundImage: `${clayStoryAsset}/workshop-shelves.jpg`,
  },
  cta: {
    title: 'So, Ready to Learn With Your Hands?',
    buttonLabel: 'Explore Activities',
    buttonHref: '/explore',
    image: `${clayStoryAsset}/teapots.jpg`,
  },
};

const houseStoryAsset = '/images/explore/build-together/reference';

const workingWithWhatIsAlreadyHere: OurStoryEditorialContent = {
  hero: {
    image: `${houseStoryAsset}/10-group-roof.jpg`,
    alt: 'A group of craftspeople repairing the roof of an existing rural house',
    metaLeft: 'TREE THOUSANDS / FIELD JOURNAL',
    metaRight: '',
    title: 'Working With What Is Already Here.',
    subtitle: 'Repair begins by asking what should remain, what needs attention and what the existing house can teach us.',
  },
  beginning: {
    eyebrow: '01 / BEFORE ANY CHANGE',
    title: 'The first task was to look carefully.',
    paragraphs: [
      'An existing house is not an empty surface. Its structure, openings, marks of use and relationship with the surrounding land already give it a character that new work must learn to meet.',
      'Before plans and new materials entered the space, the building itself became the most important source of information. What was still sound? Where had weather entered? Which parts carried knowledge worth keeping?',
      'The aim was never to erase the age of the house. It was to understand how careful repair might allow it to remain useful without losing the qualities that made it belong here.',
    ],
    images: [
      { src: `${houseStoryAsset}/01-house-setting.jpg`, alt: 'The existing rural house within its landscape' },
      { src: `${houseStoryAsset}/02-opening-work.jpg`, alt: 'The group gathering before repair work begins' },
      { src: `${houseStoryAsset}/11-restoration-progress.jpg`, alt: 'The building partway through the repair process' },
      { src: `${houseStoryAsset}/04-material-detail.jpg`, alt: 'A close view of existing building material' },
    ],
  },
  turning: {
    eyebrow: '02 / READING THE EXISTING HOUSE',
    title: 'The building became\nthe first set of plans.',
    leftParagraphs: [
      'An old house contains decisions made over many years. Roof layers meet in a particular rhythm. Openings follow the rooms behind them. Timbers and surfaces carry traces of repair, weather and everyday use.',
      'Reading those details does not mean keeping everything without question. It means understanding the consequences of change before making it.',
    ],
    rightParagraphs: [
      'The work distinguishes between what can continue, what requires repair and what needs a careful new response. New material must meet the old structure without making the house feel detached from its surroundings.',
      'Working with an existing house begins by listening to what its materials can still do.',
    ],
    images: [
      { src: `${houseStoryAsset}/03-material-sorting.jpg`, alt: 'Materials being sorted and assessed for reuse' },
      { src: `${houseStoryAsset}/06-craft-detail.jpg`, alt: 'A close view of careful repair by hand' },
      { src: `${houseStoryAsset}/09-hands-material.jpg`, alt: 'Hands examining material during the work' },
    ],
    captions: ['Existing materials guide the next decision.', 'Repair begins through close attention.'],
  },
  action: {
    eyebrow: '03 / THE MOST PRACTICAL WORK FIRST',
    title: 'The answers emerged\nthrough the work.',
    paragraphs: [
      'A roof determines whether the rooms below can continue to be used. Repair begins above the house, where people move carefully across the structure and attend to the places that can no longer be left as they are.',
      'The photographs keep the physical reality visible: ladders at the eaves, materials within reach, bodies balanced carefully and decisions made directly where new work meets old.',
      'A drawing can describe a dimension. A practised hand understands how the material will answer.',
    ],
    images: [
      { src: `${houseStoryAsset}/07-roof-work.jpg`, alt: 'Workers beginning practical repairs across the roof' },
      { src: `${houseStoryAsset}/10-group-roof.jpg`, alt: 'Craftspeople working together across the existing roof' },
      { src: `${houseStoryAsset}/05-working-together.jpg`, alt: 'The repair team working alongside one another' },
    ],
  },
  belief: {
    eyebrow: '04 / BUILDING ALONGSIDE',
    title: 'More than one kind\nof knowledge was needed.',
    paragraphs: [
      'Repair brings different forms of experience into the same place. Craftspeople understand how materials behave. Workers know how to move safely through a difficult structure. Others document, discuss and respond to what the work reveals.',
      'This is not a story about arriving with every answer. It is a process of working alongside people who already understand the building, its materials and the conditions of working here.',
    ],
    sideParagraphs: [
      'The unfinished stage matters. Tools remain nearby and the next decision is still connected to the one before it. It makes visible the labour and judgement that a polished final image can easily hide.',
    ],
    quote: 'What should stay? What needs to change? What could grow from here?',
    images: [
      { src: `${houseStoryAsset}/08-guided-work.jpg`, alt: 'An experienced craftsperson guiding the work' },
      { src: `${houseStoryAsset}/12-shared-process.jpg`, alt: 'People sharing responsibility during the repair process' },
      { src: `${houseStoryAsset}/09-hands-material.jpg`, alt: 'Material knowledge carried through the hands' },
    ],
  },
  closing: {
    eyebrow: 'STILL TAKING SHAPE',
    title: 'Let The Next Use Grow\nFrom The First.',
    paragraph: 'The measure of the work is not how new the house appears. It is whether the space can be useful again while still belonging to the landscape, materials and relationships that have allowed it to remain here.',
    image: { src: `${houseStoryAsset}/11-restoration-progress.jpg`, alt: 'The rural house continuing to take shape through repair' },
  },
  recommendations: {
    title: 'What We Are Explore',
    description: 'Ongoing ways to contribute practical skills to a real project in progress.',
    backgroundImage: `${houseStoryAsset}/01-house-setting.jpg`,
  },
  cta: {
    title: 'So, Ready to Build Alongside Us?',
    buttonLabel: 'Explore Activities',
    buttonHref: '/explore/activity/build-with-what-is-already-here',
    image: `${houseStoryAsset}/05-working-together.jpg`,
  },
};

const forestStoryAsset = '/images/stories/into-the-forest-together';

const intoTheForestTogether: OurStoryEditorialContent = {
  hero: {
    image: `${forestStoryAsset}/together.jpg`,
    alt: 'A group standing together with tools beneath a dense forest canopy',
    metaLeft: 'TREE THOUSANDS / FIELD JOURNAL',
    metaRight: '',
    title: 'Into the Forest, Together.',
    subtitle: 'A day of forest care turns observation into participation—and participation into a different way of seeing.',
  },
  beginning: {
    eyebrow: '01 / ENTERING THE FOREST',
    title: 'The day begins by slowing down.',
    paragraphs: [
      'The forest received the group with wet ground, close-growing bamboo and a canopy that softened the daylight. The uneven path asked everyone to pay attention to each step.',
      'Before any work began, there was time to gather, listen and understand how to move through the landscape with care. This was not an arrival at an attraction, but an introduction to a living place.',
      'Entering slowly made room for another kind of attention: to the plants at our feet, the condition of the trees and the knowledge of the people already caring for this forest.',
    ],
    images: [
      { src: `${forestStoryAsset}/arriving.jpg`, alt: 'Participants gathering to listen before entering the forest' },
      { src: `${forestStoryAsset}/bamboo-path.jpg`, alt: 'A quiet bamboo forest beneath a green canopy' },
      { src: `${forestStoryAsset}/looking-closely.jpg`, alt: 'Two participants observing a tree at close range' },
      { src: `${forestStoryAsset}/forest-landscape.jpg`, alt: 'The wider forest landscape surrounding the day of work' },
    ],
  },
  turning: {
    eyebrow: '02 / LEARNING TO LOOK MORE CLOSELY',
    title: 'A forest reveals itself\nthrough relationships.',
    leftParagraphs: [
      'At first, the landscape seemed to be made almost entirely of green. Looking longer brought out its many layers: bamboo above the path, ground plants below, moss on trunks and small movements among the leaves.',
      'A forest is not simply a view. It is a living system whose relationships are not always immediately visible.',
    ],
    rightParagraphs: [
      'Care begins with recognising what already belongs here. Before deciding what to clear, carry or change, the group learned to observe and follow the guidance of people who know the place.',
      'Attention became the first practical skill of the day—and the foundation for every action that followed.',
    ],
    images: [
      { src: `${forestStoryAsset}/bamboo-path.jpg`, alt: 'Bamboo and ground plants along the forest route' },
      { src: `${forestStoryAsset}/forest-device.jpg`, alt: 'Participants carefully attaching a monitoring device to a tree' },
      { src: `${forestStoryAsset}/looking-closely.jpg`, alt: 'Participants learning by observing the forest closely' },
    ],
    captions: ['The landscape becomes clearer through attention.', 'Observe first. Act with care.'],
  },
  action: {
    eyebrow: '03 / FROM VISITORS TO PARTICIPANTS',
    title: 'Care becomes real\nthrough participation.',
    paragraphs: [
      'Tools and gloves changed the meaning of the visit. The group was no longer moving through the forest only to admire it; they were joining practical work already taking place there.',
      'No one needed to arrive as an expert. People learned through demonstration and repetition—watching how others worked, asking questions and finding a useful place within the shared task.',
      'The day did not promise a dramatic transformation. Its value was found in smaller actions carried out carefully and together.',
    ],
    images: [
      { src: `${forestStoryAsset}/hands-at-work.jpg`, alt: 'Young participants working together on the forest floor' },
      { src: `${forestStoryAsset}/tools-in-forest.jpg`, alt: 'A group standing in the forest with the tools used during the work' },
      { src: `${forestStoryAsset}/together.jpg`, alt: 'Participants gathered together after shared forest work' },
    ],
  },
  belief: {
    eyebrow: '04 / PROTECTION THROUGH PRESENCE',
    title: 'Some work is quiet\nand meant to continue.',
    paragraphs: [
      'Forest care is not a single heroic gesture. It is made from practical movements: holding, clearing, carrying, checking and pausing to make sure each action belongs to a longer process.',
      'A monitoring device fixed carefully to a tree suggested another part of protection: returning, recording change and paying attention beyond the span of one visit.',
    ],
    sideParagraphs: [
      'The most visible part of the day was the group at work. The deeper lesson was that the forest would continue after everyone left. Responsible participation respects that longer timeline.',
    ],
    quote: 'To care for a place, we first have to notice what already belongs there.',
    images: [
      { src: `${forestStoryAsset}/forest-device.jpg`, alt: 'A monitoring device being placed carefully against a forest tree' },
      { src: `${forestStoryAsset}/shared-moment.jpg`, alt: 'Two participants sharing a relaxed moment beneath the trees' },
      { src: `${forestStoryAsset}/hands-at-work.jpg`, alt: 'Shared work continuing among bamboo and forest plants' },
    ],
  },
  closing: {
    eyebrow: 'WHAT WE CARRY BACK',
    title: 'Leave With A Different\nWay Of Seeing.',
    paragraph: 'The forest remained complex, living and larger than any one day. What changed was the relationship of the participants to the place: observation had become involvement, and a distant idea of conservation had become a series of real actions carried out together.',
    image: { src: `${forestStoryAsset}/forest-landscape.jpg`, alt: 'The forest continuing beyond the day of shared work' },
  },
  recommendations: {
    title: 'What We Are Explore',
    description: 'Ongoing ways to take part in the patient work of caring for landscapes and communities.',
    backgroundImage: `${forestStoryAsset}/bamboo-path.jpg`,
  },
  cta: {
    title: 'So, Ready to Care for the Forest?',
    buttonLabel: 'Explore Activities',
    buttonHref: '/explore/nature-landscape',
    image: `${forestStoryAsset}/together.jpg`,
  },
};

const beyondVisitingAsset = '/images/what-we-believe';
const beyondVisitingStoryAsset = '/images/why-we-started';

const beyondVisiting: OurStoryEditorialContent = {
  hero: {
    image: `${beyondVisitingStoryAsset}/before-the-plan.jpg`,
    alt: 'A quiet rural landscape encountered before a route is planned',
    metaLeft: 'TREE THOUSANDS / BRAND STORIES',
    metaRight: '',
    title: 'Beyond Visiting.',
    subtitle: 'Immersive travel begins with time, attention and a willingness to take part—not simply passing through a place.',
  },
  beginning: {
    eyebrow: '01 / ARRIVING WITH TIME',
    title: 'Understanding begins after arrival.',
    paragraphs: [
      'There is a difference between reaching a place and beginning to understand it. Arrival can be measured by distance and time. Understanding grows more slowly.',
      'It begins through attention to the road, the weather, the work of the day and the people who already know this place as home. We walk without rushing, listen before explaining and allow everyday life to set the pace.',
      'We do not travel deeper by going farther. We travel deeper by becoming more present.',
    ],
    images: [
      { src: `${beyondVisitingStoryAsset}/entering-the-village.jpg`, alt: 'Visitors entering a village slowly on foot' },
      { src: `${beyondVisitingAsset}/documenting-the-process.jpg`, alt: 'A journey documented carefully along a rural road' },
      { src: `${beyondVisitingAsset}/at-the-doorway.jpg`, alt: 'A conversation beginning at a village doorway' },
      { src: `${beyondVisitingAsset}/place-and-life.jpg`, alt: 'Homes and everyday life within a rural landscape' },
    ],
  },
  turning: {
    eyebrow: '02 / BEYOND THE ITINERARY',
    title: 'A route can guide us.\nIt cannot tell the whole story.',
    leftParagraphs: [
      'An itinerary can name the next stop, but it cannot predict which details will make a place meaningful. A change in weather may slow the walk. A doorway may become the beginning of a conversation.',
      'A road that appears ordinary on a map may reveal how homes, fields and forests belong to one another.',
    ],
    rightParagraphs: [
      'Travelling deeply means leaving room for these moments. The aim is not to collect more places in a day, but to notice what a faster journey would have passed without seeing.',
      'Time turns a destination into a relationship and observation into understanding.',
    ],
    images: [
      { src: `${beyondVisitingAsset}/documenting-the-process.jpg`, alt: 'Recording details discovered beyond the itinerary' },
      { src: `${beyondVisitingAsset}/listening-first.jpg`, alt: 'A roadside conversation approached by listening first' },
      { src: `${beyondVisitingAsset}/the-work-stays-open.jpg`, alt: 'A quiet rural road continuing through the landscape' },
    ],
    captions: ['The route leaves room for what cannot be planned.', 'Listening changes what the journey reveals.'],
  },
  action: {
    eyebrow: '03 / LIFE IS NOT A PERFORMANCE',
    title: 'The village continues\nbefore and after we pass through.',
    paragraphs: [
      'Meals are prepared, work continues, neighbours speak, animals cross the road and doors open and close throughout the day. None of this begins for the benefit of a visitor.',
      'Local life is not something arranged for us. It is something we are invited to approach with care—without turning every ordinary moment into a spectacle or every encounter into content.',
      'Sometimes attention means asking a question and staying long enough to hear the answer. At other times, it means putting the camera away.',
    ],
    images: [
      { src: `${beyondVisitingAsset}/preparing-together.jpg`, alt: 'Everyday preparations continuing within the village' },
      { src: `${beyondVisitingAsset}/people-not-background.jpg`, alt: 'A person seen as part of a living place rather than a backdrop' },
      { src: `${beyondVisitingAsset}/everyday-company.jpg`, alt: 'People sharing time together in a familiar room' },
    ],
  },
  belief: {
    eyebrow: '04 / TAKING PART',
    title: 'You remain a visitor.\nBut not a distant observer.',
    paragraphs: [
      'Participation changes the question from “What can I see here?” to “What is happening here, and how can I take part respectfully?”',
      'The answer may be found in a walk through the village, a conversation at a doorway, time shared around a table or practical work carried out alongside others.',
    ],
    sideParagraphs: [
      'Taking part does not mean pretending to become local. It means listening, contributing where participation is welcomed and recognising that immersion is not access without limits. It is attention guided by respect.',
    ],
    quote: 'A village is never one story. It is many lives sharing the same place.',
    images: [
      { src: `${beyondVisitingAsset}/taking-part.jpg`, alt: 'People taking part in practical work together' },
      { src: `${beyondVisitingAsset}/at-the-doorway.jpg`, alt: 'A respectful encounter at a village doorway' },
      { src: `${beyondVisitingAsset}/already-here.jpg`, alt: 'An existing village place observed with attention' },
    ],
  },
  closing: {
    eyebrow: 'WHAT STAYS AFTER THE JOURNEY',
    title: 'Leave With A Deeper\nUnderstanding.',
    paragraph: 'The value of an immersive journey is not how much of a place we can claim to know, but how carefully we learn to see it. A thoughtful visit should leave us with more detail, more respect and fewer assumptions than we brought with us.',
    image: { src: `${beyondVisitingAsset}/everyday-company.jpg`, alt: 'Everyday life continuing in a familiar village room' },
  },
  recommendations: {
    title: 'What We Are Explore',
    description: 'Ongoing ways to move beyond observing and begin taking part with care.',
    backgroundImage: `${beyondVisitingAsset}/place-and-life.jpg`,
  },
  cta: {
    title: 'So, Ready to Go Beyond Visiting?',
    buttonLabel: 'Explore Activities',
    buttonHref: '/explore',
    image: `${beyondVisitingAsset}/taking-part.jpg`,
  },
};

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

const teaHillsAsset = '/images/stories/where-the-tea-hills-begin';

const whereTheTeaHillsBegin: OurStoryEditorialContent = {
  hero: {
    image: `${teaHillsAsset}/hero.jpg`,
    alt: 'Tea pickers moving across steep green hills at first light in Ya’an',
    metaLeft: 'TREE THOUSANDS / VILLAGE NOTES',
    metaRight: '',
    title: 'Where The Tea Hills Begin.',
    subtitle: 'In Ya’an, the landscape is shaped leaf by leaf—through weather, repetition and the people who return to these slopes each morning.',
  },
  beginning: {
    eyebrow: '01 / BEFORE THE DAY WARMS',
    title: 'Morning begins\nalong the contour.',
    paragraphs: [
      'Before the sun reaches the lower valleys, movement has already begun on the tea hills. Paths disappear between rows of shrubs, baskets are adjusted, and figures spread slowly across the slope.',
      'From a distance, the terraces appear almost effortless: long green lines following the mountain. Up close, the landscape reveals the attention required to maintain it—each row reached on foot, each tender leaf judged by hand.',
      'The day does not begin with a performance for visitors. It begins because the season is ready and the work must continue.',
    ],
    images: [
      { src: `${teaHillsAsset}/picker-portrait.jpg`, alt: 'Portrait of a tea picker working among fresh green leaves' },
      { src: `${teaHillsAsset}/misty-terraces.jpg`, alt: 'Tea terraces receding into mist in the Ya’an mountains' },
      { src: `${teaHillsAsset}/tea-garden-above.jpg`, alt: 'Tea rows and workers seen from above' },
      { src: `${teaHillsAsset}/morning-harvest.jpg`, alt: 'A group beginning the morning harvest across a tea garden' },
    ],
  },
  turning: {
    eyebrow: '02 / READING THE SLOPE',
    title: 'The mountain sets\nthe pace of the hand.',
    leftParagraphs: [
      'Tea picking is a rhythm of looking, reaching and moving forward. The hand searches for the right growth while the body continually adjusts to uneven ground.',
      'What appears repetitive is full of small decisions—what is ready, what should remain and how the weather has changed the leaf since yesterday.',
    ],
    rightParagraphs: [
      'This knowledge is not separated from the landscape. It has been learned through seasons of rain, fog, heat and return.',
      'To spend time here is to understand that the beauty of the tea hills and the labour within them are not two different stories.',
    ],
    images: [
      { src: `${teaHillsAsset}/between-rows.jpg`, alt: 'Tea pickers moving between narrow rows' },
      { src: `${teaHillsAsset}/single-picker.jpg`, alt: 'A single picker working across a steep terrace' },
      { src: `${teaHillsAsset}/group-from-above.jpg`, alt: 'A harvest group working together seen from above' },
    ],
    captions: ['The hand learns what the season is ready to give.', 'Every row carries the trace of repeated work.'],
  },
  action: {
    eyebrow: '03 / A HARVEST OF SMALL MOVEMENTS',
    title: 'Leaf By Leaf.\nRow By Row.',
    paragraphs: [
      'There is no single dramatic gesture in a tea harvest. The day accumulates through thousands of careful movements, made by people working separately and together across the same slope.',
      'Voices travel between rows. Someone pauses to shift a basket; another continues toward the next contour. The group shares the landscape without needing to move at exactly the same speed.',
      'By midday, the change is measured not by how different the mountain looks, but by what many hands have gathered from it.',
    ],
    images: [
      { src: `${teaHillsAsset}/picker-portrait.jpg`, alt: 'Close view of a tea picker and the leaves being gathered' },
      { src: `${teaHillsAsset}/between-rows.jpg`, alt: 'Workers sharing the narrow paths between tea rows' },
      { src: `${teaHillsAsset}/group-from-above.jpg`, alt: 'Many small movements forming one harvest across the hillside' },
    ],
  },
  belief: {
    eyebrow: '04 / WHAT TRAVEL SHOULD NOTICE',
    title: 'The view is beautiful.\nThe work gives it meaning.',
    paragraphs: [
      'It is easy to arrive and see only the pattern: green terraces, rising mist and sunlight moving across the mountain. A slower visit asks how that pattern came to exist and whose daily knowledge continues to shape it.',
      'The tea hills are not scenery placed behind village life. They are part of a working landscape—connected to weather, livelihoods, family routines and the changing demands of each season.',
    ],
    sideParagraphs: [
      'For Tree Thousands, travel becomes meaningful when observation leads to respect. We want to come close enough to understand the work, while remembering that the day belongs first to the people living it.',
    ],
    quote: 'To see the landscape clearly, we must also see the hands that keep shaping it.',
    images: [
      { src: `${teaHillsAsset}/sunrise-garden.jpg`, alt: 'Morning light spreading across a quiet tea garden' },
      { src: `${teaHillsAsset}/spring-trees.jpg`, alt: 'Tea pickers working beneath fresh spring trees' },
      { src: `${teaHillsAsset}/tea-garden-above.jpg`, alt: 'The geometry of tea rows and the people within them' },
    ],
  },
  closing: {
    eyebrow: 'AT THE EDGE OF THE TEA ROWS',
    title: 'A Landscape\nStill Being Made.',
    paragraph: 'The mountain will look different with the next rain, the next season and the next harvest. What remains is a relationship between people and place, renewed each morning through work that is careful, ordinary and ongoing.',
    image: { src: `${teaHillsAsset}/sunrise-garden.jpg`, alt: 'Tea hills glowing softly at the beginning of the day' },
  },
  recommendations: {
    title: 'What We Are Explore',
    description: 'Ongoing ways to walk, learn and take part with the people who shape rural landscapes.',
    backgroundImage: `${teaHillsAsset}/spring-trees.jpg`,
  },
  cta: {
    title: 'So, Ready to Walk Into the Tea Hills?',
    buttonLabel: 'Explore Activities',
    buttonHref: '/explore',
    image: `${teaHillsAsset}/morning-harvest.jpg`,
  },
};

const relationshipsAsset = '/images/stories/relationships-before-routes';

const relationshipsBeforeRoutes: OurStoryEditorialContent = {
  hero: {
    image: `${relationshipsAsset}/conversation-at-the-table.jpg`,
    alt: 'People sharing an unhurried conversation around a table in the countryside',
    metaLeft: 'TREE THOUSANDS / BRAND STORIES',
    metaRight: '',
    title: 'Relationships Before Routes.',
    subtitle: 'Before a place becomes a route, it begins as a relationship—built through listening, returning and learning what should, and should not, be shared.',
  },
  beginning: {
    eyebrow: '01 / BEFORE THE ITINERARY',
    title: 'Every route begins with people.',
    paragraphs: [
      'Long before we decide where a visitor might walk or what they might do, we spend time learning who is already connected to the place. We sit down, ask questions and listen for the details that do not appear on a map.',
      'The first conversations are not a transaction and they are not a request for people to perform their lives for us. They are the beginning of understanding: who wishes to be involved, what matters locally and what a thoughtful visit might contribute rather than consume.',
      'The itinerary comes later. The relationship must come first.',
    ],
    images: [
      { src: `${relationshipsAsset}/listening-at-the-table.jpg`, alt: 'A conversation continuing around a village table' },
      { src: `${relationshipsAsset}/village-garden-conversation.jpg`, alt: 'People listening to one another in a working garden' },
      { src: `${relationshipsAsset}/tea-between-generations.jpg`, alt: 'Tea shared between generations outside a home' },
      { src: `${relationshipsAsset}/reading-the-harvest.jpg`, alt: 'Two people looking closely at a harvest in the field' },
    ],
  },
  turning: {
    eyebrow: '02 / TRUST TAKES TIME',
    title: 'One meeting cannot\nexplain a place.',
    leftParagraphs: [
      'Understanding grows through return visits and unhurried time together. A conversation continues where the last one ended. A detail that seemed small begins to reveal how work, family and landscape are connected.',
      'Trust is not a step to complete before the real work begins. It is the work.',
    ],
    rightParagraphs: [
      'Time gives people room to change their minds, set limits and decide how they want to participate. It also gives us the chance to correct our assumptions before they become part of a journey.',
      'What emerges is not access to a place, but a clearer sense of responsibility toward the people who live there.',
    ],
    images: [
      { src: `${relationshipsAsset}/laughter-in-the-field.jpg`, alt: 'A candid exchange between villagers and visitors in a field' },
      { src: `${relationshipsAsset}/everyday-company.jpg`, alt: 'Women spending time together outside a rural home' },
      { src: `${relationshipsAsset}/listening-in-the-tea-field.jpg`, alt: 'A conversation among people working in the tea fields' },
    ],
    captions: ['Trust grows through time spent together.', 'Listening changes how the place is understood.'],
  },
  action: {
    eyebrow: '03 / LET PEOPLE SHAPE THE EXPERIENCE',
    title: 'Local life is not\na supporting role.',
    paragraphs: [
      'A responsible experience is not designed elsewhere and placed over a village. It grows from what people are already doing, what they want to share and what makes sense within the rhythm of their work and home life.',
      'A harvest, a meal or a walk through the fields matters because of the knowledge and relationships around it—not because it has been turned into a performance on demand.',
      'The plan must remain flexible enough for local people to remain authors of how their home is represented.',
    ],
    images: [
      { src: `${relationshipsAsset}/reading-the-harvest.jpg`, alt: 'Reading the harvest together in a rural field' },
      { src: `${relationshipsAsset}/shared-meal.jpg`, alt: 'A meal shared outside village homes' },
      { src: `${relationshipsAsset}/village-garden-conversation.jpg`, alt: 'A working garden where conversation shapes the visit' },
    ],
  },
  belief: {
    eyebrow: '04 / WHAT RELATIONSHIPS CHANGE',
    title: 'Care includes knowing\nwhat not to share.',
    paragraphs: [
      'A welcoming conversation does not automatically become material for a website, and an open doorway is not permission to enter with a camera. The people in a place must remain in control of how their lives are represented.',
      'Some knowledge belongs to a family, some moments should remain private and some places are not improved by becoming a stop. Respect is measured not only by what we share, but by what we choose to leave undisturbed.',
    ],
    sideParagraphs: [
      'Relationships change timing, language, group size and the expectations we set before anyone arrives. They also change us—exposing assumptions and reminding us that good travel design begins with attention, reciprocity and restraint.',
    ],
    quote: 'Responsible storytelling also means knowing when not to tell a story.',
    images: [
      { src: `${relationshipsAsset}/tea-between-generations.jpg`, alt: 'Everyday conversation shared between generations' },
      { src: `${relationshipsAsset}/conversation-at-the-table.jpg`, alt: 'People learning about one another around a table' },
      { src: `${relationshipsAsset}/listening-in-the-tea-field.jpg`, alt: 'Listening carefully among the tea rows' },
    ],
  },
  closing: {
    eyebrow: 'THE PRINCIPLE WE KEEP',
    title: 'Return. Listen.\nBegin Again.',
    paragraph: 'Routes may change with weather, seasons and the realities of village life. Relationships are what allow a journey to remain responsive and meaningful. We return because one visit is never enough—and because the people who live here should continue to shape what happens next.',
    image: { src: `${relationshipsAsset}/walking-together.jpg`, alt: 'A group continuing together along a mountain village path' },
  },
  recommendations: {
    title: 'What We Are Explore',
    description: 'Ongoing ways to meet, listen and take part with care.',
    backgroundImage: `${relationshipsAsset}/everyday-company.jpg`,
  },
  cta: {
    title: 'So, Ready to Begin With People?',
    buttonLabel: 'Explore Activities',
    buttonHref: '/explore',
    image: `${relationshipsAsset}/shared-meal.jpg`,
  },
};

export const ourStoryEditorialPages: Record<string, OurStoryEditorialContent> = {
  'why-we-started': whyWeStarted,
  'what-we-believe': whatWeBelieve,
  'our-way-of-travel': ourWayOfTravel,
  'before-a-journey-becomes-a-route': beforeAJourneyBecomesARoute,
  'the-rhythm-of-clay': theRhythmOfClay,
  'working-with-what-is-already-here': workingWithWhatIsAlreadyHere,
  'into-the-forest-together': intoTheForestTogether,
  'beyond-visiting': beyondVisiting,
  'a-pattern-made-together': aPatternMadeTogether,
  'where-the-tea-hills-begin': whereTheTeaHillsBegin,
  'relationships-before-routes': relationshipsBeforeRoutes,
};
