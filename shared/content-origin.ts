export const CONTENT_ORIGIN_OPTIONS = [
  { value: 'confirmed', label: 'Formal', description: 'Reviewed or created for the live website.' },
  { value: 'placeholder', label: 'Filler', description: 'Temporary copy or imagery that may be removed later.' },
  { value: 'system', label: 'System Default', description: 'Default content supplied by the website template.' },
  { value: 'review', label: 'Pending Review', description: 'Existing content whose source has not yet been confirmed.' },
] as const;

export type ContentOrigin = (typeof CONTENT_ORIGIN_OPTIONS)[number]['value'];

export function normalizeContentOrigin(value: unknown, fallback: ContentOrigin = 'review'): ContentOrigin {
  return CONTENT_ORIGIN_OPTIONS.some(option => option.value === value) ? value as ContentOrigin : fallback;
}
