import React from 'react';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '@/components/AdminLayout';
import ImageUploader from '@/components/ImageUploader';
import { trpc } from '@/lib/trpc';

const ACCENT = '#F5569B';

type StoryForm = {
  slug: string;
  eyebrow: string;
  title: string;
  content: string;
  image: string;
  ctaLabel: string;
  ctaBgColor: string;
  ctaTextColor: string;
  isVisible: boolean;
  sortOrder: number;
};

const emptyForm: StoryForm = {
  slug: '',
  eyebrow: '',
  title: '',
  content: '',
  image: '',
  ctaLabel: 'Discover More',
  ctaBgColor: '#000000',
  ctaTextColor: '#ffffff',
  isVisible: true,
  sortOrder: 0,
};

const sectionStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #eee',
  padding: 28,
  marginBottom: 24,
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#888',
  marginBottom: 7,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  fontSize: 13,
  background: '#f2f2f2',
  border: '1px solid #ddd',
  outline: 'none',
  color: '#2d2d2d',
  boxSizing: 'border-box',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label style={labelStyle}>{label}</label>{children}</div>;
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <Field label={label}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input type="color" value={value} onChange={event => onChange(event.target.value)} style={{ width: 44, height: 36, padding: 0, border: '1px solid #ddd', background: 'transparent', cursor: 'pointer' }} />
        <input value={value} onChange={event => onChange(event.target.value)} style={inputStyle} />
      </div>
    </Field>
  );
}

