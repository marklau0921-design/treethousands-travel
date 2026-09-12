import { Link, useParams } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OurStoryRecommendations from '@/components/OurStoryRecommendations';
import { trpc } from '@/lib/trpc';
import { useMediaObjectPosition } from '@/lib/media-position';
import { normalizeOurStoryPage } from '@shared/our-story';

const DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";

export default function WhyWeStarted() {
  const { slug = 'why-we-started' } = useParams<{ slug: string }>();
  const { data: sections, isLoading } = trpc.ourStory.listPublicSections.useQuery();
  const { data: homepageAssets } = trpc.media.getHomepageAssets.useQuery();
  const getObjectPosition = useMediaObjectPosition();
  const section = sections?.find(item => item.slug === slug);
  const meta = section;

  if (!meta && !isLoading) {
    return <div style={{ minHeight: '100vh', background: '#f4f0e7', paddingTop: 180, textAlign: 'center' }}><Navigation /><h1 style={{ fontFamily: DISPLAY, fontSize: 72, textTransform: 'uppercase' }}>Page not found</h1><Link href="/our-story">Return to Our Story</Link></div>;
  }

  if (!section) return <div className="min-h-screen bg-[#f4f0e7]" />;
  const page = normalizeOurStoryPage(section.pageContent, section.title, section.content, section.image ?? '');
  const ctaTexture = homepageAssets?.cta?.url || '';
  const ctaTextureOpacity = Math.max(0, Math.min(1, Number(homepageAssets?.cta?.opacity ?? 28) / 100));

  return (
    <div className="our-story-detail bg-[#f4f0e7] text-[#1b241f]">
      <style>{`
        .our-story-detail .editorial-wrap{width:min(1320px,calc(100% - 64px));margin:0 auto}
        .our-story-detail .split{display:grid;grid-template-columns:1fr 1fr;align-items:stretch}
        .our-story-detail .eyebrow{font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:.19em;text-transform:uppercase}
        .our-story-detail .display-title{font-family:${DISPLAY};font-weight:400;letter-spacing:.045em;line-height:.92;text-transform:uppercase}
        .our-story-detail .body-copy{font-family:${SANS};font-size:17px;line-height:1.72;letter-spacing:.035em;color:#4d554f}
        .our-story-detail .pillar-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:54px 34px;align-items:start}
        .our-story-detail .pillar:nth-child(1),.our-story-detail .pillar:nth-child(4){grid-column:span 7}
        .our-story-detail .pillar:nth-child(2),.our-story-detail .pillar:nth-child(3){grid-column:span 5}
        .our-story-detail .pillar:nth-child(2){margin-top:110px}
        .our-story-detail .pillar-image{width:100%;height:clamp(360px,44vw,620px);object-fit:cover;display:block}
        .our-story-detail .pillar:nth-child(2) .pillar-image,.our-story-detail .pillar:nth-child(3) .pillar-image{height:clamp(330px,35vw,500px)}
        @media(max-width:767px){.our-story-detail .editorial-wrap{width:calc(100% - 40px)}.our-story-detail .split{grid-template-columns:1fr}.our-story-detail .body-copy{font-size:16px;line-height:1.65}.our-story-detail .pillar-grid{display:block}.our-story-detail .pillar{margin:0 0 48px!important}.our-story-detail .pillar-image,.our-story-detail .pillar:nth-child(2) .pillar-image,.our-story-detail .pillar:nth-child(3) .pillar-image{height:360px}}
      `}</style>
      <Navigation />

      <header className="relative flex items-end overflow-hidden" style={{ minHeight: 'min(900px, 92vh)', background: '#19372f' }}>
        <img src={page.hero.image} alt={page.hero.title} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: getObjectPosition(page.hero.image) }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(10,20,16,.12) 20%,rgba(10,20,16,.78) 100%)' }} />
        <div className="relative z-10 w-full text-white" style={{ padding: '0 clamp(24px,7vw,110px) clamp(62px,8vw,112px)' }}><p className="eyebrow" style={{ color: 'rgba(255,255,255,.78)', margin: '0 0 20px' }}>{page.hero.eyebrow}</p><h1 className="display-title" style={{ fontSize: 'clamp(64px,10vw,142px)', margin: 0, maxWidth: 1050 }}>{page.hero.title}</h1><p style={{ fontFamily: SANS, fontSize: 'clamp(20px,2.1vw,30px)', letterSpacing: '.025em', lineHeight: 1.4, margin: '28px 0 0', maxWidth: 760 }}>{page.hero.subtitle}</p></div>
      </header>

      <section style={{ padding: 'clamp(90px,11vw,160px) 0' }}><div className="editorial-wrap split" style={{ background: page.introduction.backgroundColor }}><div className="flex flex-col justify-center" style={{ padding: 'clamp(42px,6vw,90px)' }}><p className="eyebrow" style={{ color: '#8b5a3c', margin: '0 0 22px' }}>{page.introduction.eyebrow}</p><h2 className="display-title" style={{ fontSize: 'clamp(45px,5vw,72px)', color: '#172d25', margin: '0 0 30px' }}>{page.introduction.title}</h2><div className="body-copy">{page.introduction.paragraphs.map((paragraph, index) => <p key={index} style={{ margin: index === page.introduction.paragraphs.length - 1 ? 0 : '0 0 20px' }}>{paragraph}</p>)}</div></div><img src={page.introduction.image} alt={page.introduction.title} className="w-full h-full object-cover" style={{ minHeight: 660, objectPosition: getObjectPosition(page.introduction.image) }} /></div></section>

      <section className="split" style={{ background: page.quote.backgroundColor, color: '#f4f0e7' }}><div className="flex flex-col justify-center" style={{ padding: 'clamp(70px,9vw,140px)' }}><p className="eyebrow" style={{ color: '#c79a72', margin: '0 0 34px' }}>{page.quote.eyebrow}</p><blockquote style={{ fontFamily: SANS, fontSize: 'clamp(38px,5vw,72px)', letterSpacing: '-.025em', lineHeight: 1.08, margin: 0 }}>“{page.quote.quote}”</blockquote><p className="body-copy" style={{ color: 'rgba(244,240,231,.72)', maxWidth: 610, margin: '40px 0 0' }}>{page.quote.body}</p></div><img src={page.quote.image} alt={page.quote.eyebrow} className="w-full h-full object-cover" style={{ minHeight: 700, objectPosition: getObjectPosition(page.quote.image) }} /></section>

      <section style={{ padding: 'clamp(100px,12vw,170px) 0', background: page.pillars.backgroundColor }}><div className="editorial-wrap"><div style={{ maxWidth: 760, marginBottom: 'clamp(64px,8vw,110px)' }}><p className="eyebrow" style={{ color: '#8b5a3c', margin: '0 0 22px' }}>{page.pillars.eyebrow}</p><h2 className="display-title" style={{ fontSize: 'clamp(46px,6vw,82px)', color: '#17352d', margin: '0 0 28px' }}>{page.pillars.title}</h2><p className="body-copy" style={{ maxWidth: 650, margin: 0 }}>{page.pillars.intro}</p></div><div className="pillar-grid">{page.pillars.items.map((pillar, index) => <figure className="pillar" key={`${pillar.title}-${index}`} style={{ margin: 0 }}><img src={pillar.image} alt={pillar.title} className="pillar-image" style={{ objectPosition: getObjectPosition(pillar.image) }} /><figcaption style={{ paddingTop: 22 }}><h3 className="display-title" style={{ fontSize: 'clamp(32px,3vw,44px)', color: '#17352d', margin: '0 0 9px' }}>{pillar.title}</h3><p className="body-copy" style={{ fontSize: 15, maxWidth: 520, margin: 0 }}>{pillar.text}</p></figcaption></figure>)}</div></div></section>

      <section className="split" style={{ background: page.closing.backgroundColor }}><img src={page.closing.image} alt={page.closing.title} className="w-full h-full object-cover" style={{ minHeight: 650, objectPosition: getObjectPosition(page.closing.image) }} /><div className="flex flex-col justify-center" style={{ padding: 'clamp(60px,8vw,120px)' }}><p className="eyebrow" style={{ color: '#74482f', margin: '0 0 24px' }}>{page.closing.eyebrow}</p><h2 className="display-title" style={{ fontSize: 'clamp(48px,5.4vw,78px)', color: '#17352d', margin: '0 0 30px' }}>{page.closing.title}</h2><div className="body-copy" style={{ color: '#3f4741' }}>{page.closing.paragraphs.map((paragraph, index) => <p key={index} style={{ margin: index === page.closing.paragraphs.length - 1 ? 0 : '0 0 20px' }}>{paragraph}</p>)}</div></div></section>

      <section style={{ position: 'relative', minHeight: 275, backgroundColor: page.cta.backgroundColor, color: page.cta.textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '55px 24px' }}>{ctaTexture && <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${ctaTexture})`, backgroundSize: '420px 420px', backgroundRepeat: 'repeat', opacity: ctaTextureOpacity }} />}<div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}><h2 className="display-title" style={{ fontSize: 'clamp(38px,5vw,64px)', margin: '0 0 28px' }}>{page.cta.title}</h2><Link href="/make-an-enquiry" style={{ display: 'inline-block', background: page.cta.buttonBackgroundColor, color: page.cta.buttonTextColor, border: `2px solid ${page.cta.buttonBackgroundColor}`, padding: '13px 34px', fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none' }}>{page.cta.buttonLabel}</Link></div></section>

      <OurStoryRecommendations currentSlug={slug} settings={page.recommendations} />
      <Footer />
    </div>
  );
}
