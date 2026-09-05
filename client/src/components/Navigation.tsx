import { useEffect, useRef, useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Link, useLocation } from 'wouter';
import { X } from 'lucide-react';

type MenuKey = 'our-story' | 'explore' | 'stories' | 'join-us';
const NAV_SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";
const NAV_DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";

const NAV_ITEMS: Array<{ label: string; href: string; key?: MenuKey; children?: Array<{ label: string; href: string }> }> = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '/our-story', key: 'our-story', children: [
    { label: 'Why We Started', href: '/our-story/why-we-started' },
    { label: 'What We Believe', href: '/our-story/what-we-believe' },
    { label: 'Our Way of Travel', href: '/our-story/our-way-of-travel' },
    { label: 'Why Rural China', href: '/our-story/why-rural-china' },
    { label: 'Growing Together', href: '/our-story/growing-together' },
  ] },
  { label: 'Explore', href: '/explore', key: 'explore', children: [
    { label: 'Village Life', href: '/explore/village-life' },
    { label: 'Nature & Landscape', href: '/explore/nature-landscape' },
    { label: 'People & Culture', href: '/explore/people-culture' },
  ] },
  { label: 'Stories', href: '/stories', key: 'stories', children: [
    { label: 'Brand Stories', href: '/stories/brand-stories' },
    { label: 'Village Notes', href: '/stories/village-notes' },
    { label: 'Local Life', href: '/stories/local-life' },
    { label: 'Journal', href: '/stories/journal' },
  ] },
  { label: 'Join Us', href: '/join-us', key: 'join-us', children: [
    { label: 'Individual Travelers', href: '/join-us/individual-travelers' },
    { label: 'Groups / Education', href: '/join-us/groups-education' },
    { label: 'Partnerships', href: '/join-us/partnerships' },
    { label: 'Contact Form', href: '/join-us/contact' },
  ] },
];

interface NavigationProps { forceHide?: boolean }