function StoryEditor({ initial, isPending, onSave, onCancel }: {
  initial: StoryForm;
  isPending: boolean;
  onSave: (form: StoryForm) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = React.useState(initial);
  const update = <K extends keyof StoryForm>(key: K, value: StoryForm[K]) => setForm(current => ({ ...current, [key]: value }));

  return (
    <form onSubmit={event => { event.preventDefault(); onSave(form); }}>
      <div style={sectionStyle}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#1a1a1a', paddingBottom: 12, borderBottom: '1px solid #eee', marginBottom: 22 }}>
          {initial.slug ? `Edit ${initial.title}` : 'Add Our Story Item'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <Field label="Title *">
            <input required value={form.title} onChange={event => update('title', event.target.value)} style={inputStyle} placeholder="Why We Started" />
          </Field>
          <Field label="Eyebrow">
            <input value={form.eyebrow} onChange={event => update('eyebrow', event.target.value)} style={inputStyle} placeholder="Our Beginning" />
          </Field>
          <Field label="URL Slug *">
            <input required value={form.slug} onChange={event => update('slug', event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} style={inputStyle} placeholder="why-we-started" />
          </Field>
          <Field label="Sort Order">
            <input type="number" value={form.sortOrder} onChange={event => update('sortOrder', Number(event.target.value))} style={inputStyle} />
          </Field>
        </div>
        <Field label="Description *">
          <textarea required rows={5} value={form.content} onChange={event => update('content', event.target.value)} style={{ ...inputStyle, resize: 'vertical', marginBottom: 20 }} />
        </Field>
        <ImageUploader
          label="Section Image"
          value={form.image}
          onChange={value => update('image', value)}
          category="about"
          source="our-story"
          sourceLabel={form.title || 'Our Story'}
          sourceUrl={form.slug ? `/our-story/${form.slug}` : '/our-story'}
        />
      </div>

      <div style={sectionStyle}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#1a1a1a', paddingBottom: 12, borderBottom: '1px solid #eee', marginBottom: 22 }}>CTA Settings</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Field label="Button Label">
            <input value={form.ctaLabel} onChange={event => update('ctaLabel', event.target.value)} style={inputStyle} />
          </Field>
          <div />
          <ColorField label="Button Color" value={form.ctaBgColor} onChange={value => update('ctaBgColor', value)} />
          <ColorField label="Button Text Color" value={form.ctaTextColor} onChange={value => update('ctaTextColor', value)} />
        </div>
        <div style={{ marginTop: 22, padding: 20, background: '#f5f3ef', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', background: form.ctaBgColor, color: form.ctaTextColor, border: `2px solid ${form.ctaBgColor}`, padding: '11px 28px', fontSize: 12, fontWeight: 700, letterSpacing: '.13em', textTransform: 'uppercase' }}>
            {form.ctaLabel || 'Discover More'}
          </span>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, color: '#555', fontSize: 13, cursor: 'pointer' }}>
          <input type="checkbox" checked={form.isVisible} onChange={event => update('isVisible', event.target.checked)} />
          Show on public pages
        </label>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        <button type="submit" disabled={isPending} style={{ padding: '10px 28px', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', background: isPending ? '#eaa5c4' : ACCENT, color: '#fff', border: 0, cursor: isPending ? 'not-allowed' : 'pointer' }}>
          {isPending ? 'Saving...' : 'Save Item'}
        </button>
        <button type="button" onClick={onCancel} style={{ padding: '10px 24px', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', background: 'transparent', color: '#888', border: '1px solid #ddd', cursor: 'pointer' }}>Cancel</button>
      </div>
    </form>
  );
}

export default function AdminOurStory() {
  const utils = trpc.useUtils();
  const { data: sections = [], isLoading } = trpc.ourStory.listSections.useQuery();
  const [editingId, setEditingId] = React.useState<number | 'new' | null>(null);
  const invalidate = () => utils.ourStory.listSections.invalidate();
  const createMutation = trpc.ourStory.createSection.useMutation({ onSuccess: () => { invalidate(); setEditingId(null); toast.success('Our Story item created'); }, onError: error => toast.error(error.message) });
  const updateMutation = trpc.ourStory.updateSection.useMutation({ onSuccess: () => { invalidate(); setEditingId(null); toast.success('Our Story item saved'); }, onError: error => toast.error(error.message) });
  const deleteMutation = trpc.ourStory.deleteSection.useMutation({ onSuccess: () => { invalidate(); toast.success('Our Story item deleted'); }, onError: error => toast.error(error.message) });

  const editing = editingId === 'new' ? null : sections.find(section => section.id === editingId);
  const toForm = (section: typeof sections[number]): StoryForm => ({
    slug: section.slug,
    eyebrow: section.eyebrow ?? '',
    title: section.title,
    content: section.content,
    image: section.image ?? '',
    ctaLabel: section.ctaLabel,
    ctaBgColor: section.ctaBgColor,
    ctaTextColor: section.ctaTextColor,
    isVisible: section.isVisible,
    sortOrder: section.sortOrder,
  });

  return (
    <AdminLayout title="Our Story">
      <div style={{ padding: 32, maxWidth: 1050 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 300, letterSpacing: '.1em', textTransform: 'uppercase', color: '#1a1a1a', margin: 0 }}>Our Story</h1>
            <p style={{ fontSize: 13, color: '#888', margin: '5px 0 0' }}>Manage homepage cards, page content, images and CTA colors.</p>
          </div>
          {editingId === null && <button onClick={() => setEditingId('new')} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', background: ACCENT, color: '#fff', border: 0, cursor: 'pointer' }}><Plus size={14} /> Add Item</button>}
        </div>

        {editingId !== null ? (
          <StoryEditor
            key={editingId}
            initial={editing ? toForm(editing) : { ...emptyForm, sortOrder: sections.length }}
            isPending={createMutation.isPending || updateMutation.isPending}
            onCancel={() => setEditingId(null)}
            onSave={form => editing ? updateMutation.mutate({ id: editing.id, ...form }) : createMutation.mutate(form)}
          />
        ) : isLoading ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#888' }}>Loading...</div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid #eee' }}>
            {sections.length === 0 && <div style={{ padding: 48, textAlign: 'center', color: '#888', fontSize: 13 }}>No Our Story items yet. Add the first item above.</div>}
            {sections.map((section, index) => (
              <div key={section.id} style={{ display: 'grid', gridTemplateColumns: '88px 1fr 105px 100px', gap: 18, alignItems: 'center', padding: 16, background: index % 2 === 0 ? '#f7f7f7' : '#fff', borderBottom: '1px solid #eee' }}>
                <div style={{ width: 88, height: 66, background: '#e5e1d9', overflow: 'hidden' }}>
                  {section.image && <img src={section.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, color: '#1a1a1a', marginBottom: 4 }}>{section.title}</div>
                  <div style={{ fontSize: 11, color: '#999' }}>/our-story/{section.slug} · Order {section.sortOrder}</div>
                </div>
                <div style={{ fontSize: 11, color: section.isVisible ? ACCENT : '#aaa', textTransform: 'uppercase', letterSpacing: '.08em' }}>{section.isVisible ? 'Visible' : 'Hidden'}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                  <button onClick={() => setEditingId(section.id)} title="Edit" style={{ color: '#777', background: 'none', border: 0, padding: 6, cursor: 'pointer' }}><Edit2 size={15} /></button>
                  <button onClick={() => { if (confirm(`Delete “${section.title}”?`)) deleteMutation.mutate({ id: section.id }); }} title="Delete" style={{ color: '#b00020', background: 'none', border: 0, padding: 6, cursor: 'pointer' }}><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
