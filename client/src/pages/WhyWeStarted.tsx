import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { useMediaObjectPosition } from '@/lib/media-position';

const DISPLAY = "var(--font-travel-condensed, 'League Gothic', 'Arial Narrow', Impact, sans-serif)";
const SANS = "var(--font-travel-sans, 'Cabin', 'Helvetica Neue', Arial, sans-serif)";

const fallbacks = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1800&h=1200&fit=crop',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1400&h=1200&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=1200&fit=crop',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1400&h=1200&fit=crop',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1400&h=1200&fit=crop',
  'https://images.unsplash.com/photo-1511497584788-876760111969?w=1400&h=1200&fit=crop',
];

const pillars = [
  { title: 'Village', note: 'Places shaped by generations of memory, work, and belonging.' },
  { title: 'People', note: 'The makers, farmers, hosts, and storytellers we meet along the way.' },
  { title: 'Nature', note: 'Landscapes that invite us to slow down, listen, and look more closely.' },
  { title: 'Culture', note: 'Living traditions found in food, craft, ritual, language, and daily life.' },
];

function normalizeImages(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((url): url is string => typeof url === 'string' && url.length > 0);
  if (typeof value !== 'string' || !value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((url): url is string => typeof url === 'string' && url.length > 0) : [value];
  } catch {
    return [value];
  }
}

