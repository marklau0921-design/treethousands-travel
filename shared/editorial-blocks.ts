export const EDITORIAL_BLOCK_TYPES = [
  'our-story-split', 'our-story-quote', 'our-story-sheet', 'our-story-mosaic', 'our-story-closing',
  'explore-visual', 'explore-details', 'explore-statement', 'explore-perspectives',
  'story-context', 'story-spread', 'story-photo-quote', 'story-closing',
  'home-edge-rows', 'city-culinary',
  'magazine-full-bleed', 'magazine-inline', 'magazine-contact-sheet', 'magazine-columns',
] as const;

export type EditorialBlockType = (typeof EDITORIAL_BLOCK_TYPES)[number];

export interface EditorialBlock {
  id: string; type: EditorialBlockType; eyebrow: string; title: string; body: string[]; quote: string;
  images: string[]; captions: string[]; backgroundColor: string; textColor: string; accentColor: string;
  imageSide: 'left' | 'right'; imageFit: 'cover' | 'contain'; visible: boolean;
}

export const editorialBlockLabels: Record<EditorialBlockType, string> = {
  'our-story-split': 'TreeThousands / Our Story — Edge-to-Edge Split',
  'our-story-quote': 'TreeThousands / Our Story — Dark Quote Split',
  'our-story-sheet': 'TreeThousands / Our Story — Editorial Sheet',
  'our-story-mosaic': 'TreeThousands / Our Story — Four-Perspective Mosaic',
  'our-story-closing': 'TreeThousands / Our Story — Closing Reflection',
  'explore-visual': 'TreeThousands / Explore — Three-Image Visual Story',
  'explore-details': 'TreeThousands / Explore — Six-Image Details Rhythm',
  'explore-statement': 'TreeThousands / Explore — Full Statement',
  'explore-perspectives': 'TreeThousands / Explore — Staggered Perspectives',
  'story-context': 'TreeThousands / Stories — Context + Lead',
  'story-spread': 'TreeThousands / Stories — Two-Image Magazine Spread',
  'story-photo-quote': 'TreeThousands / Stories — Photo Pair + Pull Quote',
  'story-closing': 'TreeThousands / Stories — Narrow Copy + Portrait',
  'home-edge-rows': 'TreeThousands / Home — Alternating Edge Row',
  'city-culinary': 'TreeThousands / City — Culinary Editorial Feature',
  'magazine-full-bleed': 'Magazine / Full-Bleed Photo Essay',
  'magazine-inline': 'Magazine / Long-form Text + Inline Image',
  'magazine-contact-sheet': 'Magazine / Documentary Contact Sheet',
  'magazine-columns': 'Magazine / Two-column Essay + Pull Quote',
};

const imageCount: Record<EditorialBlockType, number> = {
  'our-story-split': 1, 'our-story-quote': 1, 'our-story-sheet': 1, 'our-story-mosaic': 4, 'our-story-closing': 1,
  'explore-visual': 3, 'explore-details': 6, 'explore-statement': 0, 'explore-perspectives': 3,
  'story-context': 0, 'story-spread': 2, 'story-photo-quote': 2, 'story-closing': 1,
  'home-edge-rows': 1, 'city-culinary': 3, 'magazine-full-bleed': 1, 'magazine-inline': 1,
  'magazine-contact-sheet': 6, 'magazine-columns': 1,
};

const quoteTypes: EditorialBlockType[] = ['our-story-quote', 'story-photo-quote', 'magazine-columns'];

export function createEditorialBlock(type: EditorialBlockType, index = 0): EditorialBlock {
  const dark = type === 'our-story-quote' || type === 'explore-statement';
  return {
    id: `editorial-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 7)}`, type,
    eyebrow: `Section ${String(index + 1).padStart(2, '0')}`,
    title: type === 'explore-statement' ? 'Add a thought that gives the page room to breathe.' : 'Add a section title',
    body: type === 'magazine-full-bleed' || type === 'explore-statement' ? [] : ['Add the first paragraph here.', 'Add another paragraph when the story needs more detail.'],
    quote: quoteTypes.includes(type) ? 'Add a line worth remembering.' : '',
    images: Array.from({ length: imageCount[type] }, () => ''), captions: Array.from({ length: imageCount[type] }, () => ''),
    backgroundColor: dark ? '#17352d' : '#f4f0e7', textColor: dark ? '#f5f1e8' : '#1b2822', accentColor: dark ? '#d3aa86' : '#8d5b3f',
    imageSide: index % 2 ? 'right' : 'left', imageFit: 'cover', visible: true,
  };
}

const legacyTypes: Record<string, EditorialBlockType> = {
  text: 'story-context', split: 'our-story-split', 'image-text': 'our-story-closing', 'full-image': 'magazine-full-bleed',
  'double-image': 'story-spread', collage: 'explore-visual', 'quote-image': 'our-story-quote', statement: 'explore-statement',
  gallery: 'magazine-contact-sheet', divider: 'explore-statement',
};

export function normalizeEditorialBlocks(value: unknown): EditorialBlock[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item, index) => {
    if (!item || typeof item !== 'object') return [];
    const raw = item as Partial<EditorialBlock> & { type?: string };
    const resolved = legacyTypes[String(raw.type)] || raw.type;
    const type = EDITORIAL_BLOCK_TYPES.includes(resolved as EditorialBlockType) ? resolved as EditorialBlockType : 'story-context';
    const defaults = createEditorialBlock(type, index);
    return [{ ...defaults, ...raw, id: String(raw.id || defaults.id), type, body: Array.isArray(raw.body) ? raw.body.map(String) : defaults.body, images: Array.isArray(raw.images) ? raw.images.map(String) : defaults.images, captions: Array.isArray(raw.captions) ? raw.captions.map(String) : defaults.captions, visible: raw.visible !== false }];
  });
}
