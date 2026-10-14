import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight, Grid3X3, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useMediaObjectPosition } from '@/lib/media-position';
import type { ExplorePageContent } from '@shared/explore';

const DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";
const TEXT = '#52575c';

export default function ExploreActivityDetail({ content }: { content: ExplorePageContent }) {
  const detail = content.activityDetail;
  const getObjectPosition = useMediaObjectPosition();
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

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

  const gallery = [...detail.gallery, content.hero.image, ...detail.currentWork.images, detail.purpose.image, ...detail.people.images, detail.flexibility.image, detail.closing.image]
    .filter((src, index, all) => Boolean(src) && all.indexOf(src) === index);

  useEffect(() => {
    if (galleryIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setGalleryIndex(null);
      if (event.key === 'ArrowLeft') setGalleryIndex(index => index === null ? null : (index - 1 + gallery.length) % gallery.length);
      if (event.key === 'ArrowRight') setGalleryIndex(index => index === null ? null : (index + 1) % gallery.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [galleryIndex, gallery.length]);

  const blocks = [
    { title: detail.purpose.title, description: detail.purpose.paragraphs.join('\n\n'), imageUrl: detail.purpose.image },
    { title: detail.currentWork.title, description: detail.currentWork.paragraphs.join('\n\n'), imageUrl: detail.currentWork.images[0] },
    { title: detail.participation.title, description: [detail.participation.introduction, ...detail.participation.items.map(item => `${item.title}\n${item.description}`)].join('\n\n'), imageUrl: detail.currentWork.images[1] || detail.flexibility.image },
    { title: detail.flexibility.title, description: [...detail.flexibility.paragraphs, detail.flexibility.points.join(' · ')].join('\n\n'), imageUrl: detail.flexibility.image },
    { title: detail.people.title, description: detail.people.paragraphs.join('\n\n'), imageUrl: detail.people.images[0] },
    { title: detail.practical.title, description: [detail.practical.introduction, ...detail.practical.items.map(item => `${item.title}\n${item.description}`)].join('\n\n'), imageUrl: detail.people.images[1] || detail.closing.image },
    { title: detail.closing.title, description: detail.closing.paragraphs.join('\n\n'), imageUrl: detail.closing.image },
  ].filter(block => block.imageUrl);

  return <div className="activity-detail-page" style={{ fontFamily: SANS, background: '#fff', color: TEXT }}>
    <Navigation />

    <style>{`
      .activity-detail-page .activity-intro{width:min(1320px,calc(100% - 64px));margin:0 auto;padding:112px 0 88px}.activity-detail-page .activity-breadcrumb{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#999;margin:0 0 28px}.activity-detail-page .activity-breadcrumb a{color:inherit;text-decoration:none}.activity-detail-page .activity-breadcrumb a:hover{color:#111}.activity-detail-page .activity-overview{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(380px,.92fr);gap:clamp(48px,6vw,88px);align-items:start}.activity-detail-page .preview-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.activity-detail-page .preview-image{position:relative;aspect-ratio:4/3;overflow:hidden;border:0;padding:0;background:#eee;cursor:pointer}.activity-detail-page .preview-image img{width:100%;height:100%;display:block;object-fit:cover;transition:transform .45s ease,filter .25s ease}.activity-detail-page .preview-image:hover img{transform:scale(1.025);filter:brightness(.9)}.activity-detail-page .gallery-button{display:inline-flex;align-items:center;gap:9px;margin-top:18px;padding:0 0 7px;border:0;border-bottom:1px solid #F5569B;background:none;color:#F5569B;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.activity-detail-page .activity-copy{position:sticky;top:110px}.activity-detail-page .activity-category{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#F5569B;margin:0 0 18px}.activity-detail-page .activity-title{font-family:${DISPLAY};font-size:clamp(52px,6.2vw,86px);font-weight:400;line-height:.92;letter-spacing:.045em;text-transform:uppercase;color:#050505;margin:0 0 25px}.activity-detail-page .activity-excerpt{font-size:17px;line-height:1.62;letter-spacing:.025em;color:#5c5c5c;margin:0 0 30px}.activity-detail-page .activity-status{padding:18px 0;border-top:1px solid #dedede;border-bottom:1px solid #dedede;color:#F5569B;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.activity-detail-page .facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 28px;margin:5px 0 28px}.activity-detail-page .fact{padding:17px 0;border-bottom:1px solid #e5e5e5}.activity-detail-page .fact-label{display:block;font-size:10px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#999;margin-bottom:6px}.activity-detail-page .fact-value{font-size:14px;line-height:1.5;color:#222}.activity-detail-page .join-button{display:block;width:100%;padding:16px 22px;background:#111;color:#fff;text-align:center;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;transition:background .2s ease}.activity-detail-page .join-button:hover{background:#F5569B}.activity-detail-page .activity-note{font-size:12px;line-height:1.6;color:#777;margin:14px 0 0}.activity-detail-page .gallery-modal{position:fixed;inset:0;z-index:1000;background:#0b0b0b;color:#fff;display:flex;align-items:center;justify-content:center}.activity-detail-page .gallery-stage{width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:76px 110px}.activity-detail-page .gallery-stage img{display:block;max-width:100%;max-height:100%;object-fit:contain}.activity-detail-page .gallery-close,.activity-detail-page .gallery-arrow{position:absolute;border:0;background:rgba(255,255,255,.08);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s ease}.activity-detail-page .gallery-close{right:28px;top:24px;width:46px;height:46px}.activity-detail-page .gallery-arrow{top:50%;transform:translateY(-50%);width:50px;height:64px}.activity-detail-page .gallery-arrow:hover,.activity-detail-page .gallery-close:hover{background:rgba(255,255,255,.2)}.activity-detail-page .gallery-arrow.prev{left:28px}.activity-detail-page .gallery-arrow.next{right:28px}.activity-detail-page .gallery-count{position:absolute;left:28px;top:34px;font-size:11px;font-weight:700;letter-spacing:.16em}.activity-detail-page .gallery-caption{position:absolute;left:0;right:0;bottom:24px;text-align:center;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#bbb}@media(max-width:800px){.activity-detail-page .activity-intro{width:calc(100% - 40px);padding:92px 0 64px}.activity-detail-page .activity-overview{display:block}.activity-detail-page .preview-grid{gap:6px}.activity-detail-page .gallery-button{margin-bottom:42px}.activity-detail-page .activity-copy{position:static}.activity-detail-page .activity-title{font-size:clamp(48px,15vw,70px)}.activity-detail-page .gallery-stage{padding:70px 20px 86px}.activity-detail-page .gallery-arrow{top:auto;bottom:20px;transform:none;width:48px;height:48px}.activity-detail-page .gallery-arrow.prev{left:20px}.activity-detail-page .gallery-arrow.next{right:20px}.activity-detail-page .gallery-close{right:20px;top:18px}.activity-detail-page .gallery-count{left:20px;top:31px}.activity-detail-page .gallery-caption{bottom:35px}}
    `}</style>

    <section className="activity-intro">
      <p className="activity-breadcrumb">
        <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</Link><span style={{ margin: '0 6px', color: '#ccc' }}>/</span>
        <Link href="/explore" style={{ color: '#999', textDecoration: 'none' }}>Explore</Link><span style={{ margin: '0 6px', color: '#ccc' }}>/</span>
        <span style={{ color: '#555' }}>{content.hero.title}</span>
      </p>
      <div className="activity-overview">
        <div><div className="preview-grid">{gallery.slice(0,4).map((image,index)=><button type="button" className="preview-image" key={image} onClick={()=>setGalleryIndex(index)} aria-label={`Open photo ${index+1} of ${gallery.length}`}><img src={image} alt={`${content.hero.title} — view ${index+1}`} style={{objectPosition:getObjectPosition(image)}}/></button>)}</div><button type="button" className="gallery-button" onClick={()=>setGalleryIndex(0)}><Grid3X3 size={15}/> View all photos · {gallery.length}</button></div>
        <aside className="activity-copy">
          <p className="activity-category">{content.activity.type} / {detail.category}</p>
          <h1 className="activity-title">{content.hero.title}</h1>
          <p className="activity-excerpt">{detail.excerpt}</p>
          <div className="activity-status">{content.activity.statusLabel}</div>
          <div className="facts"><Fact label="Location" value={content.activity.location}/><Fact label="Duration" value={content.activity.duration}/><Fact label="Group size" value={content.activity.groupSize}/><Fact label="Participation" value={content.activity.difficulty}/></div>
          <Link href={content.activity.registrationHref} className="join-button">{content.activity.registrationLabel}</Link>
          <p className="activity-note">{content.activity.note}</p>
        </aside>
      </div>
    </section>

    {galleryIndex!==null&&<div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`${content.hero.title} photo gallery`}><button type="button" className="gallery-close" onClick={()=>setGalleryIndex(null)} aria-label="Close gallery"><X size={24}/></button><span className="gallery-count">{String(galleryIndex+1).padStart(2,'0')} / {String(gallery.length).padStart(2,'0')}</span><button type="button" className="gallery-arrow prev" onClick={()=>setGalleryIndex((galleryIndex-1+gallery.length)%gallery.length)} aria-label="Previous photo"><ChevronLeft size={28}/></button><div className="gallery-stage"><img src={gallery[galleryIndex]} alt={`${content.hero.title} — photo ${galleryIndex+1}`}/></div><button type="button" className="gallery-arrow next" onClick={()=>setGalleryIndex((galleryIndex+1)%gallery.length)} aria-label="Next photo"><ChevronRight size={28}/></button><div className="gallery-caption">Build together / working with what is already here</div></div>}

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

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="fact"><span className="fact-label">{label}</span><span className="fact-value">{value}</span></div>;
}
