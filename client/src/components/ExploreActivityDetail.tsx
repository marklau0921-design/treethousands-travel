import { Link } from 'wouter';
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useMediaObjectPosition } from '@/lib/media-position';
import type { ExplorePageContent } from '@shared/explore';

const DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";

export default function ExploreActivityDetail({ content }: { content: ExplorePageContent }) {
  const detail = content.activityDetail;
  const position = useMediaObjectPosition();
  useEffect(() => {
    document.title = `${content.hero.title} | TreeThousands`;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = detail?.excerpt || content.hero.subtitle;
  }, [content.hero.title, content.hero.subtitle, detail?.excerpt]);
  if (!detail) return null;
  const image = (src: string, alt: string, className = '') => <img src={src} alt={alt} className={`activity-image ${className}`} style={{ objectPosition: position(src) }} />;

  return <div className="activity-page" style={{ fontFamily: SANS, background: '#f7f4ed', color: '#17251f' }}>
    <style>{`
      .activity-page *{box-sizing:border-box}.activity-page .wrap{width:min(1180px,calc(100% - 64px));margin:0 auto}.activity-page .display{font-family:${DISPLAY};font-weight:400;letter-spacing:.045em;line-height:.96;text-transform:uppercase}.activity-page .eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}.activity-page .copy{font-size:17px;line-height:1.72;letter-spacing:.012em;color:#4c5751}.activity-page .activity-image{display:block;width:100%;height:100%;object-fit:cover}.activity-page .button{display:flex;align-items:center;justify-content:center;padding:15px 24px;background:#151515;color:#fff;text-decoration:none;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;border:1px solid #151515;transition:transform .2s ease,background .2s ease}.activity-page .button:hover{background:#9b5e3d;border-color:#9b5e3d;transform:translateY(-2px)}
      .activity-page .gallery{display:grid;grid-template-columns:2fr 1fr;grid-template-rows:1fr 1fr;gap:10px;height:min(610px,66vw);max-height:610px;overflow:hidden}.activity-page .gallery-main{grid-row:1/3}.activity-page .gallery-cell{overflow:hidden;background:#d8d4ca}.activity-page .gallery-cell img{transition:transform .7s ease}.activity-page .gallery-cell:hover img{transform:scale(1.018)}
      .activity-page .intro-grid{display:block}.activity-page .intro-copy{max-width:860px}.activity-page .quick-facts{display:grid;grid-template-columns:repeat(4,1fr);margin-top:38px;border-top:1px solid #cbc5ba;border-bottom:1px solid #cbc5ba}.activity-page .fact{padding:22px 18px 22px 0}.activity-page .fact+.fact{padding-left:18px;border-left:1px solid #cbc5ba}.activity-page .status{display:inline-flex;align-items:center;gap:8px;padding:7px 11px;border:1px solid #b9b2a7;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.activity-page .status-dot{width:7px;height:7px;border-radius:50%;background:#6f8c54}
      .activity-page .booking-card{position:sticky;top:88px;border:1px solid #d1cbc0;background:#fff;padding:28px;box-shadow:0 16px 45px rgba(31,39,34,.08)}.activity-page .booking-row{display:flex;justify-content:space-between;gap:16px;padding:14px 0;border-top:1px solid #e1ddd5;font-size:13px;line-height:1.4}.activity-page .booking-row strong{text-align:right;font-weight:600}.activity-page .main-layout{display:grid;grid-template-columns:minmax(0,1fr) 350px;gap:80px;align-items:start}.activity-page .content-column{min-width:0}.activity-page .content-section{padding:68px 0;border-top:1px solid #cec8bd}.activity-page .content-section:first-child{border-top:0;padding-top:0}.activity-page .lead-image{height:470px;margin:34px 0 0}.activity-page .current-card{display:grid;grid-template-columns:1fr 1fr;background:#e4ded2;margin-top:34px}.activity-page .current-copy{padding:42px}.activity-page .current-image{min-height:390px}.activity-page .steps{border-top:1px solid #c5beb2;margin-top:36px}.activity-page .step{display:grid;grid-template-columns:58px 1fr;gap:20px;padding:26px 0;border-bottom:1px solid #c5beb2}.activity-page .step-number{font-family:${DISPLAY};font-size:33px;color:#9b5e3d}.activity-page .step h3{font-size:21px;margin:0 0 8px;font-weight:600}.activity-page .step p{font-size:15px;line-height:1.65;color:#59625d;margin:0}.activity-page .wide-photo{height:460px;margin:36px 0}.activity-page .point-grid,.activity-page .practical-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:30px}.activity-page .point,.activity-page .practical-card{background:#eee9df;padding:22px}.activity-page .point{font-size:13px;font-weight:700;letter-spacing:.07em;text-transform:uppercase}.activity-page .people-images{display:grid;grid-template-columns:1.2fr .8fr;gap:12px;margin-top:34px}.activity-page .people-images img:first-child{height:420px}.activity-page .people-images img:last-child{height:320px;align-self:end}.activity-page .practical-card h3{font-size:17px;margin:0 0 8px}.activity-page .practical-card p{font-size:14px;line-height:1.6;color:#59625d;margin:0}.activity-page .principles{background:#17352d;color:#f7f4ed;padding:46px;margin-top:34px}.activity-page .principle{display:grid;grid-template-columns:38px 1fr;gap:14px;padding:16px 0;border-top:1px solid rgba(255,255,255,.25);font-size:15px;line-height:1.55}.activity-page .closing{display:grid;grid-template-columns:1fr 1fr;background:#cdd3c4}.activity-page .closing-copy{padding:48px}.activity-page .closing-image{min-height:450px}.activity-page .mobile-action{display:none}
      @media(max-width:900px){.activity-page .intro-grid,.activity-page .main-layout{grid-template-columns:1fr;gap:42px}.activity-page .main-layout>.booking-card{display:none}.activity-page .booking-card{position:static}.activity-page .quick-facts{grid-template-columns:1fr 1fr}.activity-page .fact:nth-child(3){border-left:0;border-top:1px solid #cbc5ba}.activity-page .fact:nth-child(4){border-top:1px solid #cbc5ba}.activity-page .current-card,.activity-page .closing{grid-template-columns:1fr}.activity-page .current-image,.activity-page .closing-image{min-height:360px}}
      @media(max-width:640px){.activity-page .wrap{width:calc(100% - 36px)}.activity-page .gallery{height:68vw;min-height:300px;display:block}.activity-page .gallery-main{height:100%}.activity-page .gallery-cell:not(.gallery-main){display:none}.activity-page .quick-facts{margin-top:28px}.activity-page .fact{padding:17px 12px 17px 0}.activity-page .fact+.fact{padding-left:12px}.activity-page .content-section{padding:50px 0}.activity-page .lead-image,.activity-page .wide-photo{height:340px}.activity-page .current-copy,.activity-page .closing-copy{padding:28px 24px}.activity-page .current-image,.activity-page .closing-image{min-height:300px}.activity-page .point-grid,.activity-page .practical-grid{grid-template-columns:1fr}.activity-page .people-images{display:block}.activity-page .people-images img{height:330px!important;margin-top:10px}.activity-page .principles{padding:30px 24px}.activity-page .mobile-action{display:flex;position:fixed;left:16px;right:16px;bottom:14px;z-index:50;box-shadow:0 12px 35px rgba(0,0,0,.22)}}
    `}</style>
    <Navigation />
    <main>
      <div className="wrap" style={{ paddingTop: 34 }}>
        <Link href="/explore" className="eyebrow" style={{ display: 'inline-block', color: '#17251f', textDecoration: 'none', marginBottom: 22 }}>← All Activities</Link>
        <div className="gallery" aria-label="Activity photographs">
          <div className="gallery-cell gallery-main">{image(content.hero.image, content.hero.title)}</div>
          <div className="gallery-cell">{image(detail.currentWork.images[0] || detail.purpose.image, detail.currentWork.title)}</div>
          <div className="gallery-cell">{image(detail.currentWork.images[1] || detail.people.images[0], detail.people.title)}</div>
        </div>
      </div>
      <section className="wrap intro-grid" style={{ padding: 'clamp(48px,7vw,84px) 0 72px' }}>
        <div className="intro-copy">
          <p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 14px' }}>Explore / {detail.category}</p>
          <h1 className="display" style={{ fontSize: 'clamp(58px,8vw,104px)', maxWidth: 790, margin: '0 0 24px' }}>{content.hero.title}</h1>
          <p style={{ maxWidth: 760, fontSize: 'clamp(18px,2vw,23px)', lineHeight: 1.55, margin: '0 0 24px' }}>{detail.excerpt}</p>
          <span className="status"><span className="status-dot" />{content.activity.statusLabel}</span>
          <div className="quick-facts"><Info label="Place" value={content.activity.location} /><Info label="Duration" value={content.activity.duration} /><Info label="Group" value={content.activity.groupSize} /><Info label="Format" value={content.activity.difficulty} /></div>
        </div>
      </section>
      <section style={{ background: '#fff', padding: 'clamp(70px,9vw,118px) 0' }}>
        <div className="wrap main-layout">
          <div className="content-column">
            <article className="content-section"><Label text={detail.purpose.eyebrow} /><Title text={detail.purpose.title} />{detail.purpose.paragraphs.map((p, i) => <p className="copy" key={i}>{p}</p>)}<div className="lead-image">{image(detail.purpose.image, detail.purpose.title)}</div></article>
            <article className="content-section"><Label text={detail.currentWork.eyebrow} /><Title text={detail.currentWork.title} /><div className="current-card"><div className="current-copy">{detail.currentWork.paragraphs.map((p, i) => <p className="copy" key={i} style={{ fontSize: 16 }}>{p}</p>)}</div><div className="current-image">{image(detail.currentWork.images[0], detail.currentWork.title)}</div></div></article>
            <article className="content-section"><Label text={detail.participation.eyebrow} /><Title text={detail.participation.title} /><p className="copy">{detail.participation.introduction}</p><div className="steps">{detail.participation.items.map((item, i) => <div className="step" key={item.title}><span className="step-number">0{i + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></div>)}</div></article>
            <article className="content-section"><Label text={detail.flexibility.eyebrow} /><Title text={detail.flexibility.title} />{detail.flexibility.paragraphs.map((p, i) => <p className="copy" key={i}>{p}</p>)}<div className="wide-photo">{image(detail.flexibility.image, detail.flexibility.title)}</div><div className="point-grid">{detail.flexibility.points.map(point => <div className="point" key={point}>{point}</div>)}</div></article>
            <article className="content-section"><Label text={detail.people.eyebrow} /><Title text={detail.people.title} />{detail.people.paragraphs.map((p, i) => <p className="copy" key={i}>{p}</p>)}<div className="people-images">{detail.people.images.map((src, i) => image(src, `${detail.people.title} ${i + 1}`))}</div></article>
            <article className="content-section"><Label text={detail.practical.eyebrow} /><Title text={detail.practical.title} /><p className="copy">{detail.practical.introduction}</p><div className="practical-grid">{detail.practical.items.map(item => <div className="practical-card" key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>)}</div><div className="principles"><Label text={detail.principles.eyebrow} light /><h3 className="display" style={{ fontSize: 'clamp(42px,6vw,68px)', margin: '0 0 28px' }}>{detail.principles.title}</h3>{detail.principles.items.map((item, i) => <div className="principle" key={item}><span>0{i + 1}</span><span>{item}</span></div>)}</div></article>
            <article className="content-section"><div className="closing"><div className="closing-copy"><Label text={detail.closing.eyebrow} /><Title text={detail.closing.title} />{detail.closing.paragraphs.map((p, i) => <p className="copy" key={i} style={{ fontSize: 15 }}>{p}</p>)}<Link href={content.activity.registrationHref} className="button" style={{ marginTop: 26 }}>{content.activity.registrationLabel}</Link></div><div className="closing-image">{image(detail.closing.image, detail.closing.title)}</div></div></article>
          </div>
          <ParticipationCard content={content} />
        </div>
      </section>
    </main>
    <Link href={content.activity.registrationHref} className="button mobile-action">{content.activity.registrationLabel}</Link>
    <Footer />
  </div>;
}

function ParticipationCard({ content }: { content: ExplorePageContent }) {
  return <aside className="booking-card" aria-label="Participation information"><p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 10px' }}>Take Part</p><h2 style={{ fontSize: 25, lineHeight: 1.2, margin: '0 0 12px' }}>Join the work as it develops.</h2><p style={{ fontSize: 14, lineHeight: 1.6, color: '#59625d', margin: '0 0 22px' }}>{content.activity.note}</p><div className="booking-row"><span>Availability</span><strong>{content.activity.statusLabel}</strong></div><div className="booking-row"><span>Arrangement</span><strong>{content.activity.dateLabel}</strong></div><Link href={content.activity.registrationHref} className="button" style={{ marginTop: 22 }}>{content.activity.registrationLabel}</Link><p style={{ fontSize: 11, lineHeight: 1.55, color: '#737b76', margin: '15px 0 0', textAlign: 'center' }}>No fixed date or package. We shape participation around the project and your needs.</p></aside>;
}

function Info({ label, value }: { label: string; value: string }) { return <div className="fact"><p className="eyebrow" style={{ opacity: .55, margin: '0 0 7px' }}>{label}</p><strong style={{ fontSize: 13, lineHeight: 1.4 }}>{value}</strong></div>; }
function Label({ text, light = false }: { text: string; light?: boolean }) { return <p className="eyebrow" style={{ color: light ? '#d4ae89' : '#9b5e3d', margin: '0 0 16px' }}>{text}</p>; }
function Title({ text }: { text: string }) { return <h2 className="display" style={{ fontSize: 'clamp(45px,6vw,74px)', maxWidth: 740, margin: '0 0 24px' }}>{text}</h2>; }