export default function WhyWeStarted() {
  const { data: homepageData } = trpc.homepage.getPublicData.useQuery();
  const getObjectPosition = useMediaObjectPosition();
  const heroImages = normalizeImages(homepageData?.hero?.backgroundImage);
  const storyImages = (homepageData?.imageStories ?? []).map((item) => item.image).filter((image): image is string => typeof image === 'string' && image.length > 0);
  const images = [...heroImages, ...storyImages, ...fallbacks, ...fallbacks];

  return (
    <div className="why-started-page bg-[#f4f0e7] text-[#1b241f]">
      <style>{`
        .why-started-page .editorial-wrap{width:min(1320px,calc(100% - 64px));margin:0 auto}
        .why-started-page .split{display:grid;grid-template-columns:1fr 1fr;align-items:stretch}
        .why-started-page .eyebrow{font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:.19em;text-transform:uppercase}
        .why-started-page .display-title{font-family:${DISPLAY};font-weight:400;letter-spacing:.045em;line-height:.92;text-transform:uppercase}
        .why-started-page .body-copy{font-family:${SANS};font-size:17px;line-height:1.72;letter-spacing:.035em;color:#4d554f}
        .why-started-page .story-button{display:inline-block;background:#111;color:#fff;border:2px solid #111;border-radius:3px;padding:13px 30px;font-family:${SANS};font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;transition:background .2s,color .2s}
        .why-started-page .story-button:hover{background:transparent;color:#111}
        .why-started-page .pillar-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:54px 34px;align-items:start}
        .why-started-page .pillar:nth-child(1),.why-started-page .pillar:nth-child(4){grid-column:span 7}
        .why-started-page .pillar:nth-child(2),.why-started-page .pillar:nth-child(3){grid-column:span 5}
        .why-started-page .pillar:nth-child(2){margin-top:110px}
        .why-started-page .pillar-image{width:100%;height:clamp(360px,44vw,620px);object-fit:cover;display:block}
        .why-started-page .pillar:nth-child(2) .pillar-image,.why-started-page .pillar:nth-child(3) .pillar-image{height:clamp(330px,35vw,500px)}
        @media(max-width:767px){
          .why-started-page .editorial-wrap{width:calc(100% - 40px)}
          .why-started-page .split{grid-template-columns:1fr}
          .why-started-page .body-copy{font-size:16px;line-height:1.65}
          .why-started-page .pillar-grid{display:block}
          .why-started-page .pillar{margin:0 0 48px!important}
          .why-started-page .pillar-image,.why-started-page .pillar:nth-child(2) .pillar-image,.why-started-page .pillar:nth-child(3) .pillar-image{height:360px}
        }
      `}</style>

      <Navigation />

      <header className="relative flex items-end overflow-hidden" style={{ minHeight: 'min(900px, 92vh)', background: '#19372f' }}>
        <img src={images[0]} alt="Rural China landscape" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: getObjectPosition(images[0]) }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(10,20,16,.12) 20%,rgba(10,20,16,.78) 100%)' }} />
        <div className="relative z-10 w-full text-white" style={{ padding: '0 clamp(24px,7vw,110px) clamp(62px,8vw,112px)' }}>
          <p className="eyebrow" style={{ color: 'rgba(255,255,255,.78)', margin: '0 0 20px' }}>The beginning of TreeThousands</p>
          <h1 className="display-title" style={{ fontSize: 'clamp(64px,10vw,142px)', margin: 0, maxWidth: 1050 }}>Why We Started</h1>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(20px,2.1vw,30px)', fontWeight: 400, letterSpacing: '.025em', lineHeight: 1.4, margin: '28px 0 0', maxWidth: 760 }}>
            To share a China found not only in places, but in people, memory, and everyday life.
          </p>
        </div>
      </header>

      <section style={{ padding: 'clamp(90px,11vw,160px) 0' }}>
        <div className="editorial-wrap split" style={{ background: '#ebe5d9' }}>
          <div className="flex flex-col justify-center" style={{ padding: 'clamp(42px,6vw,90px)' }}>
            <p className="eyebrow" style={{ color: '#8b5a3c', margin: '0 0 22px' }}>01 — The Thought Behind Tree Thousands</p>
            <h2 className="display-title" style={{ fontSize: 'clamp(45px,5vw,72px)', color: '#172d25', margin: '0 0 30px' }}>Another side of China was waiting to be seen.</h2>
            <div className="body-copy">
              <p style={{ margin: '0 0 20px' }}>China is often introduced through its great cities and celebrated landmarks. They are part of the story—but never the whole story.</p>
              <p style={{ margin: 0 }}>We started TreeThousands to look beyond the familiar. Toward village lanes, family kitchens, mountain paths, local workshops, and conversations that cannot be scheduled into a conventional tour.</p>
            </div>
          </div>
          <img src={images[1]} alt="Life in rural China" className="w-full h-full object-cover" style={{ minHeight: 660, objectPosition: getObjectPosition(images[1]) }} />
        </div>
      </section>

      <section className="split" style={{ background: '#17352d', color: '#f4f0e7' }}>
        <div className="flex flex-col justify-center" style={{ padding: 'clamp(70px,9vw,140px)' }}>
          <p className="eyebrow" style={{ color: '#c79a72', margin: '0 0 34px' }}>02 — More Than a Destination</p>
          <blockquote style={{ fontFamily: SANS, fontSize: 'clamp(38px,5vw,72px)', fontWeight: 400, letterSpacing: '-.025em', lineHeight: 1.08, margin: 0 }}>
            “A place becomes meaningful when someone shares their story with you.”
          </blockquote>
          <p className="body-copy" style={{ color: 'rgba(244,240,231,.72)', maxWidth: 610, margin: '40px 0 0' }}>
            For us, travel is not a checklist of destinations. It is an exchange—between visitor and host, landscape and memory, curiosity and understanding.
          </p>
        </div>
        <img src={images[2]} alt="People and village life" className="w-full h-full object-cover" style={{ minHeight: 700, objectPosition: getObjectPosition(images[2]) }} />
      </section>

      <section style={{ padding: 'clamp(100px,12vw,170px) 0', background: '#f7f3eb' }}>
        <div className="editorial-wrap">
          <div style={{ maxWidth: 760, marginBottom: 'clamp(64px,8vw,110px)' }}>
            <p className="eyebrow" style={{ color: '#8b5a3c', margin: '0 0 22px' }}>03 — What We Want to Share</p>
            <h2 className="display-title" style={{ fontSize: 'clamp(46px,6vw,82px)', color: '#17352d', margin: '0 0 28px' }}>The stories live in the details.</h2>
            <p className="body-copy" style={{ maxWidth: 650, margin: 0 }}>Four threads guide the way we explore, listen, and tell stories about rural China.</p>
          </div>

          <div className="pillar-grid">
            {pillars.map((pillar, index) => (
              <figure className="pillar" key={pillar.title} style={{ margin: 0 }}>
                <img src={images[index + 3]} alt={pillar.title} className="pillar-image" style={{ objectPosition: getObjectPosition(images[index + 3]) }} />
                <figcaption style={{ paddingTop: 22 }}>
                  <h3 className="display-title" style={{ fontSize: 'clamp(32px,3vw,44px)', color: '#17352d', margin: '0 0 9px' }}>{pillar.title}</h3>
                  <p className="body-copy" style={{ fontSize: 15, maxWidth: 520, margin: 0 }}>{pillar.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="split" style={{ background: '#d8c5aa' }}>
        <img src={images[7]} alt="Growing with local communities" className="w-full h-full object-cover" style={{ minHeight: 650, objectPosition: getObjectPosition(images[7]) }} />
        <div className="flex flex-col justify-center" style={{ padding: 'clamp(60px,8vw,120px)' }}>
          <p className="eyebrow" style={{ color: '#74482f', margin: '0 0 24px' }}>04 — Growing Together</p>
          <h2 className="display-title" style={{ fontSize: 'clamp(48px,5.4vw,78px)', color: '#17352d', margin: '0 0 30px' }}>This is only the beginning.</h2>
          <div className="body-copy" style={{ color: '#3f4741' }}>
            <p style={{ margin: '0 0 20px' }}>TreeThousands is growing alongside the villages, communities, and local partners who make these stories possible.</p>
            <p style={{ margin: 0 }}>Over time, more people, places, traditions, and experiences will become part of this living collection. We hope to grow carefully—with relationships first, and with value flowing back to the communities that welcome us.</p>
          </div>
        </div>
      </section>

      <section className="text-center" style={{ background: '#9b5e3d', color: '#fff', padding: 'clamp(90px,10vw,140px) 24px' }}>
        <p className="eyebrow" style={{ color: 'rgba(255,255,255,.72)', margin: '0 0 20px' }}>Keep exploring</p>
        <h2 className="display-title" style={{ fontSize: 'clamp(46px,6vw,82px)', margin: '0 auto 36px', maxWidth: 850 }}>Meet the people and places behind the journey.</h2>
        <Link href="/stories" className="story-button">Explore the Stories</Link>
      </section>

      <Footer />
    </div>
  );
}
