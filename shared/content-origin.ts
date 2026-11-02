export const CONTENT_ORIGIN_OPTIONS = [
  { value: 'confirmed', label: 'No marker', description: 'Finished content; no label is shown.' },
  { value: 'placeholder', label: 'Filler', description: 'Temporary copy or imagery that may be removed later.' },
] as const;

export type ContentOrigin = (typeof CONTENT_ORIGIN_OPTIONS)[number]['value'];

export function normalizeContentOrigin(value: unknown, fallback: ContentOrigin = 'placeholder'): ContentOrigin {
  return CONTENT_ORIGIN_OPTIONS.some(option => option.value === value) ? value as ContentOrigin : fallback;
}
