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
  useEffect(() => { if (data) { setEmail(data.email); setWhatsappNumber(data.whatsappNumber); } }, [data]);
  const update = trpc.contactSettings.update.useMutation({ onSuccess: () => { utils.contactSettings.get.invalidate(); toast.success('Contact information saved'); }, onError: error => toast.error(error.message) });

  return <AdminLayout title="Contact Information"><div style={{ padding: 32, maxWidth: 780 }}><h1 style={{ fontSize: 22, fontWeight: 300, letterSpacing: '.1em', textTransform: 'uppercase', margin: 0 }}>Contact Information</h1><p style={{ fontSize: 13, color: '#888', margin: '6px 0 28px', lineHeight: 1.6 }}>Used by the floating WhatsApp button and the Join Us navigation panel.</p><form onSubmit={event => { event.preventDefault(); update.mutate({ email, whatsappNumber }); }} style={{ background: '#fff', border: '1px solid #eee', padding: 28 }}><label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#888', marginBottom: 7 }}>Receiving Email</label><input type="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="hello@treethousands.com" style={input} /><label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#888', margin: '22px 0 7px' }}>WhatsApp Number</label><input required value={whatsappNumber} onChange={event => setWhatsappNumber(event.target.value)} placeholder="8613800000000" style={input} /><p style={{ fontSize: 12, color: '#999', margin: '8px 0 0' }}>Include the country code. Spaces, + signs and punctuation are accepted.</p><button disabled={isLoading || update.isPending} style={{ marginTop: 26, padding: '11px 28px', background: '#F5569B', color: '#fff', border: 0, fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer' }}>{update.isPending ? 'Saving...' : 'Save Contact Information'}</button></form></div></AdminLayout>;
}
