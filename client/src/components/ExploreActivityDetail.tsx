import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useMediaObjectPosition } from '@/lib/media-position';
import type { ExplorePageContent } from '@shared/explore';

const DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";

export default function ExploreActivityDetail({ content }: { content: ExplorePageContent }) {
  const detail = content.activityDetail;
  const position = useMediaObjectPosition();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    document.title = `${content.hero.title} | TreeThousands`;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = detail?.excerpt || content.hero.subtitle;
  }, [content.hero.title, content.hero.subtitle, detail?.excerpt]);

  if (!detail) return null;
  const gallery = [content.hero.image, ...detail.currentWork.images, ...detail.people.images, detail.flexibility.image]
    .filter((src, index, all) => Boolean(src) && all.indexOf(src) === index);
  const image = (src: string, alt: string, className = '') => <img src={src} alt={alt} className={`activity-image ${className}`} style={{ objectPosition: position(src) }} />;
  const previous = () => setSlide(value => (value - 1 + gallery.length) % gallery.length);
  const next = () => setSlide(value => (value + 1) % gallery.length);

  return <div className="activity-page" style={{ fontFamily: SANS, background: '#f7f4ed', color: '#17251f' }}>
    <style>{`
      .activity-page *{box-sizing:border-box}.activity-page .wrap{width:min(1180px,calc(100% - 64px));margin:0 auto}.activity-page .display{font-family:${DISPLAY};font-weight:400;letter-spacing:.045em;line-height:.95;text-transform:uppercase}.activity-page .eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}.activity-page .copy{font-size:17px;line-height:1.75;letter-spacing:.018em;color:#4d5751}.activity-page .activity-image{display:block;width:100%;height:100%;object-fit:cover}.activity-page .button{display:inline-flex;align-items:center;justify-content:center;padding:15px 28px;background:#151515;color:#fff;text-decoration:none;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;border:1px solid #151515;transition:background .2s ease,transform .2s ease}.activity-page .button:hover{background:#9b5e3d;border-color:#9b5e3d;transform:translateY(-2px)}
      .activity-page .fact-grid{display:grid;grid-template-columns:repeat(3,1fr);width:min(760px,100%);margin:42px auto 0}.activity-page .fact{text-align:center;padding:0 28px}.activity-page .fact+.fact{border-left:1px solid #d1cbc0}.activity-page .fact-value{font-size:15px;font-style:italic;line-height:1.45;margin:10px 0 0}.activity-page .carousel{position:relative;overflow:hidden;background:#d8d4ca}.activity-page .carousel-track{display:flex;transition:transform .55s cubic-bezier(.4,0,.2,1)}.activity-page .slide{flex:0 0 100%;height:min(690px,58vw);min-height:460px}.activity-page .carousel-button{position:absolute;top:50%;transform:translateY(-50%);z-index:2;width:48px;height:48px;border:0;border-radius:50%;background:rgba(20,25,22,.64);color:#fff;display:grid;place-items:center;cursor:pointer}.activity-page .carousel-button.prev{left:28px}.activity-page .carousel-button.next{right:28px}.activity-page .carousel-count{position:absolute;right:30px;bottom:24px;background:rgba(20,25,22,.72);color:#fff;padding:8px 12px;font-size:10px;letter-spacing:.14em}.activity-page .intro{text-align:center;max-width:900px;margin:0 auto}.activity-page .detail-row{display:grid;grid-template-columns:1fr 1fr;min-height:620px}.activity-page .detail-row.reverse .detail-media{order:2}.activity-page .detail-row.reverse .detail-copy{order:1}.activity-page .detail-copy{display:flex;align-items:center;padding:clamp(55px,8vw,120px)}.activity-page .detail-copy-inner{max-width:560px}.activity-page .detail-media{min-height:620px}.activity-page .steps{border-top:1px solid #bfb8ac;margin-top:30px}.activity-page .step{display:grid;grid-template-columns:44px 1fr;gap:15px;padding:18px 0;border-bottom:1px solid #bfb8ac}.activity-page .step-number{font-family:${DISPLAY};font-size:29px;color:#9b5e3d}.activity-page .step h3{font-size:18px;margin:0 0 6px}.activity-page .step p{font-size:14px;line-height:1.55;color:#59625d;margin:0}.activity-page .point-grid,.activity-page .practical-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:28px}.activity-page .point,.activity-page .practical-card{padding:20px;background:rgba(255,255,255,.48)}.activity-page .point{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.activity-page .practical-card h3{font-size:16px;margin:0 0 8px}.activity-page .practical-card p{font-size:13px;line-height:1.55;color:#59625d;margin:0}.activity-page .principles{display:grid;grid-template-columns:repeat(5,1fr);gap:22px;margin-top:52px}.activity-page .principle{border-top:1px solid rgba(255,255,255,.35);padding-top:17px;font-size:14px;line-height:1.55}.activity-page .mobile-action{display:none}
      @media(max-width:767px){.activity-page .wrap{width:calc(100% - 40px)}.activity-page .fact-grid{grid-template-columns:1fr}.activity-page .fact{padding:17px 0}.activity-page .fact+.fact{border-left:0;border-top:1px solid #d1cbc0}.activity-page .slide{height:72vw;min-height:320px}.activity-page .carousel-button{width:42px;height:42px}.activity-page .carousel-button.prev{left:14px}.activity-page .carousel-button.next{right:14px}.activity-page .detail-row{display:flex;flex-direction:column;min-height:0}.activity-page .detail-row.reverse .detail-media{order:0}.activity-page .detail-row.reverse .detail-copy{order:1}.activity-page .detail-media{min-height:360px;height:75vw}.activity-page .detail-copy{padding:54px 24px}.activity-page .point-grid,.activity-page .practical-grid,.activity-page .principles{grid-template-columns:1fr}.activity-page .principle{margin-bottom:14px}.activity-page .mobile-action{display:flex;position:fixed;left:16px;right:16px;bottom:14px;z-index:50;box-shadow:0 12px 35px rgba(0,0,0,.22)}}
    `}</style>
    <Navigation />
    <main>
      <header className="wrap" style={{ padding: 'clamp(108px,12vw,160px) 0 clamp(60px,8vw,95px)', textAlign: 'center' }}>
        <p className="eyebrow" style={{ margin: '0 0 26px' }}><Link href="/explore" style={{ color: '#17251f', textDecoration: 'none' }}>Explore</Link> / {detail.category}</p>
        <h1 className="display" style={{ fontSize: 'clamp(62px,9vw,124px)', maxWidth: 1000, margin: '0 auto' }}>{content.hero.title}</h1>
        <div className="fact-grid">
          <Fact label="Availability" value={content.activity.statusLabel} color="#9b5e3d" />
          <Fact label="Arrangement" value={content.activity.dateLabel} color="#5b8d78" />
          <Fact label="Duration" value={content.activity.duration} color="#376f91" />
        </div>
      </header>

      <section className="carousel" aria-label="Activity photographs">
        <div className="carousel-track" style={{ transform: `translateX(-${slide * 100}%)` }}>{gallery.map((src, index) => <div className="slide" key={src}>{image(src, `${content.hero.title} — ${index + 1}`)}</div>)}</div>
        {gallery.length > 1 && <><button className="carousel-button prev" onClick={previous} aria-label="Previous photograph"><ChevronLeft /></button><button className="carousel-button next" onClick={next} aria-label="Next photograph"><ChevronRight /></button><span className="carousel-count">{String(slide + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span></>}
      </section>

      <section style={{ padding: 'clamp(85px,11vw,150px) 24px', background: '#fff' }}><div className="intro"><p className="eyebrow" style={{ color: '#9b5e3d', margin: '0 0 23px' }}>An Ongoing Village Activity</p><h2 className="display" style={{ fontSize: 'clamp(48px,7vw,88px)', margin: '0 0 30px' }}>{detail.purpose.title}</h2><p style={{ fontSize: 'clamp(19px,2.1vw,27px)', lineHeight: 1.58, margin: '0 auto', maxWidth: 830 }}>{detail.excerpt}</p></div></section>

      <DetailRow imageSrc={detail.purpose.image} imageAlt={detail.purpose.title} background="#e3ddd1" image={image}><Label text={detail.purpose.eyebrow} /><Title text="Begin with the house as it is" />{detail.purpose.paragraphs.map((p, i) => <p className="copy" key={i}>{p}</p>)}</DetailRow>
      <DetailRow reverse imageSrc={detail.currentWork.images[0]} imageAlt={detail.currentWork.title} background="#f3efe6" image={image}><Label text={detail.currentWork.eyebrow} /><Title text={detail.currentWork.title} />{detail.currentWork.paragraphs.map((p, i) => <p className="copy" key={i}>{p}</p>)}</DetailRow>
      <DetailRow imageSrc={detail.flexibility.image} imageAlt={detail.participation.title} background="#d4d7c8" image={image}><Label text={detail.participation.eyebrow} /><Title text={detail.participation.title} /><p className="copy">{detail.participation.introduction}</p><div className="steps">{detail.participation.items.map((item, i) => <div className="step" key={item.title}><span className="step-number">0{i + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></div>)}</div></DetailRow>
      <DetailRow reverse imageSrc={detail.people.images[0]} imageAlt={detail.people.title} background="#eee7dc" image={image}><Label text={detail.people.eyebrow} /><Title text={detail.people.title} />{detail.people.paragraphs.map((p, i) => <p className="copy" key={i}>{p}</p>)}</DetailRow>

      <section style={{ padding: 'clamp(90px,11vw,150px) 0', background: '#e4ded2' }}><div className="wrap"><div style={{ maxWidth: 790 }}><Label text={detail.flexibility.eyebrow} /><Title text={detail.flexibility.title} />{detail.flexibility.paragraphs.map((p, i) => <p className="copy" key={i}>{p}</p>)}</div><div className="point-grid">{detail.flexibility.points.map(point => <div className="point" key={point}>{point}</div>)}</div></div></section>
      <section style={{ padding: 'clamp(90px,11vw,150px) 0', background: '#f7f4ed' }}><div className="wrap"><div style={{ maxWidth: 790 }}><Label text={detail.practical.eyebrow} /><Title text={detail.practical.title} /><p className="copy">{detail.practical.introduction}</p></div><div className="practical-grid">{detail.practical.items.map(item => <div className="practical-card" key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></div></section>
      <section style={{ padding: 'clamp(90px,12vw,165px) 0', background: '#17352d', color: '#f7f4ed' }}><div className="wrap"><Label text={detail.principles.eyebrow} light /><h2 className="display" style={{ fontSize: 'clamp(52px,8vw,104px)', maxWidth: 900, margin: '0 0 48px' }}>{detail.principles.title}</h2><div className="principles">{detail.principles.items.map((item, i) => <div className="principle" key={item}>0{i + 1}<br /><br />{item}</div>)}</div></div></section>
      <section style={{ position: 'relative', minHeight: 540, display: 'grid', placeItems: 'center', overflow: 'hidden', textAlign: 'center', color: '#fff' }}>{image(detail.closing.image, detail.closing.title, 'absolute inset-0')}<div className="absolute inset-0" style={{ background: 'rgba(11,22,17,.68)' }} /><div className="relative z-10" style={{ width: 'min(820px,calc(100% - 40px))', padding: '90px 0' }}><Label text={detail.closing.eyebrow} light /><h2 className="display" style={{ fontSize: 'clamp(52px,8vw,100px)', margin: '0 0 28px' }}>{detail.closing.title}</h2>{detail.closing.paragraphs.map((p, i) => <p key={i} style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,.82)' }}>{p}</p>)}<Link href={content.activity.registrationHref} className="button" style={{ marginTop: 26 }}>{content.activity.registrationLabel}</Link></div></section>
    </main>
    <Link href={content.activity.registrationHref} className="button mobile-action">{content.activity.registrationLabel}</Link>
    <Footer />
  </div>;
}

function Fact({ label, value, color }: { label: string; value: string; color: string }) { return <div className="fact"><p className="display" style={{ color, fontSize: 31, margin: 0 }}>{label}</p><p className="fact-value">{value}</p></div>; }
function DetailRow({ reverse = false, imageSrc, imageAlt, background, image, children }: { reverse?: boolean; imageSrc: string; imageAlt: string; background: string; image: (src: string, alt: string, className?: string) => React.ReactNode; children: React.ReactNode }) { return <section className={`detail-row${reverse ? ' reverse' : ''}`} style={{ background }}><div className="detail-media">{image(imageSrc, imageAlt)}</div><div className="detail-copy"><div className="detail-copy-inner">{children}</div></div></section>; }
function Label({ text, light = false }: { text: string; light?: boolean }) { return <p className="eyebrow" style={{ color: light ? '#d4ae89' : '#9b5e3d', margin: '0 0 18px' }}>{text}</p>; }
function Title({ text }: { text: string }) { return <h2 className="display" style={{ fontSize: 'clamp(45px,5.5vw,72px)', margin: '0 0 25px' }}>{text}</h2>; }
