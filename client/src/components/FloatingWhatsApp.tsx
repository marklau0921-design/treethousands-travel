import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { MessageCircle } from 'lucide-react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';

const BUTTON_SIZE = 56;
const EDGE_GAP = 14;
const TOP_GAP = 76;
const STORAGE_KEY = 'tt-whatsapp-position';

type Position = { x: number; y: number; side: 'left' | 'right' };
type DragState = { dx: number; dy: number; startX: number; startY: number };

const cleanNumber = (value: string) => value.replace(/\D/g, '');
const edgeX = (side: Position['side']) => side === 'left' ? EDGE_GAP : window.innerWidth - BUTTON_SIZE - EDGE_GAP;
const clampY = (y: number) => Math.max(TOP_GAP, Math.min(window.innerHeight - BUTTON_SIZE - EDGE_GAP, y));

function initialPosition(): Position {
  const fallback: Position = { side: 'right', x: edgeX('right'), y: clampY(window.innerHeight * .68) };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!saved || typeof saved.y !== 'number') return fallback;
    const side: Position['side'] = saved.side === 'left' || saved.side === 'right'
      ? saved.side
      : Number(saved.x) + BUTTON_SIZE / 2 < window.innerWidth / 2 ? 'left' : 'right';
    return { side, x: edgeX(side), y: clampY(saved.y) };
  } catch {
    return fallback;
  }
}

export default function FloatingWhatsApp() {
  const [location] = useLocation();
  const { data } = trpc.contactSettings.get.useQuery();
  const [position, setPosition] = useState<Position>(initialPosition);
  const drag = useRef<DragState | null>(null);

  useEffect(() => {
    const keepOnEdge = () => setPosition(current => ({
      side: current.side,
      x: edgeX(current.side),
      y: clampY(current.y),
    }));
    window.addEventListener('resize', keepOnEdge);
    return () => window.removeEventListener('resize', keepOnEdge);
  }, []);

  const finishDrag = (event: ReactPointerEvent<HTMLButtonElement>, openOnClick: boolean) => {
    if (!drag.current) return;
    const moved = Math.hypot(event.clientX - drag.current.startX, event.clientY - drag.current.startY);
    const centerX = event.clientX - drag.current.dx + BUTTON_SIZE / 2;
    const side: Position['side'] = centerX < window.innerWidth / 2 ? 'left' : 'right';
    const next = { side, x: edgeX(side), y: clampY(event.clientY - drag.current.dy) };
    drag.current = null;
    setPosition(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ side: next.side, y: next.y }));
    if (openOnClick && moved < 6) {
      window.open(`https://wa.me/${cleanNumber(data?.whatsappNumber || '')}`, '_blank', 'noopener,noreferrer');
    }
  };

  if (location.startsWith('/admin')) return null;

  return (
    <button
      type="button"
      aria-label="Chat on WhatsApp"
      title="Drag vertically or move to either side · Click to chat"
      onPointerDown={event => {
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = {
          dx: event.clientX - position.x,
          dy: event.clientY - position.y,
          startX: event.clientX,
          startY: event.clientY,
        };
      }}
      onPointerMove={event => {
        if (!drag.current) return;
        setPosition(current => ({
          ...current,
          x: Math.max(EDGE_GAP, Math.min(window.innerWidth - BUTTON_SIZE - EDGE_GAP, event.clientX - drag.current!.dx)),
          y: clampY(event.clientY - drag.current!.dy),
        }));
      }}
      onPointerUp={event => finishDrag(event, true)}
      onPointerCancel={event => finishDrag(event, false)}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 60,
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,.7)',
        background: '#25D366',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 28px rgba(0,0,0,.22)',
        cursor: drag.current ? 'grabbing' : 'grab',
        touchAction: 'none',
        transition: drag.current ? 'none' : 'left .26s cubic-bezier(.22,.7,.2,1), top .18s ease-out',
      }}
    >
      <MessageCircle size={29} strokeWidth={2} />
    </button>
  );
}
