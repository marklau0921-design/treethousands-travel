import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/components/AdminLayout';
import { trpc } from '@/lib/trpc';

const input: React.CSSProperties = { width: '100%', padding: '11px 13px', fontSize: 13, background: '#f2f2f2', border: '1px solid #ddd', outline: 'none', color: '#2d2d2d', boxSizing: 'border-box' };

export default function AdminContactInformation() {
  const utils = trpc.useUtils();
  const { data, isLoading } = trpc.contactSettings.get.useQuery();
  const [email, setEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [emailBackgroundColor, setEmailBackgroundColor] = useState('#f5f1e8');
  const [emailTextColor, setEmailTextColor] = useState('#17251f');
  const [whatsappBackgroundColor, setWhatsappBackgroundColor] = useState('#e5ddce');
  const [whatsappTextColor, setWhatsappTextColor] = useState('#17251f');
  useEffect(() => { if (data) { setEmail(data.email); setWhatsappNumber(data.whatsappNumber); setEmailBackgroundColor(data.emailBackgroundColor); setEmailTextColor(data.emailTextColor); setWhatsappBackgroundColor(data.whatsappBackgroundColor); setWhatsappTextColor(data.whatsappTextColor); } }, [data]);
  const update = trpc.contactSettings.update.useMutation({ onSuccess: () => { utils.contactSettings.get.invalidate(); toast.success('Contact information saved'); }, onError: error => toast.error(error.message) });

  const colorControl = (label: string, value: string, setter: (value: string) => void) => <div><label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#888', marginBottom: 7 }}>{label}</label><div style={{ display: 'flex', gap: 8 }}><input type="color" value={value} onChange={event => setter(event.target.value)} style={{ width: 46, height: 40, border: '1px solid #ddd', padding: 3, background: '#fff' }}/><input value={value} onChange={event => setter(event.target.value)} pattern="#[0-9a-fA-F]{6}" style={input}/></div></div>;
  return <AdminLayout title="Contact Information"><div style={{ padding: 32, maxWidth: 780 }}><h1 style={{ fontSize: 22, fontWeight: 300, letterSpacing: '.1em', textTransform: 'uppercase', margin: 0 }}>Contact Information</h1><p style={{ fontSize: 13, color: '#888', margin: '6px 0 28px', lineHeight: 1.6 }}>Used by the floating WhatsApp button and the Join Us navigation panel. Both panels automatically use the Brand Assets Background Texture.</p><form onSubmit={event => { event.preventDefault(); update.mutate({ email, whatsappNumber, emailBackgroundColor, emailTextColor, whatsappBackgroundColor, whatsappTextColor }); }} style={{ background: '#fff', border: '1px solid #eee', padding: 28 }}><label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#888', marginBottom: 7 }}>Receiving Email</label><input type="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="hello@treethousands.com" style={input} /><label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#888', margin: '22px 0 7px' }}>WhatsApp Number</label><input value={whatsappNumber} onChange={event => setWhatsappNumber(event.target.value)} placeholder="8613800000000" style={input} /><p style={{ fontSize: 12, color: '#999', margin: '8px 0 0' }}>Include the country code. Spaces, + signs and punctuation are accepted.</p><div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 18, marginTop: 28, paddingTop: 24, borderTop: '1px solid #eee' }}>{colorControl('Email Background', emailBackgroundColor, setEmailBackgroundColor)}{colorControl('Email Text', emailTextColor, setEmailTextColor)}{colorControl('WhatsApp Background', whatsappBackgroundColor, setWhatsappBackgroundColor)}{colorControl('WhatsApp Text', whatsappTextColor, setWhatsappTextColor)}</div><button disabled={isLoading || update.isPending} style={{ marginTop: 26, padding: '11px 28px', background: '#F5569B', color: '#fff', border: 0, fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer' }}>{update.isPending ? 'Saving...' : 'Save Contact Information'}</button></form></div></AdminLayout>;
}
