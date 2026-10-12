import { useEffect } from 'react';
import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { HeroCarousel } from '@/pages/ExperienceDetail';
import { useMediaObjectPosition } from '@/lib/media-position';
import type { ExplorePageContent } from '@shared/explore';

const DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";
const TEXT = '#52575c';

export default function ExploreActivityDetail({ content }: { content: ExplorePageContent }) {
  const detail = content.activityDetail;
  const getObjectPosition = useMediaObjectPosition();

  useEffect(() => {
    document.title = `${content.hero.title} | TreeThousands`;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = detail?.excerpt || content.hero.subtitle;
  }, [content.hero.title, content.hero.subtitle, detail?.excerpt]);

  if (!detail) return null;

  const gallery = [content.hero.image, ...detail.currentWork.images, detail.purpose.image, ...detail.people.images, detail.flexibility.image, detail.closing.image]
    .filter((src, index, all) => Boolean(src) && all.indexOf(src) === index);

  const blocks = [
    { title: detail.purpose.title, description: detail.purpose.paragraphs.join('\n\n'), imageUrl: detail.purpose.image },
    { title: detail.currentWork.title, description: detail.currentWork.paragraphs.join('\n\n'), imageUrl: detail.currentWork.images[0] },
    { title: detail.participation.title, description: [detail.participation.introduction, ...detail.participation.items.map(item => `${item.title}\n${item.description}`)].join('\n\n'), imageUrl: detail.currentWork.images[1] || detail.flexibility.image },
    { title: detail.flexibility.title, description: [...detail.flexibility.paragraphs, detail.flexibility.points.join(' · ')].join('\n\n'), imageUrl: detail.flexibility.image },
    { title: detail.people.title, description: detail.people.paragraphs.join('\n\n'), imageUrl: detail.people.images[0] },
    { title: detail.practical.title, description: [detail.practical.introduction, ...detail.practical.items.map(item => `${item.title}\n${item.description}`)].join('\n\n'), imageUrl: detail.people.images[1] || detail.closing.image },
    { title: detail.closing.title, description: detail.closing.paragraphs.join('\n\n'), imageUrl: detail.closing.image },
  ].filter(block => block.imageUrl);

  return <div style={{ fontFamily: SANS, background: '#fff', color: TEXT }}>
    <Navigation />

    <div style={{ paddingTop: 55, background: '#fff' }}>
      <p style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: '.85px', textTransform: 'uppercase', color: '#999', marginBottom: 0, textAlign: 'left', paddingLeft: 'clamp(28px, calc(-645px + 49.82vw), 305px)', paddingTop: 20 }}>
        <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</Link><span style={{ margin: '0 6px', color: '#ccc' }}>/</span>
        <Link href="/explore" style={{ color: '#999', textDecoration: 'none' }}>Explore</Link><span style={{ margin: '0 6px', color: '#ccc' }}>/</span>
        <span style={{ color: '#555' }}>{content.hero.title}</span>
      </p>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 32px 36px', textAlign: 'center' }}>
        <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, letterSpacing: '.85px', lineHeight: 1.5, textTransform: 'uppercase', color: '#F5569B', marginBottom: 12 }}>{detail.category}</p>
        <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(38px,5vw,45px)', fontWeight: 400, lineHeight: 1, letterSpacing: '2.25px', color: '#000', marginBottom: 24, textTransform: 'uppercase' }}>{content.hero.title}</h1>
        <div style={{ width: 48, height: 1, background: '#ccc', margin: '0 auto 32px' }} />
        <div className="explore-meta"><Meta label="Availability" value={content.activity.statusLabel} color="#cc5426" /><Meta label="Arrangement" value={content.activity.dateLabel} color="#379c8a" /><Meta label="How long" value={content.activity.duration} color="#1e6e9f" /></div>
      </div>
    </div>

    <style>{`.explore-meta{display:flex;justify-content:space-between;flex-wrap:wrap;gap:24px}.explore-meta>div{flex:1;text-align:center}@media(max-width:640px){.explore-meta{display:grid;grid-template-columns:1fr}.explore-meta>div{padding:8px 0}}`}</style>
    {gallery.length > 0 && <HeroCarousel images={gallery} />}

    <div className="tea-body">
      <div style={{ maxWidth: 800, margin: '0 auto 48px', padding: '0 24px', textAlign: 'center', boxSizing: 'border-box' }}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(34px,4vw,45px)', fontWeight: 400, lineHeight: 1, letterSpacing: '2.25px', color: '#000', margin: '0 0 18px', textTransform: 'uppercase' }}>{detail.purpose.eyebrow}</h2>
        <p style={{ fontSize: 17, lineHeight: 1.5, color: TEXT, fontFamily: SANS, letterSpacing: '.85px', margin: 0 }}>{detail.excerpt}</p>
      </div>

      {blocks.map((block, index) => {
        const text = <div className="tea-detail-text"><div className="tea-detail-text-inner"><h3 style={{ fontFamily: DISPLAY, fontSize: 'clamp(34px,3.6vw,45px)', fontWeight: 400, lineHeight: 1, letterSpacing: '2.25px', color: '#000', margin: '0 0 18px', textTransform: 'uppercase' }}>{block.title}</h3><p style={{ fontSize: 17, lineHeight: 1.5, color: TEXT, fontFamily: SANS, letterSpacing: '.85px', margin: 0, whiteSpace: 'pre-line' }}>{block.description}</p></div></div>;
        const image = <div className="tea-detail-img-wrap"><img src={block.imageUrl} alt={block.title} className="tea-detail-img" style={{ objectPosition: getObjectPosition(block.imageUrl) }} /></div>;
        return <div key={block.title} className={`tea-detail-row${index % 2 === 0 ? '' : ' mirror'}`}>{index % 2 === 0 ? <>{text}{image}</> : <>{image}{text}</>}</div>;
      })}
    </div>

    <section style={{ position: 'relative', width: '100%', height: 'clamp(260px,30vw,275px)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: content.cta.backgroundColor || '#1a1a1a' }}>
      {content.cta.textureImage && <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${content.cta.textureImage})`, backgroundRepeat: 'repeat', backgroundSize: '420px 420px', opacity: content.cta.textureOpacity / 100 }} />}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, textAlign: 'center', padding: '0 24px' }}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 45, fontWeight: 400, color: content.cta.textColor || '#fff', letterSpacing: '2.25px', textTransform: 'uppercase', margin: 0, lineHeight: 1 }}>{content.cta.title}</h2>
        <Link href={content.activity.registrationHref} style={{ backgroundColor: content.cta.buttonBackgroundColor || '#111', color: content.cta.buttonTextColor || '#fff', fontFamily: SANS, fontSize: 13, fontWeight: 700, letterSpacing: '.85px', lineHeight: 1.5, textTransform: 'uppercase', padding: '14px 36px', border: '2px solid #111', textDecoration: 'none' }}>{content.activity.registrationLabel}</Link>
      </div>
    </section>
    <Footer />
  </div>;
}

function Meta({ label, value, color }: { label: string; value: string; color: string }) {
  return <div><p style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 400, letterSpacing: '2.6px', lineHeight: 1, textTransform: 'uppercase', color, marginBottom: 10 }}>{label}</p><p style={{ fontFamily: SANS, fontStyle: 'italic', fontSize: 17, fontWeight: 400, letterSpacing: '.85px', color: TEXT, lineHeight: 1.5, margin: 0 }}>{value}</p></div>;
}
