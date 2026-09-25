export const EDITORIAL_BLOCK_TYPES = [
  'text', 'split', 'image-text', 'full-image', 'double-image',
  'collage', 'quote-image', 'statement', 'gallery', 'divider',
] as const;

export type EditorialBlockType = (typeof EDITORIAL_BLOCK_TYPES)[number];

export interface EditorialBlock {
  id: string;
  type: EditorialBlockType;
  eyebrow: string;
  title: string;
  body: string[];
  quote: string;
  images: string[];
  captions: string[];
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  imageSide: 'left' | 'right';
  imageFit: 'cover' | 'contain';
  visible: boolean;
}

export const editorialBlockLabels: Record<EditorialBlockType, string> = {
  text: 'Editorial Text',
  split: 'Split Image + Text',
  'image-text': 'Large Image + Narrow Text',
  'full-image': 'Full-width Image',
  'double-image': 'Two-image Spread',
  collage: 'Magazine Collage',
  'quote-image': 'Quote + Image',
  statement: 'Large Statement',
  gallery: 'Image Sequence',
  divider: 'Chapter Divider',
};

const imageCount: Record<EditorialBlockType, number> = {
  text: 0, split: 1, 'image-text': 1, 'full-image': 1, 'double-image': 2,
  collage: 3, 'quote-image': 1, statement: 0, gallery: 4, divider: 0,
};

export function createEditorialBlock(type: EditorialBlockType, index = 0): EditorialBlock {
  return {
    id: `editorial-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    eyebrow: type === 'divider' ? `Chapter ${String(index + 1).padStart(2, '0')}` : 'Field Notes',
    title: type === 'statement' ? 'Add a thought that gives the page room to breathe.' : 'Add a section title',
    body: type === 'full-image' || type === 'divider' ? [] : ['Add the first paragraph here.', 'Add another paragraph when the story needs more detail.'],
    quote: type === 'quote-image' ? 'Add a line worth remembering.' : '',
    images: Array.from({ length: imageCount[type] }, () => ''),
    captions: Array.from({ length: imageCount[type] }, () => ''),
    backgroundColor: type === 'statement' ? '#17352d' : '#f4f0e7',
    textColor: type === 'statement' ? '#f5f1e8' : '#1b2822',
    accentColor: '#8d5b3f',
    imageSide: index % 2 ? 'right' : 'left',
    imageFit: 'cover',
    visible: true,
  };
}

export function normalizeEditorialBlocks(value: unknown): EditorialBlock[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item, index) => {
    if (!item || typeof item !== 'object') return [];
    const raw = item as Partial<EditorialBlock>;
    const type = EDITORIAL_BLOCK_TYPES.includes(raw.type as EditorialBlockType) ? raw.type as EditorialBlockType : 'text';
    const defaults = createEditorialBlock(type, index);
    return [{
      ...defaults,
      ...raw,
      id: String(raw.id || defaults.id),
      type,
      body: Array.isArray(raw.body) ? raw.body.map(String) : defaults.body,
      images: Array.isArray(raw.images) ? raw.images.map(String) : defaults.images,
      captions: Array.isArray(raw.captions) ? raw.captions.map(String) : defaults.captions,
      visible: raw.visible !== false,
    }];
  });
}
