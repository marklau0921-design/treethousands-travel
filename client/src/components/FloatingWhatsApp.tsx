import { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';

const cleanNumber = (value: string) => value.replace(/\D/g, '');

export default function FloatingWhatsApp() {
  const [location] = useLocation();
  const { data } = trpc.contactSettings.get.useQuery();
  const [position, setPosition] = useState(() => { try { return JSON.parse(localStorage.getItem('tt-whatsapp-position') || 'null') || { x: window.innerWidth - 82, y: window.innerHeight - 130 }; } catch { return { x: window.innerWidth - 82, y: window.innerHeight - 130 }; } });
  const drag = useRef<{ dx: number; dy: number; startX: number; startY: number } | null>(null);
  useEffect(() => { const keepInView = () => setPosition((current: any) => ({ x: Math.max(10, Math.min(window.innerWidth - 66, current.x)), y: Math.max(65, Math.min(window.innerHeight - 66, current.y)) })); window.addEventListener('resize', keepInView); return () => window.removeEventListener('resize', keepInView); }, []);
  if (location.startsWith('/admin') || !cleanNumber(data?.whatsappNumber || '')) return null;
  return <button type="button" aria-label="Chat on WhatsApp" title="Drag to move · Click to chat" onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); drag.current = { dx: event.clientX - position.x, dy: event.clientY - position.y, startX: event.clientX, startY: event.clientY }; }} onPointerMove={event => { if (!drag.current) return; setPosition({ x: Math.max(10, Math.min(window.innerWidth - 66, event.clientX - drag.current.dx)), y: Math.max(65, Math.min(window.innerHeight - 66, event.clientY - drag.current.dy)) }); }} onPointerUp={event => { if (!drag.current) return; const moved = Math.hypot(event.clientX - drag.current.startX, event.clientY - drag.current.startY); drag.current = null; localStorage.setItem('tt-whatsapp-position', JSON.stringify(position)); if (moved < 6) window.open(`https://wa.me/${cleanNumber(data!.whatsappNumber)}`, '_blank', 'noopener,noreferrer'); }} style={{ position: 'fixed', left: position.x, top: position.y, zIndex: 48, width: 56, height: 56, borderRadius: '50%', border: '1px solid rgba(255,255,255,.7)', background: '#25D366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(0,0,0,.22)', cursor: 'grab', touchAction: 'none' }}><MessageCircle size={29} strokeWidth={2} /></button>;
}