export default function Navigation({ forceHide = false }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [navVisible, setNavVisible] = useState(true);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const lastScrollY = useRef(0);
  const [location, setLocation] = useLocation();
  const { data: homepageAssets } = trpc.media.getHomepageAssets.useQuery();
  const logoUrl = homepageAssets?.logo?.url || '';
  const activeItem = NAV_ITEMS.find(item => item.key === activeMenu);
  const anyOverlayOpen = activeMenu !== null;

  useEffect(() => setLogoLoaded(false), [logoUrl]);
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setNavVisible(currentY <= window.innerHeight || currentY < lastScrollY.current);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    if (anyOverlayOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = parseInt(document.body.style.top || '0') * -1;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) window.scrollTo(0, scrollY);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [anyOverlayOpen]);
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => event.key === 'Escape' && setActiveMenu(null);
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const navigate = (href: string) => { setActiveMenu(null); setIsOpen(false); setLocation(href); };
  const isActive = (href: string) => href === '/' ? location === '/' : location.startsWith(href);

  return <>
    <style>{`
      .tt-nav-link{position:relative;padding-bottom:2px}.tt-nav-link:after{content:'';position:absolute;left:0;bottom:0;width:0;height:2px;background:#F5569B;transition:width .25s ease}.tt-nav-link:hover:after,.tt-nav-link.active:after{width:100%}
      .tt-menu-row{display:flex;align-items:center;justify-content:space-between;padding:8px 0;color:#111;font-family:${NAV_DISPLAY};font-size:25px;font-weight:400;letter-spacing:.04em;text-transform:uppercase;text-decoration:none;cursor:pointer;transition:color .15s}.tt-menu-row:hover{color:#F5569B}.tt-menu-row span:last-child{opacity:.4;transition:transform .2s,opacity .2s}.tt-menu-row:hover span:last-child{opacity:1;transform:translateX(4px)}
      .tt-hamburger-line{display:block;width:22px;height:2px;background:#fff;border-radius:2px;transition:transform .3s ease,opacity .3s ease}.tt-hamburger-open .top{transform:translateY(7px) rotate(45deg)}.tt-hamburger-open .middle{opacity:0}.tt-hamburger-open .bottom{transform:translateY(-7px) rotate(-45deg)}
    `}</style>
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ display: navVisible && !forceHide ? 'block' : 'none', background: anyOverlayOpen ? '#fff' : 'linear-gradient(to bottom,rgba(20,20,20,.55),rgba(20,20,20,0))', transition: 'background .25s ease' }}>
      <div className="flex items-center relative" style={{ height: 55 }}>
        <Link href="/" className="flex-shrink-0 group absolute" style={{ left: 'clamp(28px,calc(-645px + 49.82vw),305px)' }}>
          {logoUrl && <img src={logoUrl} alt="TreeThousands" className="group-hover:opacity-70 transition-opacity" style={{ height: 40, width: 'auto', objectFit: 'contain', visibility: logoLoaded ? 'visible' : 'hidden' }} onLoad={() => setLogoLoaded(true)} onError={() => setLogoLoaded(false)} />}
        </Link>
        <div className="hidden md:flex items-center gap-7 absolute left-1/2" style={{ transform: 'translateX(-50%)' }}>
          {NAV_ITEMS.map(item => item.key ? <button key={item.href} onClick={() => setActiveMenu(activeMenu === item.key ? null : item.key!)} style={{ color: anyOverlayOpen ? '#111' : '#fff', fontFamily: NAV_SANS, fontSize: 12, fontWeight: 700, letterSpacing: '.065em', textTransform: 'uppercase', background: 'none', border: 0, cursor: 'pointer', padding: 0 }}><span className={`tt-nav-link${isActive(item.href) || activeMenu === item.key ? ' active' : ''}`}>{item.label}</span></button> : <Link key={item.href} href={item.href} style={{ color: anyOverlayOpen ? '#111' : '#fff', fontFamily: NAV_SANS, fontSize: 12, fontWeight: 700, letterSpacing: '.065em', textTransform: 'uppercase', textDecoration: 'none' }}><span className={`tt-nav-link${isActive(item.href) ? ' active' : ''}`}>{item.label}</span></Link>)}
        </div>
        <div className="md:hidden flex items-center ml-auto pr-3"><button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" style={{ background: 'none', border: 0, cursor: 'pointer', padding: '8px 6px' }}><div className={`flex flex-col gap-[5px] ${isOpen ? 'tt-hamburger-open' : ''}`}><span className="tt-hamburger-line top"/><span className="tt-hamburger-line middle"/><span className="tt-hamburger-line bottom"/></div></button></div>
        {isOpen && <div className="md:hidden absolute right-0 top-[55px] min-w-[240px] py-3 px-6" style={{ background: 'linear-gradient(to bottom,rgba(20,20,20,.9),rgba(20,20,20,.75))' }}>{NAV_ITEMS.map(item => <button key={item.href} onClick={() => item.key ? (setActiveMenu(item.key),setIsOpen(false)) : navigate(item.href)} style={{ display: 'block', width: '100%', color: '#fff', fontFamily: NAV_SANS, fontSize: 13, fontWeight: 700, letterSpacing: '.065em', textTransform: 'uppercase', textAlign: 'left', background: 'none', border: 0, padding: '12px 0', cursor: 'pointer' }}>{item.label}</button>)}</div>}
      </div>
    </nav>
    {activeItem && <div style={{ position: 'fixed', inset: '55px 0 0', background: '#fff', zIndex: 49, overflow: 'auto' }}>
      <button onClick={() => setActiveMenu(null)} aria-label="Close menu" style={{ position: 'absolute', top: 12, right: 'clamp(28px,calc(-645px + 49.82vw),305px)', background: 'none', border: 0, cursor: 'pointer', color: '#222', padding: 4 }}><X size={24}/></button>
      <div style={{ paddingTop: 60, paddingBottom: 40, paddingLeft: 'clamp(28px,calc(-645px + 49.82vw),305px)', paddingRight: 64, maxWidth: 760 }}>
        <button onClick={() => navigate(activeItem.href)} className="tt-menu-row" style={{ width: '100%', background: 'none', border: 0 }}><span>{activeItem.label}</span><span>›</span></button>
        {activeItem.children?.map(child => <button key={child.href} onClick={() => navigate(child.href)} className="tt-menu-row" style={{ width: '100%', background: 'none', border: 0 }}><span>{child.label}</span><span>›</span></button>)}
      </div>
    </div>}
  </>;
}
