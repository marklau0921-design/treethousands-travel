import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { useMediaObjectPosition } from '@/lib/media-position';

const DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";

export type ExploreTemplateContent = {
  slug: string;
  title: string;
  heroText: string;
  introduction: string;
  statement: string;
  visualNotes: [string, string];
  details: string[];
  perspectives: Array<{ title: string; description: string; href: string }>;
  cta: { label: string; href: string };
  fallbackImages: string[];
};

type ExploreTemplateProps = { content: ExploreTemplateContent };

function normalizeImages(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string' && item.length > 0);
  if (typeof value !== 'string' || !value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string' && item.length > 0) : [value];
  } catch {
    return [value];
  }
}

export default function ExploreTemplate({ content }: ExploreTemplateProps) {
  const { data: homepageData } = trpc.homepage.getPublicData.useQuery();
  const getObjectPosition = useMediaObjectPosition();
  const uploaded = [
    ...normalizeImages(homepageData?.hero?.backgroundImage),
    ...(homepageData?.imageStories ?? []).map((item) => item.image).filter((image): image is string => typeof image === 'string' && image.length > 0),
  ];
  const images = [...uploaded, ...content.fallbackImages, ...content.fallbackImages, ...content.fallbackImages, ...content.fallbackImages];

  return (
    <div className="explore-editorial bg-[#f5f1e8] text-[#17251f]">
      <style>{`
        .explore-editorial{font-family:${SANS}}
        .explore-editorial .wrap{width:min(1320px,calc(100% - 64px));margin:0 auto}
        .explore-editorial .display{font-family:${DISPLAY};font-weight:400;letter-spacing:.045em;line-height:.92;text-transform:uppercase}
        .explore-editorial .eyebrow{font-size:11px;font-weight:700;letter-spacing:.19em;text-transform:uppercase}
        .explore-editorial .copy{font-size:17px;line-height:1.72;letter-spacing:.035em;color:#505850}
        .explore-editorial .visual-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:32px;align-items:start}
        .explore-editorial .visual-a{grid-column:1/9}
        .explore-editorial .visual-b{grid-column:9/13;margin-top:170px}
        .explore-editorial .visual-c{grid-column:2/6;margin-top:72px}
        .explore-editorial .visual-copy{grid-column:7/12;margin-top:150px}
        .explore-editorial .details-grid{display:grid;grid-template-columns:1.35fr .85fr 1fr;gap:22px;align-items:end}
        .explore-editorial .perspective-grid{display:grid;grid-template-columns:1.3fr .85fr .85fr;gap:28px;align-items:start}
        .explore-editorial .perspective:nth-child(2){margin-top:90px}
        .explore-editorial .story-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
        .explore-editorial .image{display:block;width:100%;object-fit:cover}
        .explore-editorial .button{display:inline-block;background:#111;color:#fff;border:2px solid #111;border-radius:3px;padding:13px 30px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;transition:background .2s,color .2s}
        .explore-editorial .button:hover{background:transparent;color:#111}
        @media(max-width:767px){
          .explore-editorial .wrap{width:calc(100% - 40px)}
          .explore-editorial .visual-grid,.explore-editorial .details-grid,.explore-editorial .perspective-grid,.explore-editorial .story-grid{display:block}
          .explore-editorial .visual-a,.explore-editorial .visual-b,.explore-editorial .visual-c,.explore-editorial .visual-copy,.explore-editorial .perspective{margin:0 0 28px}
          .explore-editorial .copy{font-size:16px;line-height:1.65}
          .explore-editorial .detail,.explore-editorial .perspective,.explore-editorial .related-story{margin-bottom:36px}
        }
      `}</style>

      <Navigation />

      <header className="relative flex items-end overflow-hidden" style={{ minHeight: 'min(850px,90vh)', background: '#17352d' }}>
        <img src={images[0]} alt={`${content.title} in rural China`} className="absolute inset-0 image h-full" style={{ objectPosition: getObjectPosition(images[0]) }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(9,18,14,.08) 25%,rgba(9,18,14,.76) 100%)' }} />
        <div className="relative z-10 text-white" style={{ padding: '0 clamp(24px,7vw,110px) clamp(62px,8vw,108px)' }}>
          <h1 className="display" style={{ fontSize: 'clamp(68px,11vw,156px)', margin: 0 }}>{content.title}</h1>
          <p style={{ maxWidth: 720, margin: '24px 0 0', fontSize: 'clamp(17px,1.6vw,23px)', lineHeight: 1.5, letterSpacing: '.025em' }}>{content.heroText}</p>
        </div>
      </header>

      <section style={{ padding: 'clamp(90px,11vw,160px) 0' }}>
        <div className="wrap grid md:grid-cols-[.7fr_1.8fr] gap-12 md:gap-24 items-start">
          <p className="eyebrow" style={{ color: '#8b5a3c', margin: 0 }}>Explore / {content.title}</p>
          <p style={{ margin: 0, fontSize: 'clamp(30px,4vw,56px)', lineHeight: 1.13, letterSpacing: '-.02em', maxWidth: 920 }}>{content.introduction}</p>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 'clamp(110px,13vw,190px)' }}>
        <div className="visual-grid">
          <figure className="visual-a" style={{ margin: 0 }}><img src={images[1]} alt="A wide village scene" className="image" style={{ height: 'clamp(430px,55vw,720px)', objectPosition: getObjectPosition(images[1]) }} /></figure>
          <figure className="visual-b" style={{ marginBottom: 0 }}><img src={images[2]} alt="An everyday village moment" className="image" style={{ height: 'clamp(420px,48vw,640px)', objectPosition: getObjectPosition(images[2]) }} /></figure>
          <figure className="visual-c" style={{ marginBottom: 0 }}><img src={images[3]} alt="Life along a village path" className="image" style={{ height: 'clamp(450px,52vw,690px)', objectPosition: getObjectPosition(images[3]) }} /></figure>
          <div className="visual-copy">
            <p className="eyebrow" style={{ color: '#8b5a3c', margin: '0 0 22px' }}>A closer look</p>
            <h2 className="display" style={{ fontSize: 'clamp(44px,5vw,72px)', margin: '0 0 28px', color: '#17352d' }}>Life happens between the landmarks.</h2>
            <p className="copy" style={{ margin: '0 0 20px' }}>{content.visualNotes[0]}</p>
            <p className="copy" style={{ margin: 0 }}>{content.visualNotes[1]}</p>
          </div>
        </div>
      </section>

      <section style={{ background: '#e5ddce', padding: 'clamp(86px,10vw,140px) 0' }}>
        <div className="wrap">
          <div className="flex justify-between items-end gap-8" style={{ marginBottom: 48 }}>
            <div><p className="eyebrow" style={{ color: '#8b5a3c', margin: '0 0 15px' }}>Moments / Details</p><h2 className="display" style={{ fontSize: 'clamp(46px,6vw,78px)', margin: 0 }}>The small things</h2></div>
            <p className="copy hidden md:block" style={{ margin: 0, maxWidth: 380 }}>Fragments of daily life, noticed slowly and remembered long after.</p>
          </div>
          <div className="details-grid">
            {content.details.slice(0, 3).map((detail, index) => (
              <figure className="detail" key={detail} style={{ margin: 0 }}>
                <img src={images[index + 4]} alt={detail} className="image" style={{ height: index === 0 ? 520 : index === 1 ? 390 : 455, objectPosition: getObjectPosition(images[index + 4]) }} />
                <figcaption className="eyebrow" style={{ marginTop: 15 }}>{detail}</figcaption>
              </figure>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7" style={{ marginTop: 22 }}>
            {content.details.slice(3, 6).map((detail, index) => (
              <figure key={detail} style={{ margin: 0 }}>
                <img src={images[index + 7]} alt={detail} className="image" style={{ height: 'clamp(220px,27vw,360px)', objectPosition: getObjectPosition(images[index + 7]) }} />
                <figcaption className="eyebrow" style={{ marginTop: 15 }}>{detail}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(120px,16vw,230px) 0', background: '#17352d', color: '#f5f1e8' }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: '#c79a72', margin: '0 0 28px' }}>A way of seeing</p>
          <p style={{ fontSize: 'clamp(48px,7.2vw,104px)', lineHeight: 1.02, letterSpacing: '-.035em', maxWidth: 1160, margin: 0 }}>{content.statement}</p>
        </div>
      </section>

      <section style={{ padding: 'clamp(100px,12vw,170px) 0', background: '#f7f3eb' }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: '#8b5a3c', margin: '0 0 48px' }}>Related Perspectives</p>
          <div className="perspective-grid">
            {content.perspectives.map((item, index) => (
              <Link href={item.href} className="perspective block text-inherit no-underline" key={item.title}>
                <img src={images[index + 10]} alt={item.title} className="image" style={{ height: index === 0 ? 570 : 430, objectPosition: getObjectPosition(images[index + 10]) }} />
                <h3 className="display" style={{ fontSize: 'clamp(32px,3.5vw,48px)', margin: '24px 0 12px' }}>{item.title}</h3>
                <p className="copy" style={{ margin: 0, fontSize: 15 }}>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(90px,10vw,140px) 0', background: '#fff' }}>
        <div className="wrap">
          <div className="flex justify-between items-end" style={{ marginBottom: 44 }}><div><p className="eyebrow" style={{ color: '#8b5a3c', margin: '0 0 15px' }}>From the journal</p><h2 className="display" style={{ fontSize: 'clamp(46px,6vw,78px)', margin: 0 }}>Related Stories</h2></div><Link href="/stories" className="eyebrow hidden md:block text-black">View all stories →</Link></div>
          <div className="story-grid">
            {content.perspectives.map((item, index) => (
              <Link href="/stories" className="related-story block text-inherit no-underline" key={item.title}>
                <img src={images[index + 13]} alt="Story from rural China" className="image" style={{ height: 390, objectPosition: getObjectPosition(images[index + 13]) }} />
                <p className="eyebrow" style={{ color: '#8b5a3c', margin: '20px 0 10px' }}>{index === 0 ? 'Village Notes' : index === 1 ? 'Local Life' : 'Journal'}</p>
                <h3 style={{ fontSize: 23, lineHeight: 1.3, fontWeight: 500, margin: 0 }}>{index === 0 ? 'Morning begins before the village wakes' : index === 1 ? 'What a shared table can tell us' : 'Following the path home'}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center" style={{ padding: 'clamp(90px,10vw,140px) 24px', background: '#a16140', color: '#fff' }}>
        <p className="eyebrow" style={{ color: 'rgba(255,255,255,.72)', margin: '0 0 18px' }}>Continue the journey</p>
        <h2 className="display" style={{ fontSize: 'clamp(52px,7vw,94px)', margin: '0 auto 36px', maxWidth: 920 }}>There is always another side to discover.</h2>
        <Link href={content.cta.href} className="button">{content.cta.label}</Link>
      </section>

      <Footer />
    </div>
  );
}
